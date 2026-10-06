-- Enable UUID extension
create extension if not exists "pgcrypto";

-- profiles: extends auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'admin')),
  company_name text not null default '',
  contact_name text not null default '',
  email text unique not null,
  ruc text unique,
  currency text not null default 'USD' check (currency in ('USD', 'PEN')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- charges: invoices per client
create table public.charges (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  description text not null,
  amount numeric(10,2) not null check (amount > 0),
  amount_paid numeric(10,2) not null default 0 check (amount_paid >= 0),
  currency text not null default 'USD' check (currency in ('USD', 'PEN')),
  due_date date not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'parcial', 'pagado', 'vencido')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- payments: individual payment transactions
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  charge_id uuid not null references public.charges(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  paypal_order_id text unique,
  amount numeric(10,2) not null check (amount > 0),
  currency text not null check (currency in ('USD', 'PEN')),
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  paid_at timestamptz,
  receipt_url text,
  created_at timestamptz not null default now()
);

-- audit_logs: admin action tracking
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- indexes
create index on public.charges(client_id);
create index on public.charges(status);
create index on public.charges(due_date);
create index on public.payments(charge_id);
create index on public.payments(client_id);
create index on public.audit_logs(actor_id);
create index on public.audit_logs(created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_charges_updated_at before update on public.charges
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.charges enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;

-- profiles RLS
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins have full access to profiles" on public.profiles
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- charges RLS
create policy "Clients can read own charges" on public.charges
  for select using (client_id = auth.uid());

create policy "Admins have full access to charges" on public.charges
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- payments RLS
create policy "Clients can read own payments" on public.payments
  for select using (client_id = auth.uid());

create policy "Clients can insert own payments" on public.payments
  for insert with check (client_id = auth.uid());

create policy "Admins have full access to payments" on public.payments
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- audit_logs RLS
create policy "Admins can read audit logs" on public.audit_logs
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Server can insert audit logs" on public.audit_logs
  for insert with check (true);

-- Function: auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role, contact_name, company_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    coalesce(new.raw_user_meta_data->>'contact_name', ''),
    coalesce(new.raw_user_meta_data->>'company_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
