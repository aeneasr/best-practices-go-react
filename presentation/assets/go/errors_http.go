type StatusCodeCarrier interface {
	// StatusCode returns the status code of this error.
	StatusCode() int
}

type ErrorContextCarrier interface {
	// RequestID returns the ID of the request that caused the error, if applicable.
	RequestID() string

	// Reason returns the reason for the error, if applicable.
	Reason() string

	// Details returns details on the error, if applicable.
	Details() map[string][]interface{}
}





















