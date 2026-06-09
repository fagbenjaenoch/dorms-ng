package database

import (
	"database/sql"
	"embed"

	"github.com/XSAM/otelsql"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	_ "github.com/mattn/go-sqlite3"
	"github.com/pressly/goose/v3"
	"github.com/rs/zerolog"
	"go.opentelemetry.io/otel/metric"
	semconv "go.opentelemetry.io/otel/semconv/v1.37.0"
)

//go:embed migrations/*.sql
var embedMigration embed.FS

func new(config *config.Config, logger *zerolog.Logger) (*sql.DB, metric.Registration, error) {
	db, err := otelsql.Open("sqlite3", config.DB.URI, otelsql.WithAttributes(
		semconv.DBSystemNameSQLite,
		semconv.DBNamespace("data.db"),
	),
	)
	if err != nil {
		return nil, nil, err
	}

	reg, err := otelsql.RegisterDBStatsMetrics(db, otelsql.WithAttributes(
		semconv.DBSystemNameSQLite,
		semconv.DBNamespace("data.db"),
	))
	if err != nil {
		return nil, nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, reg, err
	}
	logger.Info().Msg("database setup successfully")

	return db, reg, nil
}

func Initialize(config *config.Config, logger *zerolog.Logger) (*sql.DB, metric.Registration, error) {
	goose.SetBaseFS(embedMigration)

	if err := goose.SetDialect("sqlite"); err != nil {
		panic(err)
	}

	db, reg, err := new(config, logger)
	if err != nil {
		return nil, nil, err
	}

	if err := goose.Up(db, "migrations"); err != nil {
		return nil, nil, err
	}

	logger.Info().Msg("database migrations applied successfully")

	return db, reg, nil
}

func Close(db *sql.DB) error {
	return db.Close()
}
