package testutils

import (
	"context"
	"database/sql"
	"testing"

	"github.com/fagbenjaenoch/dorms-ng/internal/config"
	"github.com/fagbenjaenoch/dorms-ng/internal/database"
	"github.com/fagbenjaenoch/dorms-ng/internal/logger"
	"github.com/fagbenjaenoch/dorms-ng/internal/server"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
)

type TestContainerSetup struct {
	DB      *sql.DB
	Server  *server.Server
	Cleanup func()
}

func SetupTestContainer(t *testing.T) *TestContainerSetup {
	ctx := context.Background()

	// 1. Start PostgreSQL container
	pgContainer, err := postgres.Run(ctx,
		"postgres:16-alpine",
		postgres.WithDatabase("dorms_test"),
		postgres.WithUsername("testuser"),
		postgres.WithPassword("testpass"),
	)
	if err != nil {
		t.Fatal(err)
	}

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}

	// 2. Build configuration
	cfg := &config.Config{
		Primary: config.Primary{Env: "test"},
		Server: config.Server{
			Port:         "0", // random port
			ReadTimeout:  5,
			WriteTimeout: 5,
			IdleTimeout:  5,
		},
		DB: config.DB{URI: connStr},
		// other required config ...
	}

	// 3. Initialize database + run migrations
	log := logger.New(cfg)
	db, reg, err := database.Initialize(cfg, &log)
	if err != nil {
		t.Fatal(err)
	}
	_ = reg

	// 4. Create Server
	srv, err := server.New(cfg, db, &log)
	if err != nil {
		t.Fatal(err)
	}

	cleanup := func() {
		db.Close()
		pgContainer.Terminate(ctx)
	}

	return &TestContainerSetup{
		DB:      db,
		Server:  srv,
		Cleanup: cleanup,
	}
}
