-- +goose Up
PRAGMA foreign_keys = ON;

CREATE TABLE users (
	id TEXT NOT NULL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	full_name TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_identities (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('google', 'password')),
  provider_id TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_id)
);

CREATE TABLE universities (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT,
  latitude REAL NOT NULL,  -- GPS coordinate for the main gate
  longitude REAL NOT NULL
);

CREATE TABLE neighborhoods (
  id TEXT NOT NULL PRIMARY KEY,
  university_id TEXT NOT NULL REFERENCES universities ON DELETE CASCADE,
  name TEXT NOT NULL,
  avg_price_self_con INTEGER,
  avg_price_1bed INTEGER,
  power_rating_insight TEXT,
  latitude REAL NOT NULL,           -- Center point of the neighborhood
  longitude REAL NOT NULL
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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE user_identities;
DROP TABLE users;
DROP TABLE universities;
DROP TABLE neighborhoods;
DROP TABLE hostels;
