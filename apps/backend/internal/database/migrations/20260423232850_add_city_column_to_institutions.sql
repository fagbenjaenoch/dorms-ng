-- +goose Up
ALTER TABLE institutions ADD COLUMN city TEXT NOT NULL;

-- +goose Down
ALTER TABLE institutions DROP COLUMN city;
