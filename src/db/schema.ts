import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleHe: text('title_he').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionHe: text('description_he').notNull(),
  price: integer('price').notNull(),
  imageUrl: text('image_url'),
});

export const userContact = sqliteTable('user_contact', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
}); 