-- English jing jing trainer — purchases + device-limited activation
-- Run this once in the SQL editor of the dedicated english-jing-jing Supabase project.

create table if not exists public.trainer_purchases (
  id                 uuid default gen_random_uuid() primary key,
  email              text not null,
  amount_thb         numeric(8,2) not null,
  stripe_session_id  text unique not null,
  max_devices        int not null default 2,
  created_at         timestamptz default now()
);
alter table public.trainer_purchases enable row level security;
-- No public policies: this table is only ever read/written by server-side
-- API routes using the Supabase service-role key, which bypasses RLS.

create table if not exists public.trainer_activations (
  id            uuid default gen_random_uuid() primary key,
  purchase_id   uuid references public.trainer_purchases(id) on delete cascade not null,
  device_id     text not null,
  activated_at  timestamptz default now(),
  unique (purchase_id, device_id)
);
alter table public.trainer_activations enable row level security;
-- Same as above — service-role only, no public policies.
