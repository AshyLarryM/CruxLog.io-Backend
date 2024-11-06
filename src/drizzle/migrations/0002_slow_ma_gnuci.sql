ALTER TABLE "users" ALTER COLUMN "grading_preference" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "grading_preference" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "measurement_system" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "measurement_system" SET DEFAULT false;