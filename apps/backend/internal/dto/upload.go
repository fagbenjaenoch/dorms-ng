package dto

type PresignedURLRequest struct {
	EntityType string `json:"entity_type"`
	EntityName string `json:"entity_name"`
}

type PresignedURLPayload struct {
	URL string `json:"url"`
}

type UploadURLPayload struct {
	UploadURL string `json:"upload_url"`
	PublicURL string `json:"public_url"`
}
