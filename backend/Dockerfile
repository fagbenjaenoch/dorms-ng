# STAGE 1: Build the binary
FROM golang:1.26-alpine AS base

# Install git and certificates (needed for downloading modules and HTTPS)
RUN apk add --no-cache git ca-certificates

# Set the working directory
WORKDIR /app

# Copy and download dependencies (cached if go.mod/sum don't change)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# STAGE 2: Development (For live reloading)
FROM base AS dev
# Install Air for hot reloading
RUN go install github.com/air-verse/air@latest
COPY . .
# Air will watch the files and re-run 'go build' on change
CMD ["air", "-c", ".air.toml"]

# Build the binary
# -s -w: Strips debug information and symbol tables (reduces binary size)
# CGO_ENABLED=0: Static linking (required for 'scratch' or 'distroless')
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o main .

# STAGE 3: Final minimal image
# 'scratch' is the most minimal (literally empty)
FROM scratch

# Import certificates from the builder stage (for HTTPS requests)
COPY --from=base /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the binary from the builder
COPY --from=base /app/main /main

# Set environment variables (optional)
ENV PORT=8080

# Run the binary
ENTRYPOINT ["/main"]
