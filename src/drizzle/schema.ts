import { boolean, integer, numeric, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, serial, primaryKey } from 'drizzle-orm/pg-core';


export enum ClimbTypeEnum  {
    TOP_ROPE = 'Top Rope',
    LEAD = 'Boulder',
    BOULDER = 'Lead',
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
    age: integer('age'),
    height: numeric('height'),
    weight: numeric('weight'),
    apeIndex: numeric('ape_index'),
    gradingPreference: boolean('grading_preference').notNull().default(false), // to enable french grading user must change to true.
    measurementSystem: boolean('measurement_system').notNull().default(false), // to enable metric, user must change to true. 
    profileImage: varchar('profile_image', { length: 512 })

});

export const session = pgTable('session', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().references(() => users.userId),
    sessionName: varchar('session_name', { length: 50 }),
    intensity: integer('intensity').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    completed: boolean('completed').notNull().default(false),
});

export const climb = pgTable('climb', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    sessionId: integer('session_id').notNull().references(() => session.id),
    type: varchar('type', { length: 50 }).notNull(),
    style: varchar('style', { length: 50 }).notNull(),
    grade: varchar('grade', { length: 50 }).notNull(),
    attempts: integer('attempts').notNull().default(1),
    send: boolean('send').notNull().default(false),
    climbImage: varchar('climb_image', { length: 512 }),
})