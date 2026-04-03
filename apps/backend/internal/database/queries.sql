-- name: UserExists :one
SELECT EXISTS(SELECT 1 FROM users WHERE email = ? LIMIT 1);

-- name: CreateInstitution :one
INSERT INTO institutions (
    id, name, acronym, latitude, longitude
) VALUES (
    ?, ?, ?, ?, ?
)
RETURNING *;

-- name: ListInstitutions :many
SELECT * FROM institutions ORDER BY name;

-- name: GetInstitutionById :one
SELECT * FROM institutions WHERE id = ? LIMIT 1;

-- name: CreateNeighborhood :one
INSERT INTO neighborhoods (
    id, institution_id, name, avg_price_self_con, avg_price_1bed,
    power_rating_insight, latitude, longitude
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: ListNeighborhoodsByInstitution :many
SELECT * FROM neighborhoods
WHERE institution_id = ?
ORDER BY name;

-- name: GetNeighborhood :one
SELECT * FROM neighborhoods WHERE id = ? LIMIT 1;

-- name: CreateHostel :one
INSERT INTO hostels (
    id, neighborhood_id, name, address, latitude, longitude,
    google_place_id, google_rating, estimated_price_range,
    distance_to_gate_km, eta_walking_mins, is_verified_by_admin
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: GetHostel :one
SELECT * FROM hostels WHERE id = ? LIMIT 1;

-- name: ListHostelsByNeighborhood :many
SELECT * FROM hostels
WHERE neighborhood_id = ?
ORDER BY is_verified_by_admin DESC, name;

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
INSERT INTO global_search (entity_id, entity_type, search_text, description)
VALUES (?, ?, ?, ?)
RETURNING *;
