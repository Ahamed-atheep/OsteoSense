import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { BLOCKS_AND_VILLAGES, OCCUPATIONS, PREVIOUS_PATIENTS } from '../data/mockData';
import {
  User,
  MapPin,
  Briefcase,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FolderOpen,
  Sparkles,
  HeartPulse,
  Sun,
  Flame,
  Lock,
  Mountain,
  Building2,
  Activity,
  Smile,
  Meh,
  Frown,
  Stethoscope,
  Clock
} from 'lucide-react';

export const PatientRegistration = () => {
  const navigate = useNavigate();
  const { language, activePatient, setActivePatient, loadExistingPatient, activeAsha } = useScreening();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleComplaintToggle = (key) => {
    setActivePatient((prev) => ({
      ...prev,
      complaints: {
        ...prev.complaints,
        [key]: !prev.complaints[key]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/sensor');
  };

  return (
    <div className="pb-24 lg:pb-12 pt-2 max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* ASHA Field Worker Welcome Card */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-sky-700 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-13 h-13 p-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/40 shadow-inner">
            👩‍⚕️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                {activeAsha?.block || 'Kamrup Rural Block'} • {activeAsha?.post || 'Post #4'}
              </span>
              <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-300/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white mt-0.5">
              Namaste, ASHA {activeAsha?.name || 'Sunita Deka'}
            </h2>
            <p className="text-xs text-sky-100/90 font-medium">
              Registered Health Worker ID: <strong className="text-white">{activeAsha?.id || 'ASHA-KAM-04'}</strong> • Phone: {activeAsha?.phone || '+91 98640 12345'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDrawer(true)}
          className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-white z-10 shrink-0"
        >
          <FolderOpen className="w-4 h-4 text-sky-200" />
          <span>Quick Load Past Villager</span>
        </button>
      </div>

      {/* Main Registration Form — 2-Column Responsive Desktop Grid */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Demographics, Camp ID, Occupation */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-6">
            
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-heading flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {getTranslation(language, 'regTitle')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {getTranslation(language, 'regSubtitle')}
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-extrabold rounded-full border border-blue-200">
                Patient ID: {activePatient.id}
              </span>
            </div>

            {/* Name & Age Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Patient Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  {getTranslation(language, 'patientName')} *
                </label>
                <input
                  type="text"
                  required
                  value={activePatient.name}
                  onChange={(e) => setActivePatient({ ...activePatient, name: e.target.value })}
                  placeholder={getTranslation(language, 'patientNamePlaceholder')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[48px]"
                />
              </div>

              {/* Age Slider & Readout */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {getTranslation(language, 'age')} *
                  </label>
                  <span className="text-base font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {activePatient.age} yrs
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="90"
                  value={activePatient.age}
                  onChange={(e) => setActivePatient({ ...activePatient, age: parseInt(e.target.value) })}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>18 yrs</span>
                  <span>45 yrs</span>
                  <span>70+ yrs</span>
                </div>
              </div>

            </div>

            {/* Gender Select Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'gender')} *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Female', 'Male', 'Other'].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setActivePatient({ ...activePatient, gender: g })}
                    className={`py-3 px-2 sm:px-4 rounded-2xl text-[11px] sm:text-xs font-bold border transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[48px] ${
                      activePatient.gender === g
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50/50'
                    }`}
                  >
                    <span>{g === 'Female' ? '👩' : g === 'Male' ? '👨' : '🧑'}</span>
                    <span>{g}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Village & Outreach Camp / Session ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {getTranslation(language, 'village')} *
                </label>
                <select
                  value={`${activePatient.block} | ${activePatient.village}`}
                  onChange={(e) => {
                    const [b, v] = e.target.value.split(' | ');
                    setActivePatient({ ...activePatient, block: b, village: v });
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
                >
                  {BLOCKS_AND_VILLAGES.map((bv, idx) => (
                    <option key={idx} value={`${bv.block} | ${bv.village}`}>
                      {bv.village} ({bv.block}, {bv.district})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  {getTranslation(language, 'campId')}
                </label>
                <input
                  type="text"
                  value={activePatient.campId || ''}
                  onChange={(e) => setActivePatient({ ...activePatient, campId: e.target.value })}
                  placeholder={getTranslation(language, 'campIdPlaceholder')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[48px]"
                />
              </div>

            </div>

            {/* Rural Livelihood / Occupation Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'occupation')} *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {OCCUPATIONS.map((occ) => (
                  <button
                    type="button"
                    key={occ.id}
                    onClick={() => setActivePatient({ ...activePatient, occupation: occ.label })}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-start gap-2.5 min-h-[56px] ${
                      activePatient.occupation === occ.label
                        ? 'bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/30 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{occ.icon}</span>
                    <div>
                      <div className="text-xs font-bold leading-tight">{occ.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">{occ.burden}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Pain Scale, Complaints, Quick History */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 0–10 Pain-Intensity Visual Analogue Slider Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  {getTranslation(language, 'painIntensity')}
                </label>
                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
                    (activePatient.painIntensity || 0) >= 7
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : (activePatient.painIntensity || 0) >= 4
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {activePatient.painIntensity !== undefined ? activePatient.painIntensity : 5} / 10
                </span>
              </div>

              <div className="text-center py-1">
                <div className="text-2xl mb-1">
                  {activePatient.painIntensity === 0
                    ? '😊'
                    : activePatient.painIntensity <= 3
                    ? '🙂'
                    : activePatient.painIntensity <= 6
                    ? '😐'
                    : activePatient.painIntensity <= 8
                    ? '😣'
                    : '😭'}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {activePatient.painIntensity === 0
                    ? 'No Pain (Zero Restriction)'
                    : activePatient.painIntensity <= 3
                    ? 'Mild Pain (Noticeable discomfort)'
                    : activePatient.painIntensity <= 6
                    ? 'Moderate Pain (Interferes with labor)'
                    : activePatient.painIntensity <= 8
                    ? 'Severe Pain (Difficult to walk)'
                    : 'Worst Possible Pain (Immobilized)'}
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={activePatient.painIntensity !== undefined ? activePatient.painIntensity : 5}
                onChange={(e) => setActivePatient({ ...activePatient, painIntensity: parseInt(e.target.value) })}
                className="w-full accent-blue-600 h-2.5 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                <span>0 (No Pain)</span>
                <span>5 (Moderate)</span>
                <span>10 (Severe)</span>
              </div>
            </div>

            {/* Previous Knee Complaints Checklist */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'kneeComplaints')}
              </label>

              <div className="space-y-2.5">
                {[
                  { key: 'morningStiffness', labelKey: 'morningStiffness', icon: Sun, color: 'text-amber-500' },
                  { key: 'swelling', labelKey: 'swelling', icon: Flame, color: 'text-rose-500' },
                  { key: 'locking', labelKey: 'locking', icon: Lock, color: 'text-purple-500' },
                  { key: 'slopePain', labelKey: 'slopePain', icon: Mountain, color: 'text-emerald-500' },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isChecked = activePatient.complaints[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleComplaintToggle(item.key)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                        isChecked
                          ? 'bg-rose-50/80 border-rose-300 text-rose-950 font-bold shadow-sm'
                          : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs">{getTranslation(language, item.labelKey)}</span>
                      </div>
                      <div
                        className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                          isChecked ? 'bg-rose-500 justify-end' : 'bg-slate-300 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Past Villagers Card Preview */}
            <div className="bg-blue-50/50 rounded-3xl p-5 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                  Recent Village Screenings
                </span>
                <button
                  type="button"
                  onClick={() => setShowDrawer(true)}
                  className="text-[11px] font-bold text-blue-600 hover:underline"
                >
                  View All ({PREVIOUS_PATIENTS.length})
                </button>
              </div>
              <div className="space-y-1.5">
                {PREVIOUS_PATIENTS.slice(0, 2).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => loadExistingPatient(p)}
                    className="p-2.5 rounded-xl bg-white border border-blue-100 hover:border-blue-400 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-500">{p.village} • {p.occupation}</div>
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                      {p.riskScore}/100 Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Full-Width Submit CTA Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 min-h-[56px]"
        >
          <span>{getTranslation(language, 'startScreeningBtn')}</span>
          <ChevronRight className="w-5 h-5" />
        </button>

      </form>

      {/* Past Patients Drawer / Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 font-heading">
                <FolderOpen className="w-5 h-5 text-blue-600" />
                {getTranslation(language, 'selectPatient')}
              </h3>
              <button
                onClick={() => setShowDrawer(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {PREVIOUS_PATIENTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    loadExistingPatient(p);
                    setShowDrawer(false);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                        {p.age}y • {p.gender}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {p.village} ({p.occupation})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                      {p.riskScore}/100 Risk
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium">Click to load</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
