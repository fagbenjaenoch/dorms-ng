package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/database"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/logger"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/routes"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
)

const DefaultContextTimeout = 10

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		logger.Err(err).Msg("failed to load config")
		os.Exit(1)
	}

	logger := logger.New(cfg)

	db, err := database.New(&logger)
	if err != nil {
		logger.Err(err).Msg("failed to connect to database")
		os.Exit(1)
	}

	srv, err := server.New(cfg, db, &logger)

	srv.SetupHttpServer(routes.New())

	go func() {
		if err := srv.Run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Err(err).Msg("failed to start server")
		}
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	<-ctx.Done()

	logger.Info().Msg("server shutting down...")

	// Doesn't block if no connections, but will otherwise wait until the timeout deadline
	ctx, cancel := context.WithTimeout(context.Background(), DefaultContextTimeout*time.Second)
	if err := srv.Shutdown(ctx); err != nil {
		logger.Err(err).Msg("failed to shutdown server")
	}
	stop()
	cancel()

	logger.Info().Msg("server exited properly")
}
