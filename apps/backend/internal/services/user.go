package services

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/repositories"
	"github.com/rs/zerolog"
)

type UserService struct {
	userRepo repositories.UserRepository
	Logger   *zerolog.Logger
}

func NewUserService(db *sql.DB, logger *zerolog.Logger) UserService {
	return UserService{
		userRepo: repositories.NewUserRepository(db, logger),
		Logger:   logger,
	}
}

func (us *UserService) CreateUser(ctx context.Context, u dto.CreateUserDto) dto.StructuredResponse {
	user, err := us.userRepo.CreateUser(ctx, u)
	if err != nil {
		us.Logger.Err(err).Msg("could not create user")
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusInternalServerError,
			Message: "could not create user",
			Payload: nil,
		}
	}
	return dto.StructuredResponse{
		Success: true,
		Status:  201,
		Message: "created user",
		Payload: struct {
			FullName string `json:"full_name"`
			Email    string `json:"email"`
		}{
			FullName: user.FullName,
			Email:    user.Email,
		},
	}
}

func (us *UserService) GetUserByEmail(ctx context.Context, email string) dto.StructuredResponse {
	user, err := us.userRepo.GetUserByEmail(ctx, email)
	if err != nil {
		us.Logger.Err(err).Msg("could not fetch user")
		return dto.StructuredResponse{
			Success: false,
			Status:  http.StatusNotFound,
			Message: "could not fetch user",
			Payload: nil,
		}
	}
	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "found all users",
		Payload: user,
	}
}
