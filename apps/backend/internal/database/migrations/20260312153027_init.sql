-- +goose Up

PRAGMA foreign_keys = ON;
-- PRAGMA journal_mode =WAL;
-- PRAGMA synchronous=normal;
-- PRAGMA threads = 4;

CREATE TABLE users (
	id TEXT NOT NULL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	full_name TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_credentials (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'password')), -- could be enums but sqlite doesn't support them
  provider_id TEXT NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_id)
);

CREATE TABLE institutions (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT,
  latitude REAL NOT NULL,  -- GPS coordinate for the main gate
  longitude REAL NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE hostels (
  id TEXT PRIMARY KEY,
  neighborhood_id TEXT REFERENCES neighborhoods ON DELETE SET NULL,
  name TEXT NOT NULL,
  address TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,

  -- Scraped/Sourced Data
  google_place_id TEXT UNIQUE,
  google_rating REAL,

  -- Curated Trust Layer Insights
  estimated_price_range TEXT,

  -- Calculated Fields (Computed by your Go backend before inserting)
  distance_to_gate_km REAL,
  eta_walking_mins INTEGER,

  is_verified_by_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE VIRTUAL TABLE global_search USING fts5 (
  entity_id UNINDEXED,
  entity_type UNINDEXED,
  entity UNINDEXED,
  search_text,
  tokenize="trigram"
);

-- +goose Down
DROP TABLE user_credentials;
DROP TABLE users;
DROP TABLE institutions;
DROP TABLE hostels;
DROP TABLE global_search;
