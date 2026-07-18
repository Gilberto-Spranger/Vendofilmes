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
  videoUrl: text('video_url'),
  duration: text('duration').notNull(),
  year: integer('year').notNull(),
  rating: text('rating').notNull(),
  match: integer('match').notNull(),
  categories: text('categories').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  addedBy: integer('added_by').references(() => users.id),
});

export const userMoviesList = pgTable('user_movies_list', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  movieId: integer('movie_id').notNull().references(() => movies.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userMoviesHistory = pgTable('user_movies_history', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  movieId: integer('movie_id').notNull().references(() => movies.id),
  watchedAt: timestamp('watched_at').defaultNow(),
  progress: integer('progress').default(0), // percentage or seconds
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
