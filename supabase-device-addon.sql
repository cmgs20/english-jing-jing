-- English jing jing — one-time "add a device" purchase
-- Run this once in the SQL editor of the english-jing-jing Supabase project.

create table if not exists public.trainer_device_addons (
  id                 uuid default gen_random_uuid() primary key,
  purchase_id        uuid references public.trainer_purchases(id) on delete cascade not null,
  stripe_session_id  text unique not null,
  amount_thb         numeric(8,2) not null,
  created_at         timestamptz default now()
);
alter table public.trainer_device_addons enable row level security;
-- No public policies: this table is only ever read/written by server-side
-- API routes using the Supabase service-role key, which bypasses RLS.

-- Grants one extra device slot for a purchase after a successful Stripe
-- payment. Idempotent: if the same Stripe session is delivered twice by a
-- webhook replay, the unique constraint on stripe_session_id makes the second
-- insert a no-op, so max_devices is only ever incremented once per session.
create or replace function public.grant_trainer_device_addon(p_purchase_id uuid, p_session_id text, p_amount numeric)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into trainer_device_addons (purchase_id, stripe_session_id, amount_thb)
  values (p_purchase_id, p_session_id, p_amount)
  on conflict (stripe_session_id) do nothing;

  if not found then
    return jsonb_build_object('ok', true, 'already_applied', true);
  end if;

  update trainer_purchases
  set max_devices = max_devices + 1
  where id = p_purchase_id;

  return jsonb_build_object('ok', true, 'already_applied', false);
end;
$$;
