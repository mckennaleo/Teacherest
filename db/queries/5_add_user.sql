INSERT INTO users (email, name, password)
VALUES ($1, $2, $3)
RETURNING *;