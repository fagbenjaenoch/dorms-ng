-- +goose Up
ALTER TABLE hostels ADD COLUMN hostel_type TEXT;

-- +goose Down
ALTER TABLE hostels DROP COLUMN hostel_type;
