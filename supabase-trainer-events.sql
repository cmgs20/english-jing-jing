-- English jing jing trainer — lightweight conversion funnel tracking
-- Run this once in the SQL editor of the dedicated english-jing-jing Supabase project.

create table if not exists public.trainer_events (
  id          bigint generated always as identity primary key,
  event       text not null,        -- 'paywall_view' | 'paywall_cta_click' | 'purchase'
  context     text,                 -- which module triggered it: 'drill' | 'verbs' | 'grammar' | 'pron' | 'settings' | null
  device_id   text,
  created_at  timestamptz default now()
);
alter table public.trainer_events enable row level security;
-- No public policies: this table is only ever read/written by server-side
-- API routes using the Supabase service-role key, which bypasses RLS.

create index if not exists trainer_events_event_idx on public.trainer_events(event);
create index if not exists trainer_events_created_at_idx on public.trainer_events(created_at);
