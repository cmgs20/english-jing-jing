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

-- Atomically checks and enforces the per-purchase device limit. Locks the
-- purchase row for the duration of the call so two near-simultaneous
-- activation requests for the same purchase can't both slip past the
-- count check before either insert commits (a check-then-act race).
-- Safe to re-run — `create or replace` overwrites the previous version.
create or replace function public.activate_trainer_device(p_purchase_id uuid, p_device_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_max_devices int;
  v_count int;
begin
  select max_devices into v_max_devices
  from trainer_purchases
  where id = p_purchase_id
  for update;

  if v_max_devices is null then
    return jsonb_build_object('ok', false, 'reason', 'invalid');
  end if;

  if exists (
    select 1 from trainer_activations
    where purchase_id = p_purchase_id and device_id = p_device_id
  ) then
    return jsonb_build_object('ok', true);
  end if;

  select count(*) into v_count
  from trainer_activations
  where purchase_id = p_purchase_id;

  if v_count >= v_max_devices then
    return jsonb_build_object('ok', false, 'reason', 'device_limit');
  end if;

  insert into trainer_activations (purchase_id, device_id) values (p_purchase_id, p_device_id);

  return jsonb_build_object('ok', true);
end;
$$;
