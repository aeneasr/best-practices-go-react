import "github.com/pkg/errors"

func foo() error {
    return errors.New("foo")
}

func withStack() error {
    if err := foo(); err != nil {
        return errors.WithStack(err)
    }
}

func wrapError() (err error) {
    if err := foo(); err != nil {
        return errors.Wrap(err, "Could not execute foo")
    }

    return nil
}




















