-- name: UserExists :one
SELECT EXISTS(SELECT 1 FROM users WHERE email = ? LIMIT 1);

-- name: CreateInstitution :one
INSERT INTO institutions (
    id, name, acronym, latitude, longitude, city, slug
) VALUES (
    ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: ListInstitutions :many
SELECT * FROM institutions ORDER BY name;

-- name: GetInstitutionById :one
SELECT * FROM institutions WHERE id = ? LIMIT 1;

-- name: GetAllInstitutions :many
SELECT * FROM institutions;

-- name: GetInstitutionBySlug :one
SELECT * FROM institutions WHERE slug = ? LIMIT 1;

-- name: CreateHostel :one
INSERT INTO hostels (
    id, name, address, description, city, latitude, longitude,
    google_place_id, estimated_price_range,
    distance_to_gate_km, is_verified_by_admin, primary_photo_url, slug
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: GetHostel :one
SELECT * FROM hostels WHERE id = ? LIMIT 1;

-- name: GetHostelBySlug :one
SELECT * FROM hostels WHERE slug = ? LIMIT 1;

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

-- name: CreateNeighborhood :one
INSERT INTO neighborhoods (
    id, institution_id, name, avg_price_self_con, avg_price_1bed, power_rating_insight
) VALUES (
    ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: GetNeighborhoodById :one
SELECT * FROM neighborhoods WHERE id = ? LIMIT 1;

-- name: GetNeighborhoodsByInstitution :many
SELECT * FROM neighborhoods WHERE institution_id = ? ORDER BY name;

-- name: GetAllNeighborhoods :many
SELECT * FROM neighborhoods ORDER BY name;


-- name: CreateSearchEntry :one
INSERT INTO global_search (entity_id, entity_type, entity, search_text, slug, address)
VALUES (?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetSearchEntry :many
SELECT entity_id, entity_type, entity, slug, address FROM global_search WHERE search_text MATCH ? ORDER BY rank LIMIT 5;
