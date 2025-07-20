import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("member"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  fatherName: text("father_name").notNull(),
  familyBranch: text("family_branch").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  occupation: text("occupation").notNull(),
  businessCategory: text("business_category"),
  companyName: text("company_name"),
  status: text("status").notNull().default("pending"),
  isAbroad: boolean("is_abroad").default(false),
  abroadCountry: text("abroad_country"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const committeeMembers = pgTable("committee_members", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  position: text("position").notNull(),
  department: text("department").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isActive: boolean("is_active").default(true),
  responsibilities: text("responsibilities"),
});

export const donors = pgTable("donors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  amount: integer("amount").notNull(),
  purpose: text("purpose").notNull(),
  donationDate: text("donation_date").notNull(),
  paymentMethod: text("payment_method").notNull(),
  memberId: integer("member_id").references(() => members.id),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  targetDate: text("target_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  standard: text("standard").notNull(),
  percentage: text("percentage").notNull(),
  stream: text("stream"),
  year: text("year").notNull(),
  achievement: text("achievement"),
  isAwardEligible: boolean("is_award_eligible").default(false),
  awardType: text("award_type"),
  memberId: integer("member_id").references(() => members.id),
});

export const galleryEvents = pgTable("gallery_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: text("year").notNull(),
  month: text("month").notNull(),
  photoCount: integer("photo_count").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertCommitteeMemberSchema = createInsertSchema(committeeMembers).omit({
  id: true,
});

export const insertDonorSchema = createInsertSchema(donors).omit({
  id: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

export const insertGalleryEventSchema = createInsertSchema(galleryEvents).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type CommitteeMember = typeof committeeMembers.$inferSelect;
export type InsertCommitteeMember = z.infer<typeof insertCommitteeMemberSchema>;
export type Donor = typeof donors.$inferSelect;
export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type GalleryEvent = typeof galleryEvents.$inferSelect;
export type InsertGalleryEvent = z.infer<typeof insertGalleryEventSchema>;
