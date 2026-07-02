package middleware

import (
	"context"
	"net/http"
	"strconv"
)

type PaginationParams struct {
	SortBy     string
	MinPrice   int
	MaxPrice   int
	IsVerified bool
	Page       int
	Limit      int
	Offset     int
}

const maxLimit = 20
const maxPriceLimit = 5000000
const PaginationKey = "pagination"

func Pagination(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		params := &PaginationParams{
			SortBy:   "price-asc",
			MinPrice: 0,
			MaxPrice: maxPriceLimit,
			Page:     1,
			Limit:    10,
		}

		if sortByStr := r.URL.Query().Get("sort_by"); sortByStr != "" {
			params.SortBy = sortByStr
		}
		if minPriceStr := r.URL.Query().Get("min_price"); minPriceStr != "" {
			if minPrice, err := strconv.Atoi(minPriceStr); err == nil && minPrice >= 0 {
				params.MinPrice = minPrice
			}
		}
		if maxPriceStr := r.URL.Query().Get("max_price"); maxPriceStr != "" {
			if maxPrice, err := strconv.Atoi(maxPriceStr); err == nil && maxPrice > 0 && maxPrice <= maxPriceLimit {
				params.MaxPrice = maxPrice
			}
		}
		if isVerifiedStr := r.URL.Query().Get("is_verified"); isVerifiedStr != "" {
			params.IsVerified = isVerifiedStr == "true"
		}
		if pageStr := r.URL.Query().Get("page"); pageStr != "" {
			if page, err := strconv.Atoi(pageStr); err == nil && page > 0 {
				params.Page = page
			}
		}
		if limitStr := r.URL.Query().Get("limit"); limitStr != "" {
			if limit, err := strconv.Atoi(limitStr); err == nil && limit < maxLimit {
				params.Limit = limit
			}
		}

		params.Offset = (params.Page - 1) * params.Limit

		ctx := context.WithValue(r.Context(), PaginationKey, params)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetPaginationParams(ctx context.Context) *PaginationParams {
	if params, ok := ctx.Value(PaginationKey).(*PaginationParams); ok {
		return params
	}
	return &PaginationParams{
		SortBy:     "price-asc",
		MinPrice:   0,
		MaxPrice:   5000000,
		IsVerified: false,
		Page:       1,
		Limit:      10,
		Offset:     0,
	}
}
