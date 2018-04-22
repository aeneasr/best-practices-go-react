func scopedError() {
    if err := foo(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }
}

func multiAssignment() {
    var err error
    var value someType

    if value, err = foo(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    if value, err = bar(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }

    // ...
}
