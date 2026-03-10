package handlers

import "github.com/fagbenjaenoch/hostel-marketplace-app/internal/server"

type Handler struct {
	server *server.Server
}

func NewHandler(server *server.Server) Handler {
	return Handler{
		server: server,
	}
}
