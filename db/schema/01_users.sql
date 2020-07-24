-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  password TEXT,
  bio TEXT,
  avatar_url TEXT 
);
