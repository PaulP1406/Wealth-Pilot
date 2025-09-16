-- ============================================================================
-- Portfolio Value Time Series — Full Seed for All Chart Ranges
-- Creates deterministic data covering:
--  - Daily ('1d') points for ~2 years (fills 1M/3M/6M/1Y/ALL)
--  - Hourly ('1h') points for the last 5 days (fills 1D/5D)
-- Safe to re-run: ON CONFLICT upserts will overwrite values for consistency
--
-- HOW TO USE:
-- 1) Replace USER_UUID with your actual user id
-- 2) Run in Supabase SQL Editor (or psql)
-- 3) Optional: adjust base/trend multipliers in the CTEs for different shapes
-- ============================================================================

-- =======================
-- 1) DAILY DATA (2 years)
-- =======================
with params as (
  select 'USER_UUID'::uuid as uid, 'USD'::text as currency
),
-- Define date range (2 years inclusive)
 days as (
  select generate_series(
    date_trunc('day', now() at time zone 'utc') - interval '729 days',
    date_trunc('day', now() at time zone 'utc'),
    interval '1 day'
  )::timestamptz as ts
),
 days_num as (
  select ts, row_number() over (order by ts) - 1 as i from days
),
 daily_values as (
  -- Deterministic value model: base + trend + seasonal cycles
  select
    ts,
    round(
      (
        10000                                 -- base
        + (i * 8)                             -- upward daily trend
        + 350 * sin(2 * pi() * i / 30.0)      -- ~monthly seasonality
        + 200 * cos(2 * pi() * i / 90.0)      -- ~quarterly seasonality
      )::numeric
    , 2) as total_value
  from days_num
)
insert into public.portfolio_value_timeseries (
  user_id, ts, total_value, currency, granularity, source
)
select
  p.uid,
  d.ts,
  d.total_value,
  p.currency,
  '1d'::chart_granularity,
  'seed-full'
from daily_values d
cross join params p
on conflict (user_id, ts, granularity)
  do update set
    total_value = excluded.total_value,
    currency    = excluded.currency,
    source      = excluded.source
;

-- =============================
-- 2) HOURLY DATA (last 5 days)
-- =============================
with params as (
  select 'USER_UUID'::uuid as uid, 'USD'::text as currency
),
 hours as (
  select generate_series(
    date_trunc('hour', now() at time zone 'utc') - interval '5 days',
    date_trunc('hour', now() at time zone 'utc'),
    interval '1 hour'
  )::timestamptz as ts
),
 hours_num as (
  select ts, row_number() over (order by ts) - 1 as j from hours
),
 hourly_values as (
  -- Hourly band around ~16k-18k with intraday and short cycles
  select
    ts,
    round(
      (
        16000                                 -- base band for recent hours
        + (j * 0.8)                           -- small hourly drift
        + 120 * sin(2 * pi() * j / 24.0)      -- intra-day wave
        +  40 * cos(2 * pi() * j / 6.0)       -- shorter swings
        +   5 * sin(2 * pi() * j / 3.0)       -- micro noise
      )::numeric
    , 2) as total_value
  from hours_num
)
insert into public.portfolio_value_timeseries (
  user_id, ts, total_value, currency, granularity, source
)
select
  p.uid,
  h.ts,
  h.total_value,
  p.currency,
  '1h'::chart_granularity,
  'seed-full'
from hourly_values h
cross join params p
on conflict (user_id, ts, granularity)
  do update set
    total_value = excluded.total_value,
    currency    = excluded.currency,
    source      = excluded.source
;

-- =====================================
-- Optional: quick checks (run separately)
-- =====================================
-- select granularity, count(*) from public.portfolio_value_timeseries
-- where user_id = 'USER_UUID'
-- group by 1 order by 1;
--
-- select * from public.portfolio_value_timeseries
-- where user_id = 'USER_UUID' and granularity = '1h'
-- order by ts desc limit 5;
--
-- select * from public.portfolio_value_timeseries
-- where user_id = 'USER_UUID' and granularity = '1d'
-- order by ts desc limit 5;
