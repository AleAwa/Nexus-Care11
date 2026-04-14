import { pgTable, serial, timestamp, varchar, text, boolean, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 健康检查表（系统预置）
export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 预约挂号表
export const appointments = pgTable(
  "appointments",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    patient_name: varchar("patient_name", { length: 128 }).notNull(),
    patient_phone: varchar("patient_phone", { length: 32 }).notNull(),
    department: varchar("department", { length: 64 }).notNull(),
    doctor_id: varchar("doctor_id", { length: 36 }).notNull(),
    appointment_date: timestamp("appointment_date", { withTimezone: true }).notNull(),
    time_slot: varchar("time_slot", { length: 16 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    notes: text("notes"),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("appointments_patient_phone_idx").on(table.patient_phone),
    index("appointments_department_idx").on(table.department),
    index("appointments_status_idx").on(table.status),
    index("appointments_date_idx").on(table.appointment_date),
  ]
);

// 陪护照料申请表
export const companionRequests = pgTable(
  "companion_requests",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    patient_name: varchar("patient_name", { length: 128 }).notNull(),
    patient_phone: varchar("patient_phone", { length: 32 }).notNull(),
    service_type: varchar("service_type", { length: 64 }).notNull(),
    schedule_date: timestamp("schedule_date", { withTimezone: true }).notNull(),
    schedule_time: varchar("schedule_time", { length: 16 }).notNull(),
    location: varchar("location", { length: 256 }).notNull(),
    description: text("description"),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    companion_id: varchar("companion_id", { length: 36 }),
    companion_name: varchar("companion_name", { length: 128 }),
    companion_phone: varchar("companion_phone", { length: 32 }),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("companion_requests_patient_phone_idx").on(table.patient_phone),
    index("companion_requests_status_idx").on(table.status),
    index("companion_requests_schedule_date_idx").on(table.schedule_date),
  ]
);

// AI导诊对话记录表
export const consultations = pgTable(
  "consultations",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    session_id: varchar("session_id", { length: 64 }).notNull(),
    patient_name: varchar("patient_name", { length: 128 }),
    messages: text("messages"),
    recommended_department: varchar("recommended_department", { length: 64 }),
    status: varchar("status", { length: 20 }).notNull().default("active"),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("consultations_session_id_idx").on(table.session_id),
    index("consultations_created_at_idx").on(table.created_at),
  ]
);

// 健康档案表
export const healthRecords = pgTable(
  "health_records",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    patient_name: varchar("patient_name", { length: 128 }).notNull(),
    patient_phone: varchar("patient_phone", { length: 32 }).notNull(),
    record_type: varchar("record_type", { length: 32 }).notNull(),
    record_date: timestamp("record_date", { withTimezone: true }).notNull(),
    doctor_name: varchar("doctor_name", { length: 128 }),
    department: varchar("department", { length: 64 }),
    diagnosis: text("diagnosis"),
    diagnosis_zh: text("diagnosis_zh"),
    notes: text("notes"),
    notes_zh: text("notes_zh"),
    attachment_url: varchar("attachment_url", { length: 512 }),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("health_records_patient_phone_idx").on(table.patient_phone),
    index("health_records_type_idx").on(table.record_type),
    index("health_records_date_idx").on(table.record_date),
  ]
);

// 过敏信息表
export const allergies = pgTable(
  "allergies",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    patient_name: varchar("patient_name", { length: 128 }).notNull(),
    patient_phone: varchar("patient_phone", { length: 32 }).notNull(),
    allergen: varchar("allergen", { length: 128 }).notNull(),
    severity: varchar("severity", { length: 32 }).notNull(),
    reaction: text("reaction"),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("allergies_patient_phone_idx").on(table.patient_phone),
  ]
);

// 医生信息表
export const doctors = pgTable(
  "doctors",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 128 }).notNull(),
    name_zh: varchar("name_zh", { length: 128 }),
    specialty: varchar("specialty", { length: 128 }).notNull(),
    specialty_zh: varchar("specialty_zh", { length: 128 }),
    department: varchar("department", { length: 64 }).notNull(),
    available: boolean("available").default(true),
    language: varchar("language", { length: 10 }).default("zh"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("doctors_department_idx").on(table.department),
    index("doctors_available_idx").on(table.available),
  ]
);
