-- Add method and notes to payments for manual payment tracking
alter table public.payments
  add column if not exists method text default 'paypal'
    check (method in ('paypal', 'manual', 'transfer', 'sepa')),
  add column if not exists notes text;
