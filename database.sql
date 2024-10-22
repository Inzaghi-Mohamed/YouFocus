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

CREATE TABLE videos (
    "id" SERIAL PRIMARY KEY,
    "user_id"INT REFERENCES "user"(user_id),
    "video_id" VARCHAR(20) NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
    "search_query "VARCHAR(255) NOT NULL,
   " added_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);


 CREATE courses_videos(
      "id" SERIAL PRIMARY KEY,
      "video_id" INT REFERENCES "video"(id),
      "course_id" INT REFERENCES "courses"(id),
 );

--  QUERIES
 SELECT courses.*
FROM courses
JOIN "user" ON courses.user_id = "user".id
WHERE "user".id = 1;