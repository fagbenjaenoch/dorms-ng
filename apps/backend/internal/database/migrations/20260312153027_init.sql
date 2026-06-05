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
  description TEXT,
  latitude REAL NOT NULL,  -- GPS coordinate for the main gate
  longitude REAL NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE hostels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  description TEXT,
  city TEXT,
  neighborhood TEXT,
  neighborhood_id TEXT REFERENCES neighborhood(id),
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  google_place_id TEXT UNIQUE,
  estimated_price_range REAL,
  distance_to_gate_km REAL,
  is_verified_by_admin BOOLEAN DEFAULT FALSE,
  photo_urls TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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

CREATE VIRTUAL TABLE global_search USING fts5 (
  entity_id UNINDEXED,
  entity_type UNINDEXED,
  entity UNINDEXED,
  slug UNINDEXED,
  address UNINDEXED,
  search_text,
  tokenize="trigram"
);

-- +goose Down
DROP TABLE user_credentials;
DROP TABLE users;
DROP TABLE institutions;
DROP TABLE hostels;
DROP TABLE neighborhoods;
DROP TABLE global_search;
