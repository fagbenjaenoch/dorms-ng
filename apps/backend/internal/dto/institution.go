package dto

type CreateInstitution struct {
	Name        string  `json:"name" validate:"required,min=2,max=100"`
	Acronym     string  `json:"acronym" validate:"required,min=2,max=20"`
	Latitude    float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude   float64 `json:"longitude" validate:"required,min=-180,max=180"`
	State       string  `json:"state" validate:"required,min=2,max=100"`
	City        string  `json:"city" validate:"required,min=2,max=100"`
	Description string  `json:"description" validate:"required"`
}

type Institution struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Acronym     string  `json:"acronym"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	State       string  `json:"state"`
	City        string  `json:"city"`
	Description string  `json:"description"`
}
