package main

import (
  "fmt"
  "github.com/pkg/errors"
)

func main() {
  fmt.Printf("%+v", errors.New("Something went wrong"))
}





















