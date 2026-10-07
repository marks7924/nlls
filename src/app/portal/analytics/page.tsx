'use client';

import { useState } from 'react';
import { TrendingUp, Users, Award, School, CheckSquare, BarChart2 } from 'lucide-react';

export default function AnalyticsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-700" />
            Institutional Analytics & Growth Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time enrollment trends, stage pass rates, attendance metrics, and faculty workload insights.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Total Enrolled Students</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-slate-900 font-heading">247</span>
            <Users className="w-7 h-7 text-blue-600" />
          </div>
          <span className="text-xs text-emerald-600 font-bold">↑ +12% from last academic year</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Daily Attendance Rate</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-slate-900 font-heading">96.4%</span>
            <CheckSquare className="w-7 h-7 text-emerald-600" />
          </div>
          <span className="text-xs text-emerald-600 font-bold">High presence benchmark</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Average Exam Pass Rate</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-slate-900 font-heading">91.8%</span>
            <Award className="w-7 h-7 text-yellow-500" />
          </div>
          <span className="text-xs text-blue-600 font-bold">Primary & Preparatory combined</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Active Cohorts</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-slate-900 font-heading">9 Cohorts</span>
            <School className="w-7 h-7 text-purple-600" />
          </div>
          <span className="text-xs text-slate-500">Primary (1–6) & Prep (1–3)</span>
        </div>
      </div>

      {/* Analytics Visual Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-heading">Stage Grade Performance Comparison</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Primary Stage (Grades 1–6)</span>
                <span className="text-blue-700">93.2% Average</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '93.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Preparatory Stage (Grades 1–3)</span>
                <span className="text-amber-700">90.4% Average</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '90.4%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-heading">Subject Standard Mastery</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">English Language & Literature</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">95.1% Mastery</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">Mathematics & Advanced Algebra</span>
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">91.8% Mastery</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">Science & Physics Fundamentals</span>
              <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">93.6% Mastery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
