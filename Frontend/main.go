package main

import (
	"fmt" // Print to console
	"io" // Help write in the answer
	"log" // Log in if something goes wrong
	"net/http" // HTTP packet
	"html/template" // Template packet
)

func main() {
    http.HandleFunc("/", index)

	port := ":8080"
	fmt.Println("Listening on", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func index(w http.ResponseWriter, r *http.Request) {
    template, err := template.ParseFiles("templates/index.html")

    if err != nil {
        fmt.Fprintf(w, "Page not found")
        io.WriteString(w, "404")
    } else {
        template.Execute(w, nil)
    }
}
