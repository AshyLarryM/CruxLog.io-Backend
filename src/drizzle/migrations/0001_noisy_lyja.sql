ALTER TABLE "users" ADD COLUMN "age" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "height" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "weight" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "ape_index" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "grading_preference" varchar(50) DEFAULT 'yds/vscale' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "measurement_system" varchar(50) DEFAULT 'imperial' NOT NULL;