export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'sqlite',
  dialect: 'sqlite',
  dbCredentials: {
    sqlite: './prisma/dev.db',
  },
}; 