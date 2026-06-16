package dto

type SearchResult struct {
	EntityID   string `json:"entity_id"`
	EntityType string `json:"entity_type"`
	Entity     string `json:"entity"`
	Slug       string `json:"slug"`
	Address    string `json:"address"`
}
