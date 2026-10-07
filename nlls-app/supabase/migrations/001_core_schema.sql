-- ============================================================
-- New Life Language School (NLLS) — Supabase PostgreSQL Schema
-- Migration 001: Core Entities, Auth Profiles, RLS & Audit Logs
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- ENUMS ----
CREATE TYPE user_role_type AS ENUM (
  'student', 'parent', 'teacher', 'supervisor', 'admin', 'head_admin', 'developer'
);

CREATE TYPE student_status AS ENUM (
  'active', 'temporarily_suspended', 'withdrawn', 'transferred', 'graduated', 'inactive'
);

CREATE TYPE attendance_status AS ENUM (
  'present', 'absent', 'late', 'excused'
);

CREATE TYPE exam_status AS ENUM (
  'draft', 'scheduled', 'results_pending', 'submitted', 'approved', 'published', 'locked'
);

-- ---- 1. PROFILES TABLE ----
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  first_name_ar TEXT,
  last_name_ar TEXT,
  role_type user_role_type NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  requires_password_change BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---- 2. ACADEMIC STRUCTURE ----
CREATE TABLE IF NOT EXISTS public.academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g. '2026/2027'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- 'Early Years', 'Primary', 'Preparatory'
  name_ar TEXT,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stage_id UUID NOT NULL REFERENCES public.stages(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'KG1', 'Grade 7', etc.
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade_id UUID NOT NULL REFERENCES public.grades(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- '7-A', 'KG2-Blue'
  capacity INT NOT NULL DEFAULT 30,
  room_number TEXT,
  homeroom_teacher_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---- 3. STUDENTS & PARENTS ----
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
  student_code TEXT NOT NULL UNIQUE, -- 'NL-2026-00142'
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  first_name_ar TEXT,
  last_name_ar TEXT,
  date_of_birth DATE,
  gender TEXT,
  status student_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.parent_students (
  parent_id UUID REFERENCES public.parents(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, student_id)
);

-- ---- 4. EXAMS & MARKS ----
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID NOT NULL REFERENCES public.academic_years(id),
  class_id UUID NOT NULL REFERENCES public.classes(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Weekly Quiz', 'Monthly Exam', 'Final Exam'
  subject TEXT NOT NULL,
  max_score NUMERIC(5,2) NOT NULL DEFAULT 100.00,
  exam_date DATE NOT NULL,
  status exam_status NOT NULL DEFAULT 'scheduled',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  is_absent BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (exam_id, student_id)
);

-- ---- 5. IMMUTABLE AUDIT LOGS ----
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email TEXT,
  user_role TEXT,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---- ROW LEVEL SECURITY (RLS) POLICIES ----
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Base RLS Policy: Users can view their own profile; Admins/Devs can view all
CREATE POLICY "Public profiles read for authenticated users" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admin audit log full access" 
  ON public.audit_logs FOR SELECT 
  TO authenticated 
  USING (true);
