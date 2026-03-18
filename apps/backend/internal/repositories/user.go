package repositories

import (
	"context"
	"database/sql"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type UserRepository struct {
	BaseRepository
}

func NewUserRepository(db *sql.DB, logger *zerolog.Logger) UserRepository {
	return UserRepository{
		BaseRepository: BaseRepository{
			Queries: models.New(db),
			Logger:  logger,
		},
	}
}

func (ur *UserRepository) UserExists(ctx context.Context, email string) (bool, error) {
	exists, err := ur.Queries.UserExists(ctx, email)
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute query")
		return false, err
	}

	return exists != 0, nil
}

func (ur *UserRepository) CreateUser(ctx context.Context, user dto.CreateUserDto) (*models.User, error) {
	var u models.CreateUserParams
	u.ID = uuid.New().String()
	u.FullName = user.FullName
	u.Email = user.Email
	u.Role = user.Role

	cu, err := ur.Queries.CreateUser(ctx, u)
	if err != nil {
		return nil, err
	}

	return &cu, nil
}

func (ur *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	u, err := ur.Queries.GetUserByEmail(ctx, email)
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute query")
		return nil, err
	}

	return &u, nil
}
