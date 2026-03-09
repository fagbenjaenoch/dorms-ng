package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/config"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/logger"
	"github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

const DefaultContextTimeout = 10

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("Error loading config: %v\n", err)
		os.Exit(1)
	}

	logger := logger.New(cfg)

	router := mux.NewRouter()

	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		helloMessage := Response{
			Success: true,
			Status:  200,
			Message: "server is healthy",
		}

		ReturnJSONReponse(w, helloMessage)
	}).Methods(http.MethodGet)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	server, err := server.New(cfg, &logger)

	server.SetupHttpServer(corsMiddleware.Handler(router))

	go func() {
		if err := server.Run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			fmt.Printf("Failed to start server: %v\n", err)
		}
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	<-ctx.Done()

	fmt.Println("Server shutting down...")

	// Doesn't block if no connections, but will otherwise wait until the timeout deadline
	ctx, cancel := context.WithTimeout(context.Background(), DefaultContextTimeout*time.Second)
	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("Server forced to shutdown: %v\n", err)
	}
	stop()
	cancel()

	fmt.Println("Server exited properly")
}

type Response struct {
	Success bool   `json:"success"`
	Status  int    `json:"status"`
	Message string `json:"message"`
	Payload any    `json:"payload"`
}

func ReturnJSONReponse(w http.ResponseWriter, response Response) {
	responseJSON, err := json.Marshal(response)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Status)
	w.Write(responseJSON)
}
