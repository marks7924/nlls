'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

interface LanguageThemeContextType {
  lang: Language;
  theme: Theme;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Controls
    'nav.switch_lang': 'العربية',
    'nav.switch_theme_dark': 'Dark Mode 🌙',
    'nav.switch_theme_light': 'Light Mode ☀️',
    'nav.portal_login': 'Portal Login →',
    'nav.track_status': '🔍 Track Status',
    'nav.apply_now': 'Apply Now ✍️',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.academics': 'Academics',
    'nav.school_life': 'School Life',
    'nav.admissions': 'Admissions',
    'nav.news': 'News',
    'nav.contact': 'Contact Us',

    // School Title
    'school.title': 'New Life Language School',
    'school.tagline': 'Empowering Leaders of Tomorrow',
    'school.portal_sub': 'Official School Portal 2026/2027',

    // Portal Navigation
    'portal.dashboard': 'Dashboard',
    'portal.students': 'Students',
    'portal.parents': 'Parents',
    'portal.teachers': 'Teachers',
    'portal.supervisors': 'Supervisors',
    'portal.classes': 'Classes',
    'portal.subjects': 'Subjects',
    'portal.timetable': 'Timetable',
    'portal.attendance': 'Attendance',
    'portal.exams': 'Exams',
    'portal.grades': 'Grades',
    'portal.student_affairs': 'Student Affairs',
    'portal.admissions_mgmt': 'Admissions',
    'portal.messages': 'Messages',
    'portal.events': 'Events',
    'portal.announcements': 'Announcements',
    'portal.website': 'Website',
    'portal.documents': 'Documents',
    'portal.requests': 'Requests',
    'portal.reports': 'Reports',
    'portal.accounts': 'Accounts',
    'portal.email': 'Email Center',
    'portal.analytics': 'Analytics',
    'portal.permissions': 'Permissions Matrix',
    'portal.settings': 'Settings',
    'portal.audit_logs': 'Audit Logs',
    'portal.sign_out': 'Sign Out',
    'portal.profile': 'Profile',
    'portal.welcome': 'Welcome',

    // Dashboard Quick Actions
    'dashboard.record_attendance': 'Record Attendance',
    'dashboard.enter_grades': 'Enter Grades',
    'dashboard.new_announcement': 'New Announcement',
    'dashboard.add_student': 'Add Student',
    'dashboard.quick_actions': 'Quick Actions',

    // Public Admissions Page
    'adm.title': 'Student Admission Application',
    'adm.subtitle': 'Enrolment options for Primary 1..6 and Preparatory 1..3.',
    'adm.tab_apply': 'Apply for Enrolment',
    'adm.tab_track': 'Track Reference Status',
    'adm.step1': 'Student Information',
    'adm.step2': 'Guardian Details',
    'adm.step3': 'Documents Upload',
    'adm.search_ph': 'Enter Tracking Reference Code (e.g. MSG-2026-126 or ADM-2026-9821)...',
    'adm.check_btn': 'Check Status',

