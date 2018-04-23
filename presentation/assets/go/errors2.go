import "github.com/pkg/errors"

func foo() error {
    return errors.New("foo")
}

func withStack() {
    if err := foo(); err != nil {
        log.Fatalf("An error occurred %s", errors.WithStack(err))
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





















