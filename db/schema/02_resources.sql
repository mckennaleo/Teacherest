DROP TABLE IF EXISTS resources;
CREATE TABLE resources
(
  id SERIAL PRIMARY KEY NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
  link TEXT,
  description TEXT,
  category_id TINYINT,
  title TEXT,
  screenshot TEXT,
  created_at TIMESTAMP DEFAULT now()
);
