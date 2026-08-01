-- name: CreateInstitution :one
INSERT INTO institutions (
    id, name, acronym, latitude, longitude, state, city, slug, description
) VALUES (
    @id, @name, @acronym, @latitude, @longitude, @state, @city, @slug, @description
)
RETURNING *;

-- name: ListInstitutions :many
SELECT * FROM institutions ORDER BY name;

-- name: GetInstitutionById :one
SELECT * FROM institutions WHERE id = @id LIMIT 1;

-- name: GetAllInstitutions :many
SELECT * FROM institutions;

-- name: GetInstitutionBySlug :one
SELECT * FROM institutions WHERE slug = @slug LIMIT 1;

-- name: CheckInstitutionExists :one
SELECT EXISTS(SELECT 1 FROM institutions WHERE LOWER(name) = LOWER(@name) AND LOWER(city) = LOWER(@city));


-- name: CreateHostel :one
INSERT INTO hostels (
    id, name, address, description, latitude, longitude,
    google_place_id, estimated_price_range, neighborhood, neighborhood_id,
    distance_to_gate_km, is_verified_by_admin, photo_urls, slug, amenities
) VALUES (
    @id, @name, @address, @description, @latitude, @longitude,
    @google_place_id, @estimated_price_range, @neighborhood, @neighborhood_id,
    @distance_to_gate_km, @is_verified_by_admin, @photo_urls, @slug, @amenities
)
RETURNING *;

-- name: GetHostel :one
SELECT * FROM hostels WHERE id = @id LIMIT 1;

-- name: GetHostelBySlug :one
SELECT * FROM hostels WHERE slug = @slug LIMIT 1;

-- name: GetHostelsByNeighborhood :many
SELECT * FROM hostels WHERE neighborhood_id = @neighborhood_id AND estimated_price_range <= @max_price AND estimated_price_range >= @min_price ORDER BY name LIMIT $1 OFFSET $2;

-- name: GetHostelsByCity :many
SELECT * FROM hostels WHERE city = @city ORDER BY name;

-- name: GetHostelsByInstitution :many
SELECT hostels.* FROM hostels INNER JOIN neighborhoods ON hostels.neighborhood_id = neighborhoods.id WHERE neighborhoods.institution_id = @institution_id AND hostels.estimated_price_range >= @min_price AND hostels.estimated_price_range <= @max_price LIMIT $1 OFFSET $2;

-- name: CheckHostelExists :one
SELECT EXISTS(SELECT 1 FROM hostels WHERE LOWER(name) = LOWER(@name));


-- name: CreateUser :one
INSERT INTO users (
    id, full_name, email, role
) VALUES (
    @id, @full_name, @email, @role
)
RETURNING *;

-- name: CheckUserExists :one
SELECT EXISTS(SELECT 1 FROM users WHERE email = @email);

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = @email LIMIT 1;


-- name: CreateUserCredentials :one
INSERT INTO user_credentials (
    id, user_id, provider, provider_id, password_hash
) VALUES (
    @id, @user_id, @provider, @provider_id, @password_hash
)
RETURNING *;

-- name: GetUserCredentialByProviderId :one
SELECT * FROM user_credentials WHERE provider_id = @provider_id LIMIT 1;


-- name: CreateNeighborhood :one
INSERT INTO neighborhoods (
    id, institution, institution_id, name, city, state, avg_price_self_con, avg_price_1bed, power_rating_insight
) VALUES (
    @id, @institution, @institution_id, @name, @city, @state, @avg_price_self_con, @avg_price_1bed, @power_rating_insight
)
RETURNING *;

-- name: GetNeighborhoodById :one
SELECT * FROM neighborhoods WHERE id = @id LIMIT 1;

-- name: GetNeighborhoodsByInstitution :many
SELECT * FROM neighborhoods WHERE institution_id = @institution_id ORDER BY name;

-- name: GetAllNeighborhoods :many
SELECT * FROM neighborhoods ORDER BY name;

-- name: CheckNeighborhoodExists :one
SELECT EXISTS(SELECT 1 FROM neighborhoods WHERE LOWER(name) = LOWER(@name) AND LOWER(city) = LOWER(@city) AND LOWER(institution) = LOWER(@institution));


-- name: CreateSearchEntry :one
INSERT INTO global_search (entity_id, entity_type, entity, search_text, slug, address)
VALUES (@entity_id, @entity_type, @entity, @search_text, @slug, @address)
RETURNING *;

-- name: GetSearchEntry :many
SELECT entity_id, entity_type, entity, slug, address,
       similarity(search_text, @search_text) AS relevance
FROM global_search
WHERE search_text % @search_text  -- Uses GIN index efficiently
   OR entity % @search_text       -- Search in entity too
ORDER BY relevance DESC
LIMIT 5;

-- name: CreatePlaceSearchEntry :one
INSERT INTO place_search (place_id, place_type, name)
VALUES (@place_id, @place_type, @name)
RETURNING *;

-- name: GetPlaceSearchEntry :many
SELECT place_id, place_type, name
FROM place_search
WHERE name ILIKE '%' || @name || '%'
   OR similarity(name, @name) > 0.3
ORDER BY similarity(name, @name) DESC
LIMIT 5;
