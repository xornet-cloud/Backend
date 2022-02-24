package v1

import (
	"github.com/gofiber/fiber/v2"
	"github.com/xornet-cloud/Backend/database"
)

type V1 struct {
	db database.Database
}

func New(db database.Database, app *fiber.App) V1 {
	var v1 = V1{
		db,
	}

	app.Get("/users", v1.GetUsersAll)
	app.Get("/users/uuid/:uuid", v1.GetUserByUuid)
	app.Get("/users/email/:email", v1.GetUserByEmail)
	app.Get("/users/username/:username", v1.GetUserByUsername)

	return v1
}