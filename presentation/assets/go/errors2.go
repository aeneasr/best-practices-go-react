import "github.com/pkg/errors"

func foo() error {
    return errors.New("foo")
}

func withStack() error {
    if err := foo(); err != nil {
        return errors.WithStack(err)
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





















