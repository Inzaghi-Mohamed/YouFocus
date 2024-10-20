-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE courses (
    "id" SERIAL PRIMARY KEY,
   "user_id"INT REFERENCES "user"(user_id),
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "progress" INTEGER,
   " created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   " update_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   " notes" TEXT
);