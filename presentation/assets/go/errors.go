func chainErrors() {
    if err := foo(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    if err := bar(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }
}

func multiAssignment(foo bool) (err error, value someType) {
    if foo {
        if value, err = foo(); err != nil {
            log.Fatalf("An error occurred %s", err)
        }
    } else {
        if value, err = bar(); err != nil {
            log.Fatalf("An error occurred %s", err)
        }
    }

    return
}





















