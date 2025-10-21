import {
  varchar,
  integer,
  pgTable,
  uuid,
  timestamp,
  pgEnum,
  text
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// Enum para o Status (agora é um pgEnum, mais robusto)
export const taskStatusEnum = pgEnum('task_status', ['PENDING', 'COMPLETED']);

// ENTIDADE: Column (ou Categoria)
export const columns = pgTable('columns', {
  id: uuid('id').primaryKey().defaultRandom(), // UUID é melhor para Postgres
  title: varchar('title', { length: 256 }).notNull(),
  order: integer('order').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ENTIDADE: Task (ou Card)
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'), // 'text' (sem limite) ainda existe no Postgres
  order: integer('order').notNull(),

  status: taskStatusEnum('status').default('PENDING').notNull(),

  columnId: uuid('column_id') // Garante que é do tipo UUID
    .notNull()
    .references(() => columns.id), // Chave estrangeira

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// --- RELAÇÕES ---
export const columnsRelations = relations(columns, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
}));

// --- TIPOS (Para exportar pro Frontend/Backend) ---
export type Column = typeof columns.$inferSelect;
export type NewColumn = typeof columns.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;