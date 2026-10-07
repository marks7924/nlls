'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to portal
  useEffect(() => {
    if (user) {
      router.push('/portal/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
                <h1 className="text-lg font-bold text-gray-900 leading-tight">New Life</h1>
                <p className="text-xs text-brand-600 font-medium -mt-0.5">Language School</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">About</a>
              <a href="#academics" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Academics</a>
              <a href="#school-life" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">School Life</a>
              <a href="#admissions" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Admissions</a>
              <a href="#news" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">News</a>
              <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Contact</a>
            </nav>

            {/* Login */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors"
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(250,204,21,0.15) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
              <span className="text-sm font-medium text-accent-300">Admissions Open for 2027/2028</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Building Tomorrow&apos;s
              <span className="text-accent-400"> Leaders</span> Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              New Life Language School provides a comprehensive, nurturing educational environment 
              from Early Years through Preparatory, cultivating confident, knowledgeable, and 
              responsible young learners.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-brand-900 bg-accent-400 hover:bg-accent-300 rounded-md transition-colors"
              >
                Apply Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 hover:border-white/60 rounded-md transition-colors"
              >
                Discover NLLS
              </a>
            </div>
          </div>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V40C1440 40 1140 0 720 0C300 0 0 40 0 40V80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Students' },
              { value: '50+', label: 'Qualified Teachers' },
              { value: '12', label: 'Grade Levels' },
              { value: '15+', label: 'Years of Excellence' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-800">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">About Our School</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                A Foundation for Lifelong Learning
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Since our founding, New Life Language School has been committed to providing 
                an exceptional educational experience that blends academic rigour with character 
                development. Located in Egypt, we serve a diverse community of learners from 
                Baby Class through Preparatory 3.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our dedicated team of educators creates a supportive environment where every 
                student is encouraged to explore, question, and achieve their personal best.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', title: 'Our Mission', text: 'To develop well-rounded, bilingual learners prepared for global citizenship' },
                  { icon: '👁️', title: 'Our Vision', text: 'To be a leading language school recognised for educational excellence' },
                  { icon: '💎', title: 'Our Values', text: 'Integrity, excellence, respect, responsibility, and lifelong learning' },
                  { icon: '📚', title: 'Our Approach', text: 'Student-centred learning with modern teaching methodologies' },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-brand-50 rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-brand-700 font-medium">School Gallery</p>
                  <p className="text-sm text-brand-500 mt-1">Photos coming soon</p>
                </div>
              </div>
              {/* Accent decoration */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent-400/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Our Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Academic Stages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive curriculum across three educational stages, 
              preparing students for academic success at every level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stage: 'Early Years',
                grades: ['Baby Class', 'KG 1', 'KG 2'],
                color: 'accent',
                icon: '🌱',
                description: 'A nurturing foundation that develops curiosity, creativity, and essential early learning skills through play-based and structured activities.',
              },
              {
                stage: 'Primary',
                grades: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
                color: 'brand',
                icon: '📖',
                description: 'Building strong academic foundations with a focus on literacy, numeracy, sciences, and character development.',
              },
              {
                stage: 'Preparatory',
                grades: ['Preparatory 1', 'Preparatory 2', 'Preparatory 3'],
                color: 'brand',
                icon: '🎓',
                description: 'Advanced academic preparation that challenges students to think critically and prepares them for secondary education.',
              },
            ].map((item) => (
              <div key={item.stage} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-brand-300 transition-colors">
                <div className={`p-6 ${item.color === 'accent' ? 'bg-accent-50 border-b border-accent-200' : 'bg-brand-50 border-b border-brand-200'}`}>
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{item.stage}</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="space-y-2">
                    {item.grades.map((grade) => (
                      <div key={grade} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'accent' ? 'bg-accent-500' : 'bg-brand-500'}`} />
                        {grade}
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
      <section id="school-life" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Beyond the Classroom</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">School Life</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe education extends beyond textbooks. Our vibrant school community 
              offers a rich array of activities and experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: '⚽', title: 'Sports', desc: 'Competitive and recreational sports programs' },
              { icon: '🎨', title: 'Arts & Culture', desc: 'Creative expression through various art forms' },
              { icon: '🏆', title: 'Competitions', desc: 'Academic and extracurricular competitions' },
              { icon: '🌍', title: 'Field Trips', desc: 'Educational excursions and experiences' },
              { icon: '🎭', title: 'Clubs', desc: 'Student-led interest groups and clubs' },
              { icon: '🎉', title: 'Celebrations', desc: 'Cultural and seasonal celebrations' },
              { icon: '📐', title: 'STEM', desc: 'Science, technology, engineering, and math' },
              { icon: '🤝', title: 'Community', desc: 'Service learning and community engagement' },
            ].map((item) => (
              <div key={item.title} className="p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-brand-50 transition-colors group">
                <span className="text-2xl sm:text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-brand-700">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section id="admissions" className="py-16 sm:py-20 bg-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Begin Your Child&apos;s Journey
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            Applications are now open for the 2027/2028 academic year. 
            Join our community of learners and discover what makes NLLS special.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-brand-900 bg-accent-400 hover:bg-accent-300 rounded-md transition-colors"
            >
              Apply Online
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-white border-2 border-white/30 hover:border-white/60 rounded-md transition-colors"
            >
              Contact Admissions
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', label: 'Submit Application' },
              { step: '2', label: 'Document Review' },
              { step: '3', label: 'Interview & Assessment' },
              { step: '4', label: 'Enrollment' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-accent-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-accent-300 font-bold text-sm">{item.step}</span>
                </div>
                <p className="text-sm text-blue-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section id="news" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Stay Updated</p>
              <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            </div>
            <Link href="/news" className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700">
              View All News →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Welcome to the 2026/2027 Academic Year',
                date: 'September 15, 2026',
                excerpt: 'We are excited to welcome all our students and families to a new year of learning and growth.',
                category: 'Announcement',
              },
              {
                title: 'Primary Stage Science Fair',
                date: 'October 3, 2026',
                excerpt: 'Our Primary students showcased outstanding scientific projects at the annual Science Fair.',
                category: 'Events',
              },
              {
                title: 'Sports Day Celebrations',
                date: 'October 5, 2026',
                excerpt: 'A day full of athletic achievements, teamwork, and school spirit.',
                category: 'School Life',
              },
            ].map((article) => (
              <article key={article.title} className="border border-gray-200 rounded-lg overflow-hidden hover:border-brand-300 transition-colors group">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-blue">{article.category}</span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-indigo-950/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 uppercase tracking-widest">
              Direct Communication Channel
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
              Get in Touch with NLLS Leadership
            </h2>
            <p className="text-sm text-slate-400">
              Have questions regarding admissions, academic programs, or campus visits? Our admissions team responds within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> School Campus Headquarters
                </h3>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">📍</span>
                    <div>
                      <strong className="block text-white">Campus Location:</strong>
                      <span>90th Street, 5th Settlement, New Cairo, Egypt</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">📞</span>
                    <div>
                      <strong className="block text-white">Direct Phone Lines:</strong>
                      <span className="font-mono text-blue-400 font-bold block">+20 2 2700 8900</span>
                      <span className="font-mono text-blue-400 font-bold block">+20 100 123 4567</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">✉️</span>
                    <div>
                      <strong className="block text-white">Official Inquiry Emails:</strong>
                      <span className="font-mono text-slate-300 block">Admissions: admissions@nlls.edu.eg</span>
                      <span className="font-mono text-slate-300 block">General: info@nlls.edu.eg</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xl">🕐</span>
                    <div>
                      <strong className="block text-white">Working Administration Hours:</strong>
                      <span>Sunday – Thursday: 07:30 AM – 03:30 PM</span>
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
      <footer className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight">New Life</h3>
                  <p className="text-xs text-blue-300">Language School</p>
                </div>
              </div>
              <p className="text-sm text-blue-200 leading-relaxed">
                Providing quality education and building tomorrow&apos;s leaders in Egypt.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-accent-400">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#academics" className="hover:text-white transition-colors">Academics</a></li>
                <li><a href="#admissions" className="hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-accent-400">Academics</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Early Years</li>
                <li>Primary</li>
                <li>Preparatory</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-accent-400">Portal</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="/login" className="hover:text-white transition-colors">Student Login</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Parent Login</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Teacher Login</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-blue-300">
              © 2026 New Life Language School. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/></svg>
              </a>
            </div>
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
