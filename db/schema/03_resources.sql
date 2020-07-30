CREATE TABLE resources
(
  id SERIAL PRIMARY KEY NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
  link TEXT,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT,
  screenshot TEXT,
  created_at TIMESTAMP DEFAULT now(),
);
