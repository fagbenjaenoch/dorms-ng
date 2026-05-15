package utils

type QueryParam string

func (q QueryParam) String() string {
	return string(q)
}

const (
	SearchParam QueryParam = "q"
	IdParam     QueryParam = "id"
	TypeParam   QueryParam = "type"
)
