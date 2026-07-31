package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/fagbenjaenoch/dorms-ng/internal/config"
	"github.com/fagbenjaenoch/dorms-ng/internal/database"
	"github.com/fagbenjaenoch/dorms-ng/internal/logger"
	"github.com/fagbenjaenoch/dorms-ng/internal/observability"
	"github.com/fagbenjaenoch/dorms-ng/internal/routes"
	"github.com/fagbenjaenoch/dorms-ng/internal/server"
)

const DefaultContextTimeout = 10

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		panic("failed to load config " + err.Error())
	}

	logger := logger.New(cfg)

	db, reg, err := database.Initialize(cfg, &logger)
	if err != nil {
		logger.Err(err).Msg("failed to connect to database")
		os.Exit(1)
	}
	defer reg.Unregister() // unregister observability at the db level

	srv, err := server.New(cfg, db, &logger)

	obs := observability.NewObservability(srv)

	// setup log, metrics and trace telemetry
	shutdownFns, err := obs.SetupObservability()
	if err != nil {
		logger.Err(err).Msg("failed to initialize observability")
		os.Exit(1)
	}
	defer func() {
		shutdownCtx := context.Background()

		var shutdownErr error
		for _, fn := range shutdownFns {
			if err := fn(shutdownCtx); err != nil {
				shutdownErr = errors.Join(shutdownErr, err)
			}
		}

		if shutdownErr != nil {
			logger.Err(shutdownErr).Msg("failed to shutdown observability")
		}
	}()

	srv.SetupHttpServer(routes.New(srv))

	go func() {
		if err := srv.Run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Err(err).Msg("failed to start server")
		}
	}()

	// shutdown sequence
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
