-- +goose Up
ALTER TABLE hostels
ADD COLUMN amenities JSONB DEFAULT '[]'::JSONB;

CREATE INDEX idx_amenities ON hostels USING GIN (amenities);

-- +goose Down
ALTER TABLE hostels
DROP COLUMN amenities;
