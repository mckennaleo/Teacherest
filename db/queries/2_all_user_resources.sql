SELECT resources.*
FROM resources
JOIN users ON users.id = resources.created_by
WHERE users.email = 'slim@jim.com';