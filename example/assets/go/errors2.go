import "github.com/pkg/errors"

func withStack() {
    if err := foo(); err != nil {
        log.Fatalf("An error occurred %s", err)
    }
}

func multiAssignmentWithStack(check bool) (err error, value someVal) {
    if bool {
        value, err = foo()
    } else {
        value, err = bar()
    }

    if err != nil {
        return nil, errors.WithStack(err)
    }

    return value, err
    // ...
}
