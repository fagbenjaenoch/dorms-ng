package dto

type CreateInstitution struct {
	Name      string  `json:"name" validate:"required,min=2,max=100"`
	Acronym   string  `json:"acronym" validate:"required,min=2,max=10"`
	Latitude  float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude float64 `json:"longitude" validate:"required,min=-180,max=180"`
	City      string  `json:"city" validate:"required,min=2,max=100"`
}

type CreateHostel struct {
	Name            string  `json:"name" validate:"required,min=2,max=100"`
	Address         string  `json:"address" validate:"required,min=2,max=255"`
	Description     string  `json:"description" validate:"required,min=10,max=4000"`
	City            string  `json:"city" validate:"required,min=2,max=100"`
	Neighborhood    string  `json:"neighborhood" validate:"required,min=2,max=100"`
	NeighborhoodID  string  `json:"neighborhoodId" validate:"required,uuid"`
	Latitude        float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude       float64 `json:"longitude" validate:"required,min=-180,max=180"`
	PrimaryPhotoURL string  `json:"primary_photo_url" validate:"required,url"`
}

type CreateHostelResponsePayload struct {
	Name            string  `json:"name"`
	Address         string  `json:"address"`
	Description     string  `json:"description"`
	City            string  `json:"city"`
	Latitude        float64 `json:"latitude"`
	Longitude       float64 `json:"longitude"`
	PrimaryPhotoURL string  `json:"primary_photo_url"`
	Slug            string  `json:"slug"`
}

type CreateNeighborhood struct {
	Name          string `json:"name" validate:"required,min=2,max=100"`
	InstitutionId string `json:"institutionId" validate:"required,min=2,max=100"`
}

type CreateNeighborhoodResponsePayload struct {
	Name string `json:"name"`
}

type NeighborhoodPayload struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
