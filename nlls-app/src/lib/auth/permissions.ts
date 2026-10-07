// ============================================================
// NLLS — Permission Constants
// ============================================================

export const PERMISSIONS = {
  // Students
  VIEW_STUDENTS: 'view_students',
  CREATE_STUDENTS: 'create_students',
  EDIT_STUDENTS: 'edit_students',
  DELETE_STUDENTS: 'delete_students',

  // Parents
  VIEW_PARENTS: 'view_parents',
  CREATE_PARENTS: 'create_parents',
  EDIT_PARENTS: 'edit_parents',

  // Teachers
  VIEW_TEACHERS: 'view_teachers',
  MANAGE_TEACHERS: 'manage_teachers',

  // Attendance
  VIEW_ATTENDANCE: 'view_attendance',
  EDIT_ATTENDANCE: 'edit_attendance',

  // Exams
  VIEW_EXAMS: 'view_exams',
  CREATE_EXAMS: 'create_exams',
  EDIT_EXAMS: 'edit_exams',
  ENTER_EXAM_RESULTS: 'enter_exam_results',
  EDIT_EXAM_RESULTS: 'edit_exam_results',
  PUBLISH_EXAM_RESULTS: 'publish_exam_results',
  PUBLISH_FINAL_EXAM_RESULTS: 'publish_final_exam_results',
  REOPEN_EXAM_RESULTS: 'reopen_exam_results',

  // Website / CMS
  EDIT_WEBSITE: 'edit_website',
  MANAGE_GALLERY: 'manage_gallery',
  MANAGE_NEWS: 'manage_news',
  MANAGE_EVENTS: 'manage_events',
  MANAGE_PAGES: 'manage_pages',
  MANAGE_ADMISSIONS_CONTENT: 'manage_admissions_content',

  // Accounts
  MANAGE_ACCOUNTS: 'manage_accounts',
  GENERATE_ACCOUNTS: 'generate_accounts',
  RESET_PASSWORDS: 'reset_passwords',
  VIEW_CREDENTIALS: 'view_credentials',
  PRINT_CREDENTIALS: 'print_credentials',

  // Student Affairs
  VIEW_INCIDENTS: 'view_incidents',
  CREATE_INCIDENTS: 'create_incidents',
  MANAGE_DISCIPLINE: 'manage_discipline',
  APPROVE_SUSPENSION: 'approve_suspension',

  // Finance
  VIEW_FINANCE: 'view_finance',
  MANAGE_FINANCE: 'manage_finance',

  // System
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_SETTINGS: 'manage_settings',

  // Academic
  MANAGE_ADMISSIONS: 'manage_admissions',
  MANAGE_TIMETABLE: 'manage_timetable',
  MANAGE_SUBJECTS: 'manage_subjects',
  MANAGE_CLASSES: 'manage_classes',
  MANAGE_ACADEMIC_YEARS: 'manage_academic_years',
  MANAGE_GRADING_CONFIG: 'manage_grading_config',
  PROMOTE_STUDENTS: 'promote_students',

  // Communications
  MANAGE_ANNOUNCEMENTS: 'manage_announcements',
  MANAGE_EMAIL: 'manage_email',
  VIEW_EMAIL_LOGS: 'view_email_logs',

  // Materials
  MANAGE_MATERIALS: 'manage_materials',
  MANAGE_ASSIGNMENTS: 'manage_assignments',

  // Other
  MANAGE_REQUESTS: 'manage_requests',
  MANAGE_DOCUMENTS: 'manage_documents',
  GENERATE_REPORT_CARDS: 'generate_report_cards',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_CALENDAR: 'manage_calendar',
  MANAGE_MEDIA: 'manage_media',
} as const;

