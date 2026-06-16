package repositories

import (
	"context"
	"database/sql"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database/models"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/dto"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/utils"
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

func (ur *UserRepository) CheckUserExists(ctx context.Context, email string) (bool, error) {
	exists, err := ur.Queries.CheckUserExists(ctx, email)
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute check user exists query")
		return false, err
	}

	return exists, nil
}

func (ur *UserRepository) CreateUserWithPassword(ctx context.Context, user dto.CreateUserWithPassword) (*models.User, error) {
	var u models.CreateUserParams
	u.ID = uuid.New().String()
	u.FullName = user.FullName
	u.Email = user.Email
	u.Role = "user" // TODO make this better

	cu, err := ur.Queries.CreateUser(ctx, u)
	if err != nil {
		return nil, err
	}

	var i models.CreateUserCredentialsParams
	i.ID = uuid.New().String()
	i.UserID = cu.ID
	i.Provider = utils.PasswordProviderKey
	i.ProviderID = user.Email

	passwordHash := utils.CreatePasswordHash(user.Password)
	i.PasswordHash = sql.NullString{String: passwordHash, Valid: true}

	_, err = ur.Queries.CreateUserCredentials(ctx, i)
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

func (ur *UserRepository) GetUserCredentialByProviderId(ctx context.Context, id string) (*models.UserCredential, error) {
	u, err := ur.Queries.GetUserCredentialByProviderId(ctx, id)
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute query")
		return nil, err
	}

	return &u, nil
}
