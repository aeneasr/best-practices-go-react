package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestFoo(t *testing.T) {
    var handler http.HandlerFunc = func(
        w http.ResponseWriter,
        r *http.Request,
    ) {
        assert.Equal(t, "something", r.URL.Path)
        w.Write([]byte("hello"))
    }

	ts := httptest.NewServer(handler)
	defer ts.Close()

	res, err := http.Get(ts.URL)
	require.NoError(t, err)
	assert.Equal(t, http.StatusOK, res.StatusCode)
}





















