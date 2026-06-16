-- +goose Up
CREATE TABLE place_search (
  place_id TEXT NOT NULL,
  place_type TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_place_search_name_trgm ON place_search USING GIN (name gin_trgm_ops);

-- +goose Down
DROP INDEX IF EXISTS idx_place_search_name_trgm;
DROP TABLE IF EXISTS place_search;
