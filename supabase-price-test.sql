-- English jing jing — price test (249 vs 349 THB)
-- Run this once in the SQL editor of the dedicated english-jing-jing Supabase project.
-- Adds the column needed to tag funnel events (paywall_view, paywall_cta_click,
-- purchase) with which price variant the visitor saw, so conversion and
-- revenue can be compared per variant later.

alter table public.trainer_events
  add column if not exists price_variant text;

create index if not exists trainer_events_price_variant_idx
  on public.trainer_events(price_variant);
