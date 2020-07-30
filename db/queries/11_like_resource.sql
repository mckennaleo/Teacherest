INSERT INTO likes (user_id, resource_id, like)
VALUES ($1, $2, $3)
RETURNING *;


DELETE FROM likes WHERE user_id = $1 AND resource_id = $2



SELECT * FROM likes
IF ((user_id = 6) 
  AND (resource_id = 4))
  THEN
  DELETE FROM likes WHERE user_id = 6 AND resource_id = 4
ELSE
  INSERT INTO likes (user_id, resource_id)
  VALUES (5, 4)
  RETURNING *
  END IF;