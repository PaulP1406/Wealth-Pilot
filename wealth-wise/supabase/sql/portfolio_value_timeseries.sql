-- Portfolio Value Time Series schema for Supabase/Postgres
-- This sets up a minimal table to power a portfolio chart.
-- You can manually insert/edit values to drive the UI.

-- Optional: Ensure pgcrypto for gen_random_uuid()
-- (Usually enabled in Supabase; safe to attempt.)
create extension if not exists pgcrypto;

-- Safe enum creation for granularity
do $$
begin
  if not exists (select 1 from pg_type where typname = 'chart_granularity') then
    create type chart_granularity as enum ('tick','1m','5m','1h','1d');
  end if;
end$$;

-- Main table for the chart points
create table if not exists public.portfolio_value_timeseries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ts timestamptz not null default now(),
  total_value numeric(20,2) not null check (total_value >= 0),
  currency text not null default 'USD',
  granularity chart_granularity not null default '1d',
  source text not null default 'manual', -- e.g., manual|trade|market_job
  created_at timestamptz not null default now(),
  unique (user_id, ts, granularity)
);

-- Indexes for fast range queries
create index if not exists idx_pvts_user_ts
  on public.portfolio_value_timeseries (user_id, ts desc);

create index if not exists idx_pvts_user_gran_ts
  on public.portfolio_value_timeseries (user_id, granularity, ts desc);

-- Enable Row Level Security
alter table public.portfolio_value_timeseries enable row level security;

-- RLS policies: users can see and manage only their rows
do $$
begin
  if exists (
    select 1 from pg_policies where schemaname='public' and tablename='portfolio_value_timeseries' and policyname='pvts_select_own'
  ) then
    drop policy "pvts_select_own" on public.portfolio_value_timeseries;
  end if;
end$$;

create policy "pvts_select_own"
  on public.portfolio_value_timeseries
  for select
  using (auth.uid() = user_id);

do $$
begin
  if exists (
    select 1 from pg_policies where schemaname='public' and tablename='portfolio_value_timeseries' and policyname='pvts_modify_own'
  ) then
    drop policy "pvts_modify_own" on public.portfolio_value_timeseries;
  end if;
end$$;

create policy "pvts_modify_own"
  on public.portfolio_value_timeseries
  for insert
  with check (auth.uid() = user_id);

do $$
begin
  if exists (
    select 1 from pg_policies where schemaname='public' and tablename='portfolio_value_timeseries' and policyname='pvts_update_own'
  ) then
    drop policy "pvts_update_own" on public.portfolio_value_timeseries;
  end if;
end$$;

create policy "pvts_update_own"
  on public.portfolio_value_timeseries
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

do $$
begin
  if exists (
    select 1 from pg_policies where schemaname='public' and tablename='portfolio_value_timeseries' and policyname='pvts_delete_own'
  ) then
    drop policy "pvts_delete_own" on public.portfolio_value_timeseries;
  end if;
end$$;

create policy "pvts_delete_own"
  on public.portfolio_value_timeseries
  for delete
  using (auth.uid() = user_id);

-- Optional: Example seed data for a specific user
-- Replace 00000000-0000-0000-0000-000000000000 with your user UUID
-- Uncomment to insert sample points.
-- insert into public.portfolio_value_timeseries (user_id, ts, total_value, granularity, source)
-- values
--   ('00000000-0000-0000-0000-000000000000', now() - interval '5 days', 25000.00, '1d', 'manual'),
--   ('00000000-0000-0000-0000-000000000000', now() - interval '4 days', 25550.00, '1d', 'manual'),
--   ('00000000-0000-0000-0000-000000000000', now() - interval '3 days', 25210.00, '1d', 'manual'),
--   ('00000000-0000-0000-0000-000000000000', now() - interval '2 days', 26005.00, '1d', 'manual'),
--   ('00000000-0000-0000-0000-000000000000', now() - interval '1 days', 26230.00, '1d', 'manual'),
--   ('00000000-0000-0000-0000-000000000000', now(),                    26510.00, '1d', 'manual');

-- Query example (for reference):
-- select ts, total_value
-- from public.portfolio_value_timeseries
-- where user_id = '00000000-0000-0000-0000-000000000000'
--   and granularity = '1d'
--   and ts >= now() - interval '6 months'
-- order by ts asc;
