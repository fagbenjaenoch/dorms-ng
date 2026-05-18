package dto

type CreateNeighborhood struct {
	Name          string `json:"name" validate:"required,min=2,max=100"`
	InstitutionId string `json:"institutionId" validate:"required,min=2,max=100"`
}

type Neighborhood struct {
	Name string `json:"name"`
}

type NeighborhoodPayload struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
