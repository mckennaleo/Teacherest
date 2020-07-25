INSERT INTO resources (created_by, link, description, category_id, title, screenshot)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;