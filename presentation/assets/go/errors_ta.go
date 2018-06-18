type statusCodeCarrier interface {
    StatusCode() int
}

func handleError(err error) {
	if e, ok := err.(statusCodeCarrier); ok {
	    log.Printf(
	        "Got %s error with status code %d",
	        err,
	        e.StatusCode()
        )
	} else {
	    log.Printf("Got error %s", err)
	}
}













