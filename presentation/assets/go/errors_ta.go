func handleError(err error) {
	if e, ok := err.(StatusCodeCarrier); ok {
	    log.Printf("Got %s error with Status Code %d", err, e.StatusCode())
	} else {
	    log.Printf("Got error %s", err)
	}
}













