// StatusCodeCarrier can be implemented by an error to support setting status codes in the error itself.
type StatusCodeCarrier interface {
	// StatusCode returns the status code of this error.
	StatusCode() int
}

// ErrorContextCarrier can be implemented by an error to support error contexts.
type ErrorContextCarrier interface {
	error
	StatusCodeCarrier

	// RequestID returns the ID of the request that caused the error, if applicable.
	RequestID() string

	// Reason returns the reason for the error, if applicable.
	Reason() string

	// ID returns the error id, if applicable.
	Status() string

	// Details returns details on the error, if applicable.
	Details() map[string][]interface{}
}





















