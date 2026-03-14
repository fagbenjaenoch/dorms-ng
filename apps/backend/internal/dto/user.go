package dto

type CreateUserDto struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"full_name" validate:"required"`
	Role     string `json:"role"`
}

type GetUserDto struct {
	Email string `json:"email"`
}
