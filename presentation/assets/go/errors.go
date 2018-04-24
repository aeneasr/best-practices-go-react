func chainErrors() {
    if err := foo(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    if err := bar(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }
}

func multiAssignmentBad(foo bool) (someType, error) {
    if foo {
        value, err := foo()
        if err != nil {
            log.Fatalf("An error occurred %s", err)
        }

        return value, err
    }

    value, err := bar()
    if err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    return value, err
}

func multiAssignmentGood(foo bool) (value someType, err error) {
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

func issuesWithScoping() {
    err := foo()
    if err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    if !bar() {
        log.Fatalf("An error occurred %s", err)
        log.Fatalf("An error occurred %s", err.Error())
    }
}




















