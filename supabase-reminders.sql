-- Daily practice reminders (Web Push) — run this once in the SQL editor
-- of the english-jing-jing Supabase project.

create table if not exists public.trainer_reminders (
  id               uuid default gen_random_uuid() primary key,
  device_id        text not null unique,
  endpoint         text not null,
  keys_p256dh      text not null,
  keys_auth        text not null,
  reminder_time    text not null, -- "HH:MM", local to `timezone`, 5-minute steps
  timezone         text not null, -- IANA zone, e.g. "Asia/Bangkok"
  daily_goal_min   int not null default 60,
  last_sent_date   text, -- "YYYY-MM-DD" local date of the last push sent, prevents duplicates
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
alter table public.trainer_reminders enable row level security;
-- No public policies: only ever read/written by server-side API routes
-- using the Supabase service-role key, which bypasses RLS.

-- Keeps updated_at current on every upsert from /api/save-reminder.
create or replace function public.set_trainer_reminders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trainer_reminders_updated_at on public.trainer_reminders;
create trigger trainer_reminders_updated_at
  before update on public.trainer_reminders
  for each row execute function public.set_trainer_reminders_updated_at();

-- ---------------------------------------------------------------------
-- Scheduling: run this AFTER the site is deployed with the CRON_SECRET
-- env var set, so the URL and secret below match your real values.
-- ---------------------------------------------------------------------
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'ejj-send-reminders',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://YOUR-DOMAIN-HERE/api/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR-CRON-SECRET-HERE'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- To check it's registered: select * from cron.job;
-- To remove it later:       select cron.unschedule('ejj-send-reminders');
