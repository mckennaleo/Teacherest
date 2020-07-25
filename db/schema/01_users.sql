CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  password TEXT,
  bio TEXT,
  avatar_url TEXT
);
