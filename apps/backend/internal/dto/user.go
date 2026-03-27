package dto

type CreateUserDto struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"fullname" validate:"required,min=2,max=50"`
	Role     string `json:"role" validate:"omitempty,oneof=admin user"`
}

type CreateUserWithPasswordDto struct {
	CreateUserDto
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type LoginUserDto struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type GetUserDto struct {
	Email string `json:"email"`
}
