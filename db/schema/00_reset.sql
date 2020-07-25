DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS comment_reviews CASCADE;

\i db/schema/01_users.sql;
\i db/schema/02_categories.sql;
\i db/schema/03_resources.sql;
\i db/schema/04_comments.sql;
\i db/schema/05_ratings.sql;
\i db/schema/06_likes.sql;
\i db/schema/07_comment_reviews.sql;
