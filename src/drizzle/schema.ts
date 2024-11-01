import { integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, serial, primaryKey } from 'drizzle-orm/pg-core';


export enum ClimbTypeEnum  {
    TOP_ROPE = 'top rope',
    LEAD = 'lead',
    BOULDER = 'boulder',
}

export enum ClimbStyleEnum {
    SLAB = 'slab',
    VERTICAL= 'verical',
    OVERHANG = 'overhang',
    CAVE = 'cave',
}

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: varchar('full_name', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    // TODO: Preferred Grading system implementation.
});

export const session = pgTable('session', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().references(() => users.userId),
    intensity: integer('intensity').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const climb = pgTable('climb', {
    id: serial('id').primaryKey(),
    sessionId: integer('session_id').notNull().references(() => session.id),
    type: varchar('type', { length: 50 }).notNull(),
    style: varchar('style', { length: 50 }).notNull(),
    grade: varchar('grade', { length: 50 }).notNull(),
    attempts: integer('attempts').notNull().default(1),
})