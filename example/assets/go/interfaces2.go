package main

import "github.com/go-print/hp309cg"
import "github.com/example/example/print"

func main() {
    p := hp309cg.New()

    // ...

    if err := print.DoJob(printer, job); err != nil {
        log.Fatalf("%s", err)
    }
}
