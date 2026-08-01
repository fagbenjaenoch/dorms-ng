package utils

import (
	"fmt"
	"strings"

	"github.com/fagbenjaenoch/dorms-ng/internal/dto"
)

func GetNeighborhoodAddress(neighborhood dto.CreateNeighborhood) string {
	city := neighborhood.City
	if strings.ToLower(neighborhood.Name) == "main campus" {
		city = neighborhood.Institution
	}

	state := neighborhood.State

	return fmt.Sprintf("%s, %s State", city, state)
}

func NormalizeNeighborhoodName(neighborhood dto.CreateNeighborhood) string {
	address := GetNeighborhoodAddress(neighborhood)
	combinedName := fmt.Sprintf("%s, %s", neighborhood.Name, address)

	return combinedName
}
