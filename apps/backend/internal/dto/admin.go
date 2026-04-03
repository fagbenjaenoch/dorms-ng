package dto

type CreateInstitution struct {
	Name      string  `json:"name" validate:"required,min=2,max=100"`
	Acronym   string  `json:"acronym" validate:"required,min=2,max=10"`
	Latitude  float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude float64 `json:"longitude" validate:"required,min=-180,max=180"`
}

type CreateHostel struct {
	Name         string  `json:"name" validate:"required,min=2,max=100"`
	Address      string  `json:"address" validate:"required,min=2,max=255"`
	Neighborhood string  `json:"neighborhood" validate:"required,min=2,max=100"`
	Latitude     float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude    float64 `json:"longitude" validate:"required,min=-180,max=180"`
	Institution  string  `json:"institution" validate:"required,min=2,max=100"`
}

type CreateNeighborhood struct {
	Name               string  `json:"name" validate:"required,min=2,max=100"`
	Institution        string  `json:"institution" validate:"required,min=2,max=100"`
	AvgPriceSelfCon    int     `json:"avg_price_self_con" validate:"required,min=0"`
	AvgPrice1bed       int     `json:"avg_price_1bed" validate:"required,min=0"`
	PowerRatingInsight string  `json:"power_rating_insight" validate:"required,min=0,max=100"`
	Latitude           float64 `json:"latitude" validate:"required,min=-90,max=90"`
	Longitude          float64 `json:"longitude" validate:"required,min=-180,max=180"`
}
