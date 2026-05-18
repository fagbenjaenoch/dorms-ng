package dto

type CreateNeighborhood struct {
	Name          string `json:"name" validate:"required,min=2,max=100"`
	Institution   string `json:"institution" validate:"required"`
	InstitutionId string `json:"institutionId" validate:"required,min=2,max=100"`
	City          string `json:"city" validate:"required"`
}

type Neighborhood struct {
	Name string `json:"name"`
}

type NeighborhoodPayload struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
