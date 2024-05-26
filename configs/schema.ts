import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  formId: text("formId").notNull(),
  jsonForm: text("jsonForm").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
