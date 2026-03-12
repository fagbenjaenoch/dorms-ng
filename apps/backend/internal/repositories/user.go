package repositories

import (
	"context"
	"database/sql"

	"github.com/rs/zerolog"
)

type UserRepository struct {
	BaseRepository
}

func NewUserRepository(db *sql.DB, logger *zerolog.Logger) UserRepository {
	return UserRepository{
		BaseRepository: BaseRepository{
			DB:     db,
			Logger: logger,
		},
	}
}

func (ur *UserRepository) GetAllUsers(ctx context.Context) {
	db := ur.DB

	r, err := db.ExecContext(ctx, "select * from users u left join users_profile up on u.id = up.user_id")
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute query")
	}

	ur.Logger.Debug().Msgf("query result: %v", r)
}
