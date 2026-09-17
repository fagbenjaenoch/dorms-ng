-- +goose Up
ALTER TABLE hostels ADD COLUMN occupancy_type TEXT;

-- +goose Down
ALTER TABLE hostels DROP COLUMN occupancy_type;
