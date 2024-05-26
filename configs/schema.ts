import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  formId: text("formId").notNull(),
  jsonForm: text("jsonForm").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").notNull().default("anonymous"),
  createdAt: varchar("createdAt").notNull(),
  formRef: integer("formRef").references(() => forms.id),
});
