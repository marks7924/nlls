// ============================================================
// NLLS — TypeScript Types
// ============================================================

// ---- Enums ----

export type UserRoleType =
  | 'student'
  | 'parent'
  | 'teacher'
  | 'supervisor'
  | 'admin'
  | 'head_admin'
  | 'developer';

export type StudentStatus =
  | 'active'
  | 'temporarily_suspended'
  | 'withdrawn'
  | 'transferred'
  | 'graduated'
  | 'inactive';

export type PromotionStatus =
  | 'promoted'
  | 'repeated'
  | 'transferred'
  | 'withdrawn'
  | 'graduated';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export type ExamType =
  | 'weekly'
  | 'monthly'
  | 'first_term_final'
  | 'second_term_final'
  | 'quiz'
  | 'assignment'
  | 'classwork'
  | 'activity'
  | 'practical'
  | 'oral';

export type ExamStatus =
  | 'draft'
  | 'scheduled'
  | 'published'
  | 'results_entry'
  | 'results_submitted'
  | 'results_approved'
  | 'results_published'
  | 'locked';

export type TermName = 'first_term' | 'second_term';

export type StageName = 'early_years' | 'primary' | 'preparatory';

export type AdmissionStatus =
  | 'submitted'
  | 'under_review'
  | 'interview_assessment'
  | 'accepted'
  | 'rejected'
  | 'enrolled';

export type RequestStatus = 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export type RequestType =
  | 'meeting'
  | 'document'
  | 'absence'
  | 'complaint'
  | 'suggestion'
  | 'resource'
  | 'technical'
  | 'student_issue'
  | 'support'
  | 'other';

export type EmailStatus = 'pending' | 'sent' | 'failed';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export type CommunicationMethod = 'phone_call' | 'meeting' | 'message' | 'email';

export type ContentStatus = 'draft' | 'published' | 'archived';

export type PermissionOverrideType = 'grant' | 'revoke';

// ---- Interfaces ----

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  first_name_ar?: string;
  last_name_ar?: string;
  role_type: UserRoleType;
  avatar_url?: string;
  phone?: string;
  is_active: boolean;
  requires_password_change: boolean;
  last_login?: string;
  password_last_changed?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  user_id?: string;
  student_code: string;
  first_name: string;
  last_name: string;
  first_name_ar?: string;
  last_name_ar?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  religion?: string;
  address?: string;
  photo_url?: string;
  status: StudentStatus;
  enrollment_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Parent {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  first_name_ar?: string;
  last_name_ar?: string;
  email?: string;
  phone?: string;
  phone_secondary?: string;
  occupation?: string;
  address?: string;
  relationship?: string;
  is_primary_contact: boolean;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  user_id?: string;
  staff_code?: string;
  first_name: string;
  last_name: string;
  first_name_ar?: string;
  last_name_ar?: string;
  role_type: UserRoleType;
  department?: string;
  specialization?: string;
  hire_date?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  is_system: boolean;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  category: string;
  created_at: string;
}

export interface AcademicYear {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Term {
  id: string;
  academic_year_id: string;
  name: TermName;
  display_name: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  created_at: string;
}

export interface Stage {
  id: string;
  name: StageName;
  display_name: string;
  display_name_ar?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Grade {
  id: string;
  stage_id: string;
  name: string;
  short_name?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  stage?: Stage;
}

export interface Class {
  id: string;
  grade_id: string;
  academic_year_id: string;
  name: string;
  capacity?: number;
  room?: string;
  is_active: boolean;
  created_at: string;
  grade?: Grade;
  academic_year?: AcademicYear;
}

export interface Subject {
  id: string;
  name: string;
  name_ar?: string;
  code?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Exam {
  id: string;
  academic_year_id: string;
  term_id: string;
  class_id: string;
  subject_id: string;
  exam_type: ExamType;
  title: string;
  description?: string;
  exam_date?: string;
  max_mark: number;
  status: ExamStatus;
  created_by?: string;
  published_by?: string;
  published_at?: string;
  locked_at?: string;
  instructions?: string;
  sequence_number?: number;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  class?: Class;
}

export interface ExamResult {
  id: string;
  exam_id: string;
  student_id: string;
  mark?: number;
  is_absent: boolean;
  is_excused: boolean;
  notes?: string;
  entered_by?: string;
  entered_at?: string;
  last_edited_by?: string;
  last_edited_at?: string;
  created_at: string;
  updated_at: string;
  student?: Student;
  exam?: Exam;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  class_id: string;
  academic_year_id: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  recorded_by?: string;
  email_sent: boolean;
  email_sent_at?: string;
  created_at: string;
  updated_at: string;
  student?: Student;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target_audience?: string;
  target_id?: string;
  target_roles?: UserRoleType[];
  priority: string;
  status: ContentStatus;
  published_at?: string;
  published_by?: string;
  expires_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type?: string;
  reference_type?: string;
  reference_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  category?: string;
  author_id?: string;
  status: ContentStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  image_url?: string;
  target_audience?: string;
  status: ContentStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Admission {
  id: string;
  academic_year_id: string;
  student_first_name: string;
  student_last_name: string;
  student_first_name_ar?: string;
  student_last_name_ar?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  parent_name: string;
  parent_email?: string;
  parent_phone: string;
  parent_phone_secondary?: string;
  parent_occupation?: string;
  parent_address?: string;
  relationship?: string;
  desired_grade_id?: string;
  previous_school?: string;
  previous_grade?: string;
  medical_conditions?: string;
  special_needs?: string;
  additional_notes?: string;
  status: AdmissionStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  interview_date?: string;
  interview_notes?: string;
  decision_notes?: string;
  decision_by?: string;
  decision_at?: string;
  enrolled_student_id?: string;
  documents?: { name: string; url: string; type: string }[];
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  user_email?: string;
  user_role?: UserRoleType;
  action: string;
  category: string;
  description: string;
  entity_type?: string;
  entity_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: unknown;
  description?: string;
  category?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

// ---- Auth Context ----

export interface AuthUser {
  id: string;
  email: string;
  profile: Profile;
  role: UserRoleType;
  permissions: string[];
}

// ---- Dashboard ----

export interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  totalTeachers: number;
  upcomingExams: number;
  upcomingEvents: number;
  pendingRequests: number;
  openIncidents: number;
  newAdmissions: number;
}

// ---- Navigation ----

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  permission?: string;
  children?: NavItem[];
  badge?: number;
}
