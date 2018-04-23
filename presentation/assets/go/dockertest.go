import "github.com/ory/dockertest"

func TestDatabase(t *testing.T) {
    var db *sql.DB
    database := "test_db"

    pool, err := dockertest.NewPool("")
    require.NoError(t, err)

    resource, err := pool.Run(
        "postgres",
        "9.6",
        []string{
            "POSTGRES_PASSWORD=secret",
            "POSTGRES_DB=" + database,
        },
    )
    require.NoError(t, err)

    db, err := sql.Open(
        "postgres",
        fmt.Sprintf(
            "postgres://postgres:secret@localhost:%s/%s?sslmode=disable",
            resource.GetPort("5432/tcp"),
            database,
        ),
    )
    require.NoError(t, err)
}




