export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Permission categories for UI grouping
export const PERMISSION_CATEGORIES: Record<string, { label: string; permissions: PermissionName[] }> = {
  Students: {
    label: 'Students',
    permissions: [
      PERMISSIONS.VIEW_STUDENTS,
      PERMISSIONS.CREATE_STUDENTS,
      PERMISSIONS.EDIT_STUDENTS,
      PERMISSIONS.DELETE_STUDENTS,
    ],
  },
  Parents: {
    label: 'Parents',
    permissions: [
      PERMISSIONS.VIEW_PARENTS,
      PERMISSIONS.CREATE_PARENTS,
      PERMISSIONS.EDIT_PARENTS,
    ],
  },
  Teachers: {
    label: 'Teachers',
    permissions: [
      PERMISSIONS.VIEW_TEACHERS,
      PERMISSIONS.MANAGE_TEACHERS,
    ],
  },
  Attendance: {
    label: 'Attendance',
    permissions: [
      PERMISSIONS.VIEW_ATTENDANCE,
      PERMISSIONS.EDIT_ATTENDANCE,
    ],
  },
  Exams: {
    label: 'Exams',
    permissions: [
      PERMISSIONS.VIEW_EXAMS,
      PERMISSIONS.CREATE_EXAMS,
      PERMISSIONS.EDIT_EXAMS,
      PERMISSIONS.ENTER_EXAM_RESULTS,
      PERMISSIONS.EDIT_EXAM_RESULTS,
      PERMISSIONS.PUBLISH_EXAM_RESULTS,
      PERMISSIONS.PUBLISH_FINAL_EXAM_RESULTS,
      PERMISSIONS.REOPEN_EXAM_RESULTS,
    ],
  },
  Website: {
    label: 'Website',
    permissions: [
      PERMISSIONS.EDIT_WEBSITE,
      PERMISSIONS.MANAGE_GALLERY,
      PERMISSIONS.MANAGE_NEWS,
      PERMISSIONS.MANAGE_EVENTS,
      PERMISSIONS.MANAGE_PAGES,
      PERMISSIONS.MANAGE_ADMISSIONS_CONTENT,
      PERMISSIONS.MANAGE_MEDIA,
    ],
  },
  Accounts: {
    label: 'Accounts',
    permissions: [
      PERMISSIONS.MANAGE_ACCOUNTS,
      PERMISSIONS.GENERATE_ACCOUNTS,
      PERMISSIONS.RESET_PASSWORDS,
      PERMISSIONS.VIEW_CREDENTIALS,
      PERMISSIONS.PRINT_CREDENTIALS,
    ],
  },
  'Student Affairs': {
    label: 'Student Affairs',
    permissions: [
      PERMISSIONS.VIEW_INCIDENTS,
      PERMISSIONS.CREATE_INCIDENTS,
      PERMISSIONS.MANAGE_DISCIPLINE,
      PERMISSIONS.APPROVE_SUSPENSION,
    ],
  },
  Finance: {
    label: 'Finance',
    permissions: [
      PERMISSIONS.VIEW_FINANCE,
      PERMISSIONS.MANAGE_FINANCE,
    ],
  },
  Academic: {
    label: 'Academic',
    permissions: [
      PERMISSIONS.MANAGE_ADMISSIONS,
      PERMISSIONS.MANAGE_TIMETABLE,
      PERMISSIONS.MANAGE_SUBJECTS,
      PERMISSIONS.MANAGE_CLASSES,
      PERMISSIONS.MANAGE_ACADEMIC_YEARS,
      PERMISSIONS.MANAGE_GRADING_CONFIG,
      PERMISSIONS.MANAGE_MATERIALS,
      PERMISSIONS.MANAGE_ASSIGNMENTS,
      PERMISSIONS.GENERATE_REPORT_CARDS,
      PERMISSIONS.MANAGE_CALENDAR,
      PERMISSIONS.PROMOTE_STUDENTS,
    ],
  },
  Communications: {
    label: 'Communications',
    permissions: [
      PERMISSIONS.MANAGE_ANNOUNCEMENTS,
      PERMISSIONS.MANAGE_EMAIL,
      PERMISSIONS.VIEW_EMAIL_LOGS,
    ],
  },
  System: {
    label: 'System',
    permissions: [
      PERMISSIONS.MANAGE_ROLES,
      PERMISSIONS.MANAGE_PERMISSIONS,
      PERMISSIONS.VIEW_AUDIT_LOGS,
      PERMISSIONS.MANAGE_SETTINGS,
      PERMISSIONS.MANAGE_REQUESTS,
      PERMISSIONS.MANAGE_DOCUMENTS,
      PERMISSIONS.VIEW_ANALYTICS,
    ],
  },
};
