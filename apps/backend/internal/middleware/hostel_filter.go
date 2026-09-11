package middleware

import (
	"context"
	"net/http"
	"strconv"
)

type HostelFilterParams struct {
	SortBy     string
	MinPrice   int
	MaxPrice   int
	IsVerified bool
}

type HostelFilterKeyType string

const HostelFilterKey HostelFilterKeyType = "hostelFilters"

const (
	minPrice = 0
	maxPrice = 5_000_000
)

func HostelFilter(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		params := &HostelFilterParams{
			SortBy:     "price-asc",
			MinPrice:   minPrice,
			MaxPrice:   maxPrice,
			IsVerified: true,
		}

		if sortByStr := r.URL.Query().Get("sortBy"); sortByStr != "" {
			params.SortBy = sortByStr
		}

		if minPriceStr := r.URL.Query().Get("minPrice"); minPriceStr != "" {
			if min, err := strconv.Atoi(minPriceStr); err == nil && min >= minPrice {
				params.MinPrice = minPrice
			}
		}
		if maxPriceStr := r.URL.Query().Get("maxPrice"); maxPriceStr != "" {
			if max, err := strconv.Atoi(maxPriceStr); err == nil && max > 0 && max <= maxPrice {
				params.MaxPrice = maxPrice
			}
		}
		if isVerifiedStr := r.URL.Query().Get("isVerified"); isVerifiedStr != "" {
			params.IsVerified = isVerifiedStr == "true"
		}

		ctx := context.WithValue(r.Context(), HostelFilterKey, params)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetHostelFilterParams(ctx context.Context) *HostelFilterParams {
	if params, ok := ctx.Value(HostelFilterKey).(*HostelFilterParams); ok {
		return params
	}
	return &HostelFilterParams{
		SortBy:     "price-asc",
		MinPrice:   0,
		MaxPrice:   5000000,
		IsVerified: true,
	}
}
