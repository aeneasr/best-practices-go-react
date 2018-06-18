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

func foo() error {
    return errors.WithStack(
        ErrUnauthorized.
        WithDebug("database offline"))
}

type MyError {
    Error       string
    StatusCode  int
    Debug       string
}

var ErrUnauthorized = &MyError{
    Error: "Unauthorized",
    StatusCode: 401,
    Debug: "",
}

func (e *MyError) Error() string {
    return e.Error
}

type (e *MyError) StatusCode() int {
    return e.StatusCode
}

type (e *MyError) WithDebug(debug string) *MyError {
	err := *e
	err.Debug = debug
	return &err
}














