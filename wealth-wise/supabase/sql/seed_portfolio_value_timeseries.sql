-- Seed 20 rows for portfolio_value_timeseries for a specific user
-- Safe to run multiple times thanks to ON CONFLICT DO NOTHING
-- How to use: paste into Supabase SQL Editor for your project and run.

insert into public.portfolio_value_timeseries (user_id, ts, total_value, granularity, source, currency)
values
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '19 days', 24500.00, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '18 days', 24620.50, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '17 days', 24480.75, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '16 days', 24710.30, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '15 days', 24990.10, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '14 days', 25120.40, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '13 days', 25010.35, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '12 days', 25280.90, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '11 days', 25510.25, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '10 days', 25400.80, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '9 days', 25750.60, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '8 days', 25910.20, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '7 days', 26180.45, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '6 days', 26050.15, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '5 days', 26340.70, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '4 days', 26590.85, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '3 days', 26810.10, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '2 days', 27005.55, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now() - interval '1 day', 27120.30, '1d', 'manual', 'USD'),
  ('9abd14b6-4741-4a95-8341-2c5c49423145', now(),                    27350.00, '1d', 'manual', 'USD')
ON CONFLICT (user_id, ts, granularity) DO NOTHING;
