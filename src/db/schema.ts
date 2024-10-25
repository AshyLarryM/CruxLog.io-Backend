import { integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, serial, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    height: integer('height').notNull(),
    weight: integer('weight').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
