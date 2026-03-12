
-- name: CreateInstitution :one
INSERT INTO universities (
    id, name, acronym, latitude, longitude
) VALUES (
    ?, ?, ?, ?, ?
)
RETURNING *;

-- name: Listuniversities :many
SELECT * FROM universities ORDER BY name;

-- name: GetInstitution :one
SELECT * FROM universities WHERE id = ? LIMIT 1;

-- name: CreateNeighborhood :one
INSERT INTO neighborhoods (
    id, university_id, name, avg_price_self_con, avg_price_1bed,
    power_rating_insight, latitude, longitude
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: ListNeighborhoodsByInstitution :many
SELECT * FROM neighborhoods
WHERE university_id = ?
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

-- name: CreateUserIdentity :one
INSERT INTO user_identities (
    id, user_id, provider, provider_id
) VALUES (
    ?, ?, ?, ?
)
RETURNING *;
