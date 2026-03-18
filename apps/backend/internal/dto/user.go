package dto

type CreateUserDto struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"full_name" validate:"required,min=2,max=50"`
	Role     string `json:"role" validate:"omitempty,oneof=admin user"`
}

type CreateUserWithPasswordDto struct {
	CreateUserDto
	Provider string `json:"provider" validate:"required,oneof=password"`
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type GetUserDto struct {
	Email string `json:"email"`
}
