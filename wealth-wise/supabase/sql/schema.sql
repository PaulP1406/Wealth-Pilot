-- Categories
create table categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  color text,
  created_at timestamp default now()
);

-- Budgets
create table budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  amount numeric not null,
  start_date date,
  end_date date,
  created_at timestamp default now()
);

-- Transactions
create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category_id uuid references categories(id) on delete set null,
  budget_id uuid references budgets(id) on delete set null,
  amount numeric not null,
  description text,
  date timestamp not null default now(),
  created_at timestamp default now()
);

create table financial_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline date,
  created_at timestamp default now()
);

create table accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  balance numeric default 0,
  last_updated timestamp default now()
);

-- Portfolios
create table investment_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  start_amount numeric not null,
  created_at timestamp default now()
);

-- Holdings (current positions)
create table investment_holdings (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references investment_portfolios(id) on delete cascade,
  symbol text not null,
  name text,
  quantity numeric not null,
  purchase_price numeric not null,
  purchase_date timestamp not null default now(),
  asset_type text check (asset_type in ('stock', 'crypto')),
  created_at timestamp default now()
);

-- Transactions (buy/sell history)
create table investment_transactions (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references investment_portfolios(id) on delete cascade,
  symbol text not null,
  action text check (action in ('buy', 'sell')) not null,
  quantity numeric not null,
  price_per_unit numeric not null,
  date timestamp not null default now(),
  created_at timestamp default now()
);

create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamp default now()
);
