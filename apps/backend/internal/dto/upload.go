package dto

type PresignedURLRequest struct {
	EntityType string `json:"entity_type"`
	EntityName string `json:"entity_name"`
}

type PresignedURLResponse struct {
	URL string `json:"url"`
}
