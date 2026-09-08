-- +goose Up
ALTER TABLE hostels ADD COLUMN host_phone TEXT;
ALTER TABLE hostels ADD COLUMN host_email TEXT;

-- +goose Down
ALTER TABLE hostels DROP COLUMN host_phone;
ALTER TABLE hostels DROP COLUMN host_email;
