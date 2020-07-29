INSERT INTO likes (user_id, resource_id, like)
VALUES ($1, $2, $3);


DELETE FROM likes WHERE user_id = $1 AND resource_id = $2
