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
    'nav.about': 'About Us',
    'nav.academics': 'Academics',
    'nav.school_life': 'School Life',
    'nav.admissions': 'Admissions',
    'nav.news': 'Latest News',
    'nav.contact': 'Contact Us',

    // School Branding
    'school.title': 'New Life Language School',
    'school.tagline': 'Empowering Leaders of Tomorrow',
    'school.portal_sub': 'Official School Portal 2026/2027',

    // Homepage Hero Section
    'hero.badge': 'Admissions Open for 2027/2028 Academic Year',
    'hero.title_part1': 'Building Tomorrow\'s ',
    'hero.title_part2': 'Leaders ',
    'hero.title_part3': 'Today',
    'hero.desc': 'New Life Language School provides a comprehensive, nurturing educational environment from Early Years through Preparatory, cultivating confident, knowledgeable, and responsible young learners.',
    'hero.btn_apply': 'Apply Now Online',
    'hero.btn_discover': 'Discover NLLS',

    // Stats Bar
    'stats.students': 'Active Students',
    'stats.teachers': 'Qualified Teachers',
    'stats.grades': 'Grade Levels',
    'stats.years': 'Years of Excellence',

    // About Section
    'about.subtitle': 'About Our School',
    'about.title': 'A Foundation for Lifelong Learning',
    'about.p1': 'Since our founding, New Life Language School has been committed to providing an exceptional educational experience that blends academic rigour with character development.',
    'about.p2': 'Located in Egypt, we serve a diverse community of learners from Primary 1 through Preparatory 3 with dedicated educators creating a supportive environment.',
    'about.mission_title': 'Our Mission',
    'about.mission_desc': 'To develop well-rounded, bilingual learners prepared for global citizenship.',
    'about.vision_title': 'Our Vision',
    'about.vision_desc': 'To be a leading private language school recognized for educational excellence.',
    'about.values_title': 'Our Values',
    'about.values_desc': 'Integrity, excellence, respect, responsibility, and lifelong learning.',
    'about.approach_title': 'Our Approach',
    'about.approach_desc': 'Student-centred learning with modern interactive methodologies.',

    // Academics Section
    'acad.subtitle': 'Our Programs',
    'acad.title': 'Academic Stages & Curriculum',
    'acad.desc': 'We offer a comprehensive curriculum across two main educational stages, preparing students for academic success at every level.',
    'acad.early': 'Early Years',
    'acad.primary': 'Primary Stage (Grades 1..6)',
    'acad.prep': 'Preparatory Stage (Grades 1..3)',

    // Contact Form
    'contact.subtitle': 'Direct Communication Channel',
    'contact.title': 'Get in Touch with NLLS Leadership',
    'contact.desc': 'Have questions regarding admissions, academic programs, or campus visits? Our admissions team responds within 24 hours.',
    'contact.hqs': 'School Campus Headquarters',
    'contact.loc_lbl': 'Campus Location:',
    'contact.loc_val': '90th Street, 5th Settlement, New Cairo, Egypt',
    'contact.phone_lbl': 'Direct Phone Lines:',
    'contact.email_lbl': 'Official Inquiry Emails:',
    'contact.hours_lbl': 'Working Administration Hours:',
    'contact.hours_val': 'Sunday – Thursday: 07:30 AM – 03:30 PM',
    'contact.form_title': 'Send Us a Direct Message',
    'contact.first_name': 'First Name',
    'contact.last_name': 'Last Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.dept': 'Inquiry Department',
    'contact.dept_adm': 'Admissions & New Enrolment (Primary 1..6 & Prep 1..3)',
    'contact.dept_acad': 'Academic Curriculum & Examinations',
    'contact.dept_affairs': 'Student Affairs & Disciplinary Records',
    'contact.dept_gen': 'General Administrative Inquiry',
    'contact.message': 'Your Detailed Message',
    'contact.btn_send': 'Send Inquiry Message →',

    // Footer
    'footer.quick': 'Quick Links',
    'footer.acad': 'Academic Stages',
    'footer.portal': 'Portal Login',
    'footer.rights': '© 2026 New Life Language School. All rights reserved.',

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
    'dashboard.today_overview': 'Today\'s Overview',
    'dashboard.stage_perf': 'Stage Performance',
    'dashboard.upcoming_exams': 'Upcoming Exams',

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
    'nav.news': 'آخر الأخبار',
    'nav.contact': 'اتصل بنا',

    // School Branding
    'school.title': 'مدرسة نيو لايف لغات',
    'school.tagline': 'بناء قادة الغد بالتميز والابتكار',
    'school.portal_sub': 'البوابة الرسمية للمدرسة 2026/2027',

    // Homepage Hero Section
    'hero.badge': 'باب القبول والتسجيل مفتوح للعام الدراسي 2027/2028',
    'hero.title_part1': 'نصنع اليوم ',
    'hero.title_part2': 'قادة ',
    'hero.title_part3': 'المستقبل',
    'hero.desc': 'توفر مدرسة نيو لايف لغات بيئة تعليمية متكاملة ومحفزة من المرحلة الابتدائية وحتى الإعدادية لتنشئة جيل واثق ومتميز أكاديمياً وتربوياً.',
    'hero.btn_apply': 'التقديم الإلكتروني الآن',
    'hero.btn_discover': 'اكتشف مدرسة نيو لايف',

    // Stats Bar
    'stats.students': 'طالب مقيد بالمدرسة',
    'stats.teachers': 'معلم ومربٍ قدير',
    'stats.grades': 'مرحلة وصف دراسي',
    'stats.years': 'عاماً من التميز التعليمي',

    // About Section
    'about.subtitle': 'نبذة عن المدرسة',
    'about.title': 'أساس رصين للتعلم مدى الحياة',
    'about.p1': 'منذ تأسيس مدرسة نيو لايف لغات، التزمنا بتوفير تجربة تعليمية استثنائية تجمع بين الرصانة الأكاديمية والبناء التربوي والأخلاقي.',
    'about.p2': 'نخدم مجتمعاً تعليمياً متعدداً بدءاً من الابتدائي 1 حتى الإعدادي 3 في بيئة داعمة تشجع كل طالب على التميز والتألق.',
    'about.mission_title': 'رسالتنا',
    'about.mission_desc': 'إعداد طلاب متعددي اللغات، متميزين أكاديمياً ومؤهلين للمواطنة العالمية.',
    'about.vision_title': 'رؤيتنا',
    'about.vision_desc': 'أن نكون مدرسة اللغات الرائدة والمتميزة في تقديم التعليم الحديث والتطوير المستمر.',
    'about.values_title': 'قيمنا',
    'about.values_desc': 'النزاهة، التميز، الاحترام، المسؤولية، والتعلم المستمر.',
    'about.approach_title': 'نهجنا التعليمي',
    'about.approach_desc': 'تعلم متمركز حول الطالب باستخدام أحدث الوسائل التفاعلية والتقنيات.',

    // Academics Section
    'acad.subtitle': 'برامجنا التعليمية',
    'acad.title': 'المراحل والمناهج الدراسية',
    'acad.desc': 'نقدم مناهج متكاملة عبر مرحلتين رئيسيتين، لتأهيل الطلاب للنجاح الأكاديمي والتميز في جميع المستويات.',
    'acad.early': 'السنوات الأولى',
    'acad.primary': 'المرحلة الابتدائية (الصفوف 1..6)',
    'acad.prep': 'المرحلة الإعدادية (الصفوف 1..3)',

    // Contact Form
    'contact.subtitle': 'قناة الاتصال المباشرة',
    'contact.title': 'تواصل مباشرة مع إدارة مدرسة نيو لايف',
    'contact.desc': 'هل لديك استفسارات بشأن القبول والتسجيل أو البرامج الأكاديمية أو زيارة المجمّع؟ فريقنا يجيب خلال 24 ساعة.',
    'contact.hqs': 'المقر الرئيسي لمجمع المدارس',
    'contact.loc_lbl': 'عنوان المجمع:',
    'contact.loc_val': 'شارع التسعين، التجمع الخامس، القاهرة الجديدة، مصر',
    'contact.phone_lbl': 'خطوط الاتصال المباشر:',
    'contact.email_lbl': 'البريد الإلكتروني للرد المباشر:',
    'contact.hours_lbl': 'مواعيد العمل الإدارية:',
    'contact.hours_val': 'الأحد – الخميس: 07:30 صباحاً – 03:30 مساءً',
    'contact.form_title': 'أرسل لنا رسالة مباشرة',
    'contact.first_name': 'الاسم الأول',
    'contact.last_name': 'اسم العائلة',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.dept': 'القسم المختص بالإستفسار',
    'contact.dept_adm': 'القبول والتسجيل الجديد (ابتدائي 1..6 وإعدادي 1..3)',
    'contact.dept_acad': 'المناهج الدراسية والامتحانات',
    'contact.dept_affairs': 'شؤون الطلاب والسجلات الانضباطية',
    'contact.dept_gen': 'استفسار إداري عام',
    'contact.message': 'تفاصيل الرسالة أو الاستفسار',
    'contact.btn_send': 'إرسال الرسالة والاستفسار ←',

    // Footer
    'footer.quick': 'روابط سريعة',
    'footer.acad': 'المراحل الدراسية',
    'footer.portal': 'بوابة تسجيل الدخول',
    'footer.rights': '© 2026 مدرسة نيو لايف لغات. جميع الحقوق محفوظة.',

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
    'dashboard.today_overview': 'نظرة عامة على اليوم',
    'dashboard.stage_perf': 'أداء المراحل الدراسية',
    'dashboard.upcoming_exams': 'الامتحانات القادمة',

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
