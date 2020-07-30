CREATE TABLE likes
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  liked BOOLEAN,
  created_at TIMESTAMP DEFAULT now()
);
