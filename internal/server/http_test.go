package server

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	logpkg "github.com/knbr13/proglog/internal/log"
)

func TestHTTPServer(t *testing.T) {
	tempDir := t.TempDir()
	defer os.RemoveAll(tempDir)

	logInstance, err := logpkg.NewLog(tempDir, logpkg.Config{})
	if err != nil {
		t.Fatal(err)
	}

	srv := NewHTTPServer(":8080", logInstance)

	t.Run("produce", func(t *testing.T) {
		reqBody := ProduceRequest{
			Record: logpkg.Record{
				Value: []byte("test value"),
			},
		}
		reqBytes, _ := json.Marshal(reqBody)
		req := httptest.NewRequest("POST", "/", bytes.NewReader(reqBytes))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		srv.Handler.ServeHTTP(w, req)

		if w.Code != http.StatusOK {
			t.Errorf("expected status 200, got %d", w.Code)
		}

		var resp ProduceResponse
		if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
			t.Fatal(err)
		}

		if resp.Offset != 0 {
			t.Errorf("expected offset 0, got %d", resp.Offset)
		}
	})

	t.Run("consume", func(t *testing.T) {
		reqBody := ConsumeRequest{
			Offset: 0,
		}
		reqBytes, _ := json.Marshal(reqBody)
		req := httptest.NewRequest("GET", "/", bytes.NewReader(reqBytes))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		srv.Handler.ServeHTTP(w, req)

		if w.Code != http.StatusOK {
			t.Errorf("expected status 200, got %d", w.Code)
		}

		var resp ConsumeResponse
		if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
			t.Fatal(err)
		}

		if string(resp.Record.Value) != "test value" {
			t.Errorf("expected value 'test value', got '%s'", string(resp.Record.Value))
		}

		if resp.Record.Offset != 0 {
			t.Errorf("expected offset 0, got %d", resp.Record.Offset)
		}
	})
}
