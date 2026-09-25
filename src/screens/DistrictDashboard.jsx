import React, { useState } from 'react';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { DISTRICT_ANALYTICS } from '../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  Building2,
  Users,
  AlertCircle,
  FileCheck,
  Radio,
  Search,
  Filter,
  CheckCircle,
  PhoneCall,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Lock,
  ShieldCheck
} from 'lucide-react';

export const DistrictDashboard = () => {
  const { language, loadExistingPatient } = useScreening();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlockFilter, setSelectedBlockFilter] = useState('All');

  const filteredCases = DISTRICT_ANALYTICS.highRiskRegistry.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = selectedBlockFilter === 'All' || c.block === selectedBlockFilter;
    return matchesSearch && matchesBlock;
  });

  return (
    <div className="pb-24 lg:pb-12 pt-2 px-4 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-sky-500/20 text-sky-200 text-xs font-bold rounded-full border border-sky-400/40 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-sky-300" />
              {getTranslation(language, 'districtAccessBadge')}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full border border-white/20">
              Kamrup & Ri-Bhoi Clusters
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Northeast India District Medical Surveillance Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 mt-1">
            {getTranslation(language, 'dashTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {getTranslation(language, 'dashSubtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-2xl border border-emerald-500/40 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            89 ASHA Field Workers Active
          </span>
          <span className="px-4 py-2 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-2xl border border-blue-400/40">
            Real-Time Sync Active
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Screened */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Screened</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-heading">
            {DISTRICT_ANALYTICS.summary.totalScreened.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% screening velocity this month
          </div>
        </div>

        {/* High Risk Cases */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">High Risk Cases</span>
            <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-orange-600 font-heading">
            {DISTRICT_ANALYTICS.summary.highRiskCases}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">21.4% overall regional prevalence</div>
        </div>

        {/* Referrals Sent */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialist Referrals</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-600 font-heading">
            {DISTRICT_ANALYTICS.summary.referralsSent}
          </div>
          <div className="text-[11px] text-rose-600 font-bold">Dispatched to GMCH & Civil Hospital</div>
        </div>

        {/* Villages Covered */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Villages Covered</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-heading">
            {DISTRICT_ANALYTICS.summary.villagesCovered}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Across 5 rural Northeast blocks</div>
        </div>

      </div>

      {/* 2-Column Analytics Row: Stacked Bar Chart + Regional Risk Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Risk-by-Block Stacked Bar Chart (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {getTranslation(language, 'riskByBlock')}
              </h3>
              <p className="text-xs text-slate-500">Screening stratification across tea-garden and hill slope blocks</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-center">
              Active Cohort: 1,420
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_ANALYTICS.blockStats} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="block" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="low" name="Low Risk" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="moderate" name="Moderate Risk" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="high" name="High Risk" stackId="a" fill="#ea580c" radius={[0, 0, 0, 0]} />
                <Bar dataKey="refer" name="Referral Required" stackId="a" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Insights & Block Prioritization Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Block Epidemiology Insights
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Automated surveillance signals</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                <span>Mylliem Block (Hill Terrain)</span>
                <span className="px-2 py-0.5 bg-rose-200 text-rose-800 rounded-full text-[10px]">Peak Impact</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                42% of screened tea workers exhibit severe medial compartment load from 25° incline slopes.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Chaygaon Block (Paddy Fields)</span>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-[10px]">Moderate</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Repetitive squatting during paddy transplanting correlates with marked flexion ROM reduction (&lt;95°).
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span>Rani Block Outreach</span>
                <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-full text-[10px]">On Target</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                94% camp attendance after deployment of local Assamese and Bodo audio-guided exercise posters.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>District Health Authority: <strong>Kamrup Metro</strong></span>
            <span className="text-emerald-600 font-bold">● Active Protocol</span>
          </div>
        </div>

      </div>

      {/* High-Risk Case Registry Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              {getTranslation(language, 'recentHighRiskTitle')}
            </h3>
            <p className="text-xs text-slate-500">Patients requiring immediate specialist clinical review</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient / village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedBlockFilter}
              onChange={(e) => setSelectedBlockFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Northeast Blocks</option>
              <option value="Chaygaon">Chaygaon</option>
              <option value="Rani">Rani</option>
              <option value="Hajo">Hajo</option>
              <option value="Mylliem">Mylliem</option>
            </select>
          </div>
        </div>

        {/* Registry Table */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[620px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Patient Demographics</th>
                <th className="py-3 px-4">Cluster / Block</th>
                <th className="py-3 px-4">Stratified Risk</th>
                <th className="py-3 px-4">Assigned ASHA Worker</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400">ID: {c.id}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{c.village}</div>
                    <div className="text-[10px] text-slate-400">{c.block} Block</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold ${
                        c.band === 'Refer'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}
                    >
                      {c.score}/100 • {c.band}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-900 font-bold">{c.asha}</div>
                    <div className="text-[10px] text-slate-400">{c.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Initiating direct phone dispatch to ASHA ${c.asha} (${c.phone}) for ${c.name}`)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-end gap-1.5 ml-auto cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Dispatch Alert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
