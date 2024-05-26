import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG;

if (!databaseUrl) {
  throw new Error("Database URL is not defined in the environment variables");
}

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
