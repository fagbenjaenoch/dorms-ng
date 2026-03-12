package dto

type StructuredResponse struct {
	Success bool   `json:"success"`
	Status  int    `json:"status"`
	Message string `json:"message"`
	Payload any    `json:"payload"`
}

type CreateUserDto struct {
	Email    string `json:"email"`
	FullName string `json:"full_name"`
	Role     string `json:"role"`
}

type GetUserDto struct {
	Email string `json:"email"`
}
