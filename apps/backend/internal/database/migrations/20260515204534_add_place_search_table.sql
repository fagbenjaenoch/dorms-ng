-- +goose Up
CREATE VIRTUAL TABLE place_search USING fts5 (
  place_id UNINDEXED,
  name,
  tokenize="trigram"
);

-- +goose Down
DROP TABLE place_search;
