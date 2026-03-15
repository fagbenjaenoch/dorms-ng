package dto

type CreateUserDto struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"full_name" validate:"required,min=2,max=50"`
	Role     string `json:"role" validate:"omitempty,oneof=admin user"`
}

type GetUserDto struct {
	Email string `json:"email"`
}
