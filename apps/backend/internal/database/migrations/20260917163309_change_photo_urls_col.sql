-- +goose Up
ALTER TABLE hostels
ALTER COLUMN photo_urls TYPE text[] USING string_to_array(photo_urls, ',')::text[];

-- +goose Down
ALTER TABLE hostels
ALTER COLUMN photo_urls TYPE text;
