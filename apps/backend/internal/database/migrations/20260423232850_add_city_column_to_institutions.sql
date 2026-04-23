-- +goose Up
SELECT 'up SQL query';
ALTER TABLE institutions ADD COLUMN city TEXT NOT NULL;

-- +goose Down
SELECT 'down SQL query';
ALTER TABLE institutions DROP COLUMN city;
