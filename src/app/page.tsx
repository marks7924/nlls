'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const { lang, theme, toggleLang, toggleTheme, t } = useLanguageTheme();
  const router = useRouter();

  // If already logged in, redirect to portal
  useEffect(() => {
    if (user) {
      router.push('/portal/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/nlls.png"
                alt="NLLS School Logo"
                className="w-10 h-10 object-contain cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                onClick={() => window.location.reload()}
                title="Click to Reload Page"
              />
              <div className="cursor-pointer" onClick={() => window.location.reload()}>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{t('school.title')}</h1>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium -mt-0.5">{t('school.tagline')}</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.about')}</a>
              <a href="#academics" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.academics')}</a>
              <a href="#school-life" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.school_life')}</a>
              <a href="#admissions" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.admissions')}</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.contact')}</a>
            </nav>

            {/* Controls & Login */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                title="Switch Language / تغيير اللغة"
              >
                🌐 {lang === 'en' ? 'العربية' : 'English'}
              </button>

              <button
                onClick={toggleTheme}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                title="Toggle Theme"
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>

              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
              >
                {t('nav.portal_login')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 dark:bg-slate-950 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(250,204,21,0.15) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
              <span className="text-xs font-bold text-amber-300">{t('hero.badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 font-heading">
              {t('hero.title_part1')}
              <span className="text-amber-400">{t('hero.title_part2')}</span>
              {t('hero.title_part3')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {t('hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="inline-flex items-center px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg hover:scale-105"
              >
                {t('hero.btn_apply')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-6 py-3 text-sm font-bold text-white border border-slate-700 hover:border-slate-500 rounded-xl transition-all bg-slate-800/40"
              >
                {t('hero.btn_discover')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-slate-900 py-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: t('stats.students') },
              { value: '50+', label: t('stats.teachers') },
              { value: '9', label: t('stats.grades') },
              { value: '15+', label: t('stats.years') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400 font-mono">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{t('about.subtitle')}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-6 font-heading">
                {t('about.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm">
                {t('about.p1')}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                {t('about.p2')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', title: t('about.mission_title'), text: t('about.mission_desc') },
                  { icon: '👁️', title: t('about.vision_title'), text: t('about.vision_desc') },
                  { icon: '💎', title: t('about.values_title'), text: t('about.values_desc') },
                  { icon: '📚', title: t('about.approach_title'), text: t('about.approach_desc') },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center space-y-2">
                  <img src="/nlls.png" alt="NLLS Campus Logo" className="w-20 h-20 object-contain mx-auto mb-2" />
                  <p className="text-slate-900 dark:text-white font-bold text-sm font-heading">{t('school.title')}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">Main Campus — New Cairo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{t('acad.subtitle')}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 font-heading">{t('acad.title')}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
              {t('acad.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                stage: t('acad.primary'),
                grades: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
                icon: '📖',
                desc: 'Building strong academic foundations with a focus on literacy, numeracy, sciences, and character development.'
              },
              {
                stage: t('acad.prep'),
                grades: ['Preparatory 1', 'Preparatory 2', 'Preparatory 3'],
                icon: '🎓',
                desc: 'Advanced academic preparation that challenges students to think critically and prepares them for secondary education.'
              },
            ].map((item) => (
              <div key={item.stage} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
                <div className="p-6 bg-blue-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{item.stage}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.grades.map((g) => (
                      <div key={g} className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-xs font-bold text-blue-900 dark:text-blue-300 border border-slate-200 dark:border-slate-800 text-center">
                        {g}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Life */}
      <section id="school-life" className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">{t('nav.school_life')}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 font-heading">{t('nav.school_life')}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
              We believe education extends beyond textbooks. Our vibrant school community offers a rich array of activities and experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: '⚽', title: 'Sports & Athletics', desc: 'Competitive and recreational sports programs' },
              { icon: '🎨', title: 'Arts & Culture', desc: 'Creative expression through various art forms' },
              { icon: '🏆', title: 'Academic Competitions', desc: 'Academic and extracurricular competitions' },
              { icon: '🌍', title: 'Educational Field Trips', desc: 'Educational excursions and campus experiences' },
              { icon: '🎭', title: 'Student Clubs', desc: 'Student-led interest groups and activities' },
              { icon: '🎉', title: 'Cultural Celebrations', desc: 'Cultural and seasonal celebrations' },
              { icon: '📐', title: 'STEM Laboratories', desc: 'Science, technology, engineering, and math' },
              { icon: '🤝', title: 'Community Service', desc: 'Service learning and community engagement' },
            ].map((item) => (
              <div key={item.title} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-all group">
                <span className="text-2xl sm:text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section id="admissions" className="py-16 sm:py-20 bg-slate-900 dark:bg-slate-950 border-t border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 font-heading">
            {t('adm.title')}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
            {t('adm.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center px-8 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              {t('adm.tab_apply')}
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 text-xs font-bold text-white border border-slate-700 hover:border-slate-500 rounded-xl transition-all bg-slate-800/40"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-indigo-950/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 uppercase tracking-widest">
              {t('contact.subtitle')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
              {t('contact.title')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('contact.desc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> {t('contact.hqs')}
                </h3>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">📍</span>
                    <div>
                      <strong className="block text-white">{t('contact.loc_lbl')}</strong>
                      <span>{t('contact.loc_val')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">📞</span>
                    <div>
                      <strong className="block text-white">{t('contact.phone_lbl')}</strong>
                      <span className="font-mono text-blue-400 font-bold block">+20 2 2700 8900</span>
                      <span className="font-mono text-blue-400 font-bold block">+20 100 123 4567</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">✉️</span>
                    <div>
                      <strong className="block text-white">{t('contact.email_lbl')}</strong>
                      <span className="font-mono text-slate-300 block">Admissions: admissions@nlls.edu.eg</span>
                      <span className="font-mono text-slate-300 block">General: info@nlls.edu.eg</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">🕐</span>
                    <div>
                      <strong className="block text-white">{t('contact.hours_lbl')}</strong>
                      <span>{t('contact.hours_val')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Interactive Contact Form */}
            <ContactFormSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 space-y-2">
              <div className="flex items-center gap-3">
                <img src="/nlls.png" alt="NLLS Logo" className="w-10 h-10 object-contain" />
                <div>
                  <h3 className="text-base font-bold text-white">{t('school.title')}</h3>
                  <p className="text-xs text-blue-400 font-mono">{t('school.tagline')}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-4">{t('footer.quick')}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
                <li><a href="#academics" className="hover:text-white transition-colors">{t('nav.academics')}</a></li>
                <li><a href="#admissions" className="hover:text-white transition-colors">{t('nav.admissions')}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-4">{t('footer.acad')}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>{t('acad.primary')}</li>
                <li>{t('acad.prep')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-4">{t('footer.portal')}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/login" className="hover:text-white transition-colors">{t('nav.portal_login')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { saveContactMessage } from '@/lib/contact-messages';

function ContactFormSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<'admissions' | 'academics' | 'student_affairs' | 'general'>('general');
  const [message, setMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState<{ id: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = saveContactMessage({
      firstName,
      lastName,
      email,
      phone,
      department,
      message,
    });
    setSubmittedNotice({ id: saved.id });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
      <div>
        <h3 className="text-xl font-black text-white font-heading">Send Us a Direct Message</h3>
        <p className="text-xs text-slate-400 mt-1">Fill out the inquiry form below for instant routing to Student Affairs.</p>
      </div>

      {submittedNotice ? (
        <div className="bg-emerald-950/80 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h4 className="font-bold text-white text-base font-heading">Web Notice: Message Delivered Successfully</h4>
          <p className="text-xs text-emerald-300">
            Thank you! Your inquiry has been routed directly to NLLS Student Affairs & Admissions.
          </p>
          <div className="text-[11px] font-mono text-yellow-400 bg-slate-950 p-2 rounded-lg inline-block">
            Tracking Reference: {submittedNotice.id}
          </div>
          <div className="pt-2">
            <button
              onClick={() => setSubmittedNotice(null)}
              className="text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-first-name" className="block text-xs font-bold text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                id="contact-first-name"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-last-name" className="block text-xs font-bold text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                id="contact-last-name"
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                id="contact-email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                id="contact-phone"
                required
                placeholder="+20 100 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-300 mb-1">Inquiry Department</label>
            <select
              id="contact-subject"
              value={department}
              onChange={(e) => setDepartment(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 text-blue-400 font-bold rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="admissions">Admissions & New Enrolment (Primary 1..6 & Prep 1..3)</option>
              <option value="academics">Academic Curriculum & Examinations</option>
              <option value="student_affairs">Student Affairs & Disciplinary Records</option>
              <option value="general">General Administrative Inquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 mb-1">Your Detailed Message</label>
            <textarea
              id="contact-message"
              rows={4}
              required
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-all hover:scale-[1.01]"
          >
            Send Inquiry Message →
          </button>
        </form>
      )}
    </div>
  );
}
