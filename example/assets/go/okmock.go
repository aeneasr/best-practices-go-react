import "github.com/pkg/errors"

func MockingMakesSenseSometimes() string {
    err := callSomehing()
    switch errors.Cause(err).(type) {
        case ErrorSomething:
            return "Something error"
        case ErrorFoo:
            return "Foo error :("
        case ErrorBar:
            return "Bar error :("
        default:
            return ""
    }
}