    // Common
    'btn.submit': 'Submit',
    'btn.cancel': 'Cancel',
    'btn.close': 'Close',
    'btn.register': 'Register & Enrol Student',
    'btn.save': 'Save Changes',
    'lbl.search': 'Smart Search...',
  },
  ar: {
    // Top Bar & Controls
    'nav.switch_lang': 'English',
    'nav.switch_theme_dark': 'الوضع الداكن 🌙',
    'nav.switch_theme_light': 'الوضع المضيء ☀️',
    'nav.portal_login': 'دخول البوابة الرقمية ←',
    'nav.track_status': '🔍 تتبع حالة الطلب',
    'nav.apply_now': 'قدّم الآن ✍️',
    'nav.home': 'الرئيسية',
    'nav.about': 'عن المدرسة',
    'nav.academics': 'الأكاديميات',
    'nav.school_life': 'الحياة المدرسية',
    'nav.admissions': 'القبول والتسجيل',
    'nav.news': 'الأخبار',
    'nav.contact': 'اتصل بنا',

    // School Title
    'school.title': 'مدرسة نيو لايف لغات',
    'school.tagline': 'بناء قادة الغد بالتميز والابتكار',
    'school.portal_sub': 'البوابة الرسمية للمدرسة 2026/2027',

    // Portal Navigation
    'portal.dashboard': 'لوحة التحكم',
    'portal.students': 'إدارة الطلاب',
    'portal.parents': 'أولياء الأمور',
    'portal.teachers': 'المعلمون والهيئة التدريسية',
    'portal.supervisors': 'الموجهون والمشرفون',
    'portal.classes': 'الفصول المدرسية',
    'portal.subjects': 'المواد الدراسية',
    'portal.timetable': 'الجدول الدراسي',
    'portal.attendance': 'الحضور والغياب',
    'portal.exams': 'الامتحانات والاختبارات',
    'portal.grades': 'الدرجات والشهادات',
    'portal.student_affairs': 'شؤون الطلاب والانضباط',
    'portal.admissions_mgmt': 'إدارة القبول والتسجيل',
    'portal.messages': 'صندوق الرسائل والاستفسارات',
    'portal.events': 'الفعاليات والأحداث',
    'portal.announcements': 'الإعلانات المدرسية',
    'portal.website': 'إدارة الموقع الإلكتروني',
    'portal.documents': 'المستندات والأرشيف',
    'portal.requests': 'طلبات أولياء الأمور',
    'portal.reports': 'التقارير الإحصائية',
    'portal.accounts': 'إدارة الحسابات والصلاحيات',
    'portal.email': 'مركز البريد الإلكتروني',
    'portal.analytics': 'التحليلات والأداء',
    'portal.permissions': 'مصفوفة الصلاحيات',
    'portal.settings': 'إعدادات النظام',
    'portal.audit_logs': 'سجل النشاطات',
    'portal.sign_out': 'تسجيل الخروج',
    'portal.profile': 'الملف الشخصي',
    'portal.welcome': 'مرحباً بك',

    // Dashboard Quick Actions
    'dashboard.record_attendance': 'تسجيل الحضور',
    'dashboard.enter_grades': 'رصد الدرجات',
    'dashboard.new_announcement': 'إعلان جديد',
    'dashboard.add_student': 'إضافة طالب جديد',
    'dashboard.quick_actions': 'إجراءات سريعة',

    // Public Admissions Page
    'adm.title': 'طلب الالتحاق والقبول بالمدرسة',
    'adm.subtitle': 'خيارات التسجيل للمرحلة الابتدائية (1-6) والإعدادية (1-3)',
    'adm.tab_apply': 'تقديم طلب جديد',
    'adm.tab_track': 'الاستعلام عن طلب سابق',
    'adm.step1': 'بيانات الطالب',
    'adm.step2': 'بيانات ولي الأمر',
    'adm.step3': 'رفع المستندات',
    'adm.search_ph': 'أدخل كود المتابعة (مثال: MSG-2026-126 أو ADM-2026-9821)...',
    'adm.check_btn': 'استعلام عن الحالة',

    // Common
    'btn.submit': 'إرسال',
    'btn.cancel': 'إلغاء',
    'btn.close': 'إغلاق',
    'btn.register': 'تسجيل وإلحاق الطالب',
    'btn.save': 'حفظ التغييرات',
    'lbl.search': 'بحث ذكي...',
  },
};

const LanguageThemeContext = createContext<LanguageThemeContextType>({
  lang: 'en',
  theme: 'light',
  setLang: () => {},
  setTheme: () => {},
  toggleLang: () => {},
  toggleTheme: () => {},
  t: (key: string) => key,
});

export function LanguageThemeProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');

  // Load saved preferences on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('nlls_lang') as Language | null;
    const savedTheme = localStorage.getItem('nlls_theme') as Theme | null;

    if (savedLang === 'en' || savedLang === 'ar') {
      setLangState(savedLang);
    }
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) setThemeState('dark');
    }
  }, []);

  // Update HTML attribute for DIR (RTL / LTR) and class for Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [lang, theme]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('nlls_lang', newLang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('nlls_theme', newTheme);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const t = useCallback((key: string): string => {
    return DICTIONARY[lang]?.[key] || DICTIONARY.en?.[key] || key;
  }, [lang]);

  return (
    <LanguageThemeContext.Provider value={{ lang, theme, setLang, setTheme, toggleLang, toggleTheme, t }}>
      {children}
    </LanguageThemeContext.Provider>
  );
}

export function useLanguageTheme() {
  const context = useContext(LanguageThemeContext);
  if (!context) {
    throw new Error('useLanguageTheme must be used within a LanguageThemeProvider');
  }
  return context;
}
