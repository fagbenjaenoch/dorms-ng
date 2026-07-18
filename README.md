# Hostel Marketplace App

A full-stack application that serves as a trust layer for Nigerian students looking for hostels in unfamiliar campus environments.

## About The Project

Finding accommodation as a student in a new campus environment can be challenging and risky. This app solves that problem by providing a transparent marketplace where students can:

- Access verified agent/landlord contact information
- View comprehensive amenity lists
- Take virtual tours of rooms (Airbnb-style)
- Make informed rental decisions with confidence

The platform combines modern web technologies to create a seamless experience for both students and hostel providers.

## Key Features

- **Trust Layer**: Verified listings to prevent misleading information
- **Virtual Tours**: Interactive room previews
- **Detailed Listings**: Complete amenity information and contact details
- **Student-Focused**: Specifically designed for Nigerian university students

## Tech Stack

### Frontend
- **Framework**: Next.js
- **Runtime**: Bun
- **Language**: TypeScript

### Backend
- **Language**: Go

### DevOps & Infrastructure
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

### Observability
- Open telemetry (Go SDK)
- [New Relic](https://newrelic.com)
- [Posthog](https://posthog.com)

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (for frontend)
- [Go](https://go.dev) (for backend)
- Docker & Docker Compose (optional, for containerized development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/fagbenjaenoch/hostel-marketplace-app.git
cd hostel-marketplace-app
```

2. Install frontend dependencies with Bun
```bash
cd apps/frontend
bun install
```

3. Setup Environment Variable for frontend
```env
# copy and paste only this line in your terminal
touch .env

# copy an and paste the following in your env file
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_POSTHOG_KEY=<your-posthog-key>
```

3. Install backend dependencies
```bash
cd ../backend
go mod download
```

4. Set up environment variables
```bash
cp .env.example .env
```

5. Run the development servers

**With Docker (recommended)**
```bash
docker-compose up
```

**Without Docker**
- Frontend: `bun run dev`
- Backend: `task dev`

## Project Structure

```
hostel-marketplace-app/
├── apps/
│   ├── frontend/          # Next.js application (Bun runtime)
│   └── backend/           # Go application
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Production setup
├── docker-compose.dev.yml # Development setup
└── README.md
```

## Development

### Frontend (with Bun)
```bash
cd apps/frontend
bun run dev
```

### Backend
```bash
cd apps/backend
go run main.go
```

### Running Tests
```bash
# Frontend tests
cd apps/frontend
bun test

# Backend tests
cd apps/backend
task test
```

### Adding Dependencies
```bash
# Frontend
bun add [package-name]
bun add -d [dev-package-name]

# Backend
go get [package-name]
```

## Deployment

The application is configured for deployment on Vercel (frontend) with a containerized backend. The CI/CD pipeline (GitHub Actions) handles automated builds and tests. Bun's fast startup time makes it an excellent choice for serverless deployment environments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Enoch Fagbenja**
- GitHub: [@fagbenjaenoch](https://github.com/fagbenjaenoch)

## Acknowledgments

- Built with the goal of simplifying student housing in Nigeria
- Inspired by Airbnb's trust and transparency model
- Bun runtime for faster development and production performance
