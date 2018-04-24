package mocking

func MockingMakesSenseSometimes() string {
    err := callSomehing()
    switch err.(type) {
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


var foo = letsRewriteThis(callSomething)

func letsRewriteThis(err error) string {
    switch err.(type) {
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





















