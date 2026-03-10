package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/logger"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/routes"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
)

const DefaultContextTimeout = 10

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("Error loading config: %v\n", err)
		os.Exit(1)
	}

	logger := logger.New(cfg)

	srv, err := server.New(cfg, &logger)

	srv.SetupHttpServer(routes.New())

	go func() {
		if err := srv.Run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Err(err).Msg("Failed to start server")
		}
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	<-ctx.Done()

	logger.Info().Msg("Server shutting down...")

	// Doesn't block if no connections, but will otherwise wait until the timeout deadline
	ctx, cancel := context.WithTimeout(context.Background(), DefaultContextTimeout*time.Second)
	if err := srv.Shutdown(ctx); err != nil {
		logger.Err(err).Msg("Failed to shutdown server")
	}
	stop()
	cancel()

	logger.Info().Msg("Server exited properly")
}
