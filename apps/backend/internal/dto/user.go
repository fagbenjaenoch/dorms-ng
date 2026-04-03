package dto

type CreateUser struct {
	Email    string `json:"email" validate:"required,email"`
	FullName string `json:"fullname" validate:"required,min=2,max=50"`
	Role     string `json:"role" validate:"omitempty,oneof=admin user"`
}

type CreateUserWithPassword struct {
	CreateUser
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type LoginUser struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type GetUser struct {
	Email string `json:"email"`
}

type CreateUserPayload struct {
	ID       string `json:"id"`
	FullName string `json:"fullname"`
	Email    string `json:"email"`
	Token    string `json:"token"`
}

type LoginPayload struct {
	CreateUserPayload
	Provider string `json:"provider"`
}
