package dto

type CreateHostel struct {
	Name                string  `json:"name" validate:"required,min=2,max=100"`
	Address             string  `json:"address" validate:"required,min=2,max=255"`
	Description         string  `json:"description" validate:"required,min=10,max=4000"`
	City                string  `json:"city" validate:"required,min=2,max=100"`
	Neighborhood        string  `json:"neighborhood" validate:"required,min=2,max=100"`
	NeighborhoodID      string  `json:"neighborhoodId" validate:"required,uuid"`
	EstimatedPriceRange float64 `json:"estimatedPriceRange" validate:"required"`
	Latitude            float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude           float64 `json:"longitude" validate:"required,min=-180,max=180"`
	PrimaryPhotoURL     string  `json:"primary_photo_url" validate:"required,url"`
	IsVerified          bool    `json:"isVerified" validate:"required"`
}

type Hostel struct {
	Name                string  `json:"name"`
	Address             string  `json:"address"`
	Description         string  `json:"description"`
	City                string  `json:"city"`
	Neighborhood        string  `json:"neighborhood"`
	EstimatedPriceRange float64 `json:"estimatedPriceRange"`
	Latitude            float64 `json:"latitude"`
	Longitude           float64 `json:"longitude"`
	PrimaryPhotoURL     string  `json:"primary_photo_url"`
	Slug                string  `json:"slug"`
	IsVerified          bool    `json:"isVerified"`
}
