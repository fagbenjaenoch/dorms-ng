package services

import (
	"context"
	"database/sql"

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

func (us *UserService) GetAllUsers(ctx context.Context) dto.StructuredResponse {
	users := us.userRepo.GetAllUsers(ctx)
	return dto.StructuredResponse{
		Success: true,
		Status:  200,
		Message: "found all users",
		Payload: users,
	}
}
