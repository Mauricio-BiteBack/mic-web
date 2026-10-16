-- Add odoo_partner_id to profiles for CRM linkage
alter table public.profiles
  add column if not exists odoo_partner_id text;
