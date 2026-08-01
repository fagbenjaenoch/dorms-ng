-- +goose Up

CREATE TABLE users (
	id TEXT NOT NULL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	full_name TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_credentials (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'password')),
  provider_id TEXT NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_id)
);

CREATE TABLE institutions (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT,
  description TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neighborhoods (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    institution TEXT NOT NULL,
    institution_id TEXT NOT NULL,
    city TEXT NOT NULL,
    avg_price_self_con INTEGER,
    avg_price_1bed INTEGER,
    power_rating_insight TEXT,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
);

CREATE TABLE hostels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  description TEXT,
  city TEXT,
  neighborhood TEXT,
  neighborhood_id TEXT REFERENCES neighborhoods(id),
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  google_place_id TEXT UNIQUE,
  estimated_price_range DOUBLE PRECISION,
  distance_to_gate_km DOUBLE PRECISION,
  is_verified_by_admin BOOLEAN DEFAULT FALSE,
  photo_urls TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- For full-text search, use GIN index with pg_trgm extension instead of FTS5
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE global_search (
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity TEXT NOT NULL,
  slug TEXT NOT NULL,
  address TEXT,
  search_text TEXT,
  -- We'll use GIN indexes for text search instead of virtual tables
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create GIN indexes for trigram-based text search
CREATE INDEX idx_global_search_text_trgm ON global_search USING GIN (search_text gin_trgm_ops);
CREATE INDEX idx_global_search_entity_trgm ON global_search USING GIN (entity gin_trgm_ops);

-- +goose Down
DROP TABLE user_credentials;
DROP TABLE users;
DROP TABLE hostels;
DROP TABLE neighborhoods;
DROP TABLE institutions;
DROP INDEX IF EXISTS idx_global_search_entity_trgm;
DROP INDEX IF EXISTS idx_global_search_text_trgm;
DROP TABLE IF EXISTS global_search;
