set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."breweries" (
	"breweryId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"rating" int NOT NULL,
	"website" TEXT NOT NULL,
	"userId" int NOT NULL,
	CONSTRAINT "breweries_pk" PRIMARY KEY ("breweryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"comentId" serial NOT NULL,
	"entryId" int NOT NULL,
	"userId" int NOT NULL,
	"comment" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("comentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "breweries" ADD CONSTRAINT "breweries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("entryId") REFERENCES "breweries"("breweryId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
