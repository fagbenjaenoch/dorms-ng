package dto

type HttpResponse struct {
	Success bool   `json:"success"`
	Status  int    `json:"status"`
	Message string `json:"message"`
	Payload any    `json:"payload"`
}
