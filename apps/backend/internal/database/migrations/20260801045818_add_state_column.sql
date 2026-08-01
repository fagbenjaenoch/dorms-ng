-- +goose Up
ALTER TABLE neighborhoods ADD COLUMN state TEXT NOT NULL;
ALTER TABLE institutions ADD COLUMN state TEXT NOT NULL;

-- +goose Down
ALTER TABLE neighborhoods DROP COLUMN state;
ALTER TABLE institutions DROP COLUMN state;
