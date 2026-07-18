-- English jing jing trainer — lightweight conversion funnel tracking
-- Run this once in the SQL editor of the dedicated english-jing-jing Supabase project.

create table if not exists public.trainer_events (
  id          bigint generated always as identity primary key,
  -- 'paywall_view' | 'paywall_cta_click' | 'purchase' (logged by the Stripe webhook)
  -- | 'restore_attempt' | 'access_link_result' | 'resend_requested' | 'session_unlock_result'
  event       text not null,
  -- meaning depends on `event`:
  --   paywall_view / paywall_cta_click: which module triggered it — 'drill' | 'verbs' | 'grammar' | 'pron' | 'settings' | null
  --   restore_attempt (manual code/link paste) / access_link_result (clicked emailed link):
  --     'ok' | 'invalid' | 'device_limit' | 'server_error' | 'network_error' | 'no_code'
  --   resend_requested: 'ok' | 'not_found' | 'invalid' | 'server_error' | 'network_error'
  --   session_unlock_result: 'purchase_instant' | 'purchase_pending' | 'device_addon_instant' | 'device_addon_pending'
  context     text,
  device_id   text,
  created_at  timestamptz default now()
);
alter table public.trainer_events enable row level security;
-- No public policies: this table is only ever read/written by server-side
-- API routes using the Supabase service-role key, which bypasses RLS.

create index if not exists trainer_events_event_idx on public.trainer_events(event);
create index if not exists trainer_events_created_at_idx on public.trainer_events(created_at);
