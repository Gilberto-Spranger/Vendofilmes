import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  thumbnailUrl: text('thumbnail_url').notNull(),
  bannerUrl: text('banner_url').notNull(),
  duration: text('duration').notNull(),
  year: integer('year').notNull(),
  rating: text('rating').notNull(),
  match: integer('match').notNull(),
  categories: text('categories').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  addedBy: integer('added_by').references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  movies: many(movies),
}));

export const moviesRelations = relations(movies, ({ one }) => ({
  author: one(users, {
    fields: [movies.addedBy],
    references: [users.id],
  }),
}));
