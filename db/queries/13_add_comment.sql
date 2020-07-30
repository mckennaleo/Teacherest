INSERT INTO comments (user_id, resource_id, comment)
VALUES ($1, $2, $3)
RETURNING *;