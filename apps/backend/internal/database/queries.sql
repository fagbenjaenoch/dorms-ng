-- name: UserExists :one
SELECT EXISTS(SELECT 1 FROM users WHERE email = ? LIMIT 1);

-- name: CreateInstitution :one
INSERT INTO institutions (
    id, name, acronym, latitude, longitude, city
) VALUES (
    ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: ListInstitutions :many
SELECT * FROM institutions ORDER BY name;

-- name: GetInstitutionById :one
SELECT * FROM institutions WHERE id = ? LIMIT 1;

-- name: CreateHostel :one
INSERT INTO hostels (
    id, name, address, description, city, latitude, longitude,
    google_place_id, estimated_price_range,
    distance_to_gate_km, is_verified_by_admin, primary_photo_url
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: GetHostel :one
SELECT * FROM hostels WHERE id = ? LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (
    id, full_name, email, role
) VALUES (
    ?, ?, ?, ?
)
RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = ? LIMIT 1;

-- name: GetUserCredentialByProviderId :one
SELECT * FROM user_credentials WHERE provider_id = ? LIMIT 1;

-- name: CreateUserCredentials :one
INSERT INTO user_credentials (
    id, user_id, provider, provider_id, password_hash
) VALUES (
    ?, ?, ?, ?, ?
)
RETURNING *;

-- name: CreateSearchEntry :one
INSERT INTO global_search (entity_id, entity_type, entity, search_text)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: GetSearchEntry :many
SELECT entity_id, entity_type, entity FROM global_search WHERE search_text MATCH ? ORDER BY rank LIMIT 5;
