package main

import (
    "fmt"
    "github.com/pkg/errors"
)

func main() {
    fmt.Printf("%s \n", errors.New("Something went wrong"))
    fmt.Printf("%+v \n", errors.New("Something went wrong"))
}





















