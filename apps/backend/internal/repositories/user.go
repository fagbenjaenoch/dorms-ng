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

type User struct {
	ID          int    `json:"id"`
	FullName    string `json:"full_name"`
	Institution string `json:"institution"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

func (ur *UserRepository) GetAllUsers(ctx context.Context) []User {
	db := ur.DB

	r, err := db.QueryContext(ctx, "select * from users ")
	if err != nil {
		ur.Logger.Err(err).Msg("could not execute query")
	}
	defer r.Close()

	var users []User
	for r.Next() {
		var user User
		if err := r.Scan(&user.ID,
			&user.FullName, &user.Institution,
			&user.CreatedAt, &user.UpdatedAt); err != nil {
			ur.Logger.Err(err).Msg("could not scan row")
		}
		users = append(users, user)
	}

	return users
}
