package server

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/rs/zerolog"
)

type Server struct {
	Config     *config.Config
	httpServer *http.Server
	Logger     *zerolog.Logger
}

func New(config *config.Config, logger *zerolog.Logger) (*Server, error) {
	return &Server{
		Config: config,
		Logger: logger,
	}, nil
}

func (s *Server) SetupHttpServer(handler http.Handler) {
	s.httpServer = &http.Server{
		Addr:         ":" + s.Config.Server.Port,
		Handler:      handler,
		ReadTimeout:  time.Duration(s.Config.Server.ReadTimeout),
		WriteTimeout: time.Duration(s.Config.Server.WriteTimeout),
		IdleTimeout:  time.Duration(s.Config.Server.IdleTimeout),
	}
}

func (s *Server) Run() error {
	if s.httpServer == nil {
		return errors.New("HTTP server has not been initialized, run server.SetupHttpServer(handler) to initialize")
	}

	s.Logger.Info().
		Str("port", s.Config.Server.Port).
		Str("env", s.Config.Primary.Env).
		Msg("starting server")

	return s.httpServer.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
