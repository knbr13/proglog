package main

import (
	"log"

	logpkg "github.com/knbr13/proglog/internal/log"
	"github.com/knbr13/proglog/internal/server"
)

func main() {
	logInstance, err := logpkg.NewLog("./data", logpkg.Config{})
	if err != nil {
		log.Fatal(err)
	}

	srv := server.NewHTTPServer(":8080", logInstance)
	log.Fatal(srv.ListenAndServe())
}
