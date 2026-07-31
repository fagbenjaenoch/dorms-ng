package utils

import (
	"fmt"
	"strings"

	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
)

func GetNeighborhoodAddress(neighborhood dto.CreateNeighborhood) string {
	address := neighborhood.City
	if strings.ToLower(neighborhood.Name) == "main campus" {
		address = neighborhood.Institution
	}

	return address
}

func NormalizeNeighborhoodName(neighborhood dto.CreateNeighborhood) string {
	address := GetNeighborhoodAddress(neighborhood)
	combinedName := fmt.Sprintf("%s, %s", neighborhood.Name, address)

	return combinedName
}
