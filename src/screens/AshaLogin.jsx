import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { CACHED_ASHA_WORKERS } from '../data/mockData';
import {
  ShieldCheck,
  UserCheck,
  KeyRound,
  ChevronRight,
  WifiOff,
  AlertCircle,
  Building2,
  Sparkles,
  Info,
  CheckCircle2,
  Stethoscope,
  Activity,
  HeartPulse,
  Radio,
  MapPin,
  Users,
  Maximize2,
  Footprints,
  Thermometer,
  Volume2,
  Mountain,
  Award
} from 'lucide-react';

export const AshaLogin = () => {
  const navigate = useNavigate();
  const { language, loginAsha, activeAsha } = useScreening();

  const [workerId, setWorkerId] = useState(activeAsha?.id || 'ASHA-KAM-04');
  const [pin, setPin] = useState(activeAsha?.pin || '1234');
  const [error, setError] = useState('');
  const [successWorker, setSuccessWorker] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = loginAsha(workerId, pin);
    if (res.success) {
      setSuccessWorker(res.worker);
      setTimeout(() => {
        navigate('/register');
      }, 500);
    } else {
      setError(getTranslation(language, 'invalidLogin'));
    }
  };

  const handleSelectDemoWorker = (worker) => {
    setWorkerId(worker.id);
    setPin(worker.pin);
    setError('');
  };

  return (
    <div className="pb-24 lg:pb-12 pt-2 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider text-sky-100 border border-white/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-200" />
                Smart India Hackathon • SIH 004
              </span>
              <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-300/40 text-xs font-bold rounded-full flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
                Offline-Ready Field Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight leading-tight">
              AI & Rule-Based Knee Health Screening for Rural Northeast India
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
              Equipping Accredited Social Health Activists (ASHA) with wearable biomechanical sensing and on-device risk triage to detect Osteoarthritis in tea gardens, farming valleys, and hill communities.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="text-xl font-black font-heading text-white">1,482+</div>
              <div className="text-[10px] text-sky-200 font-semibold uppercase">Screened</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="text-xl font-black font-heading text-white">46</div>
              <div className="text-[10px] text-sky-200 font-semibold uppercase">Villages</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="text-xl font-black font-heading text-white">89</div>
              <div className="text-[10px] text-sky-200 font-semibold uppercase">Active ASHAs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="text-xl font-black font-heading text-emerald-300">100%</div>
              <div className="text-[10px] text-sky-200 font-semibold uppercase">On-Device</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split Portal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Technology Pillars & Livelihood Focus */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Multimodal 6-Channel Wearable Biomechanical Sensing
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Synchronized Bluetooth Low Energy (BLE) wearable sleeve delivering laboratory-grade kinematics directly in village sub-centres.
            </p>
          </div>

          {/* 6 Sensor Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Maximize2, title: 'Flexible Goniometer', desc: 'Active Flexion ROM', normal: '> 120° normal' },
              { icon: Activity, title: 'IMU Accelerometer', desc: 'Limb Angular Velocity', normal: '200–280 °/s' },
              { icon: Footprints, title: '5-Point Pressure Array', desc: 'Medial Varus Load Ratio', normal: '50% / 50% balance' },
              { icon: Thermometer, title: 'Differential Thermometry', desc: 'Joint Capsule Heat ΔT', normal: '< 0.5°C normal' },
              { icon: Volume2, title: 'Piezo Acoustic Mic', desc: 'Articular Crepitus Bursts', normal: '< 3 events/min' },
              { icon: Mountain, title: 'Slope Inclinometer', desc: 'Hill Climbing Strain', normal: 'Terrain factor' },
            ].map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-1 hover:border-blue-300 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                  <div className="text-[11px] font-semibold text-blue-700">{s.desc}</div>
                  <div className="text-[10px] text-slate-400">{s.normal}</div>
                </div>
              );
            })}
          </div>

          {/* Livelihoods Highlight Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Tailored for Northeast Rural Livelihoods
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-lg block mb-0.5">🍃</span>
                <span className="font-bold text-slate-800">Tea Garden</span>
                <span className="text-[10px] text-slate-500 block">Kneeling strain</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-lg block mb-0.5">🌾</span>
                <span className="font-bold text-slate-800">Paddy Farmer</span>
                <span className="text-[10px] text-slate-500 block">Mud suction</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-lg block mb-0.5">🧵</span>
                <span className="font-bold text-slate-800">Handloom</span>
                <span className="text-[10px] text-slate-500 block">Pedal flexion</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-lg block mb-0.5">🎒</span>
                <span className="font-bold text-slate-800">Hill Porter</span>
                <span className="text-[10px] text-slate-500 block">Slope torque</span>
              </div>
            </div>
          </div>

          {/* Direct Hospital Referral Integration */}
          <div className="bg-blue-50/70 rounded-3xl p-5 border border-blue-200 flex items-start gap-3 text-xs">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-blue-950 font-heading">
                Connected to Gauhati Medical College & Hospital (GMCH)
              </h4>
              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                When patients score 85+ (Referral Required), OA Sentinel automatically formats and generates official digital referral vouchers directly to the District Civil Hospital & GMCH Orthopedics OPD queue.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Sleek ASHA Login Portal */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-200 space-y-5 relative">
            
            {/* Login Card Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                    {getTranslation(language, 'loginTitle')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {getTranslation(language, 'loginSubtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Worker ID Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    {getTranslation(language, 'workerId')} *
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Official NHM Registry ID
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={workerId}
                  onChange={(e) => {
                    setWorkerId(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g., ASHA-KAM-04"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[48px]"
                />
              </div>

              {/* Security PIN Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-blue-600" />
                    {getTranslation(language, 'workerPin')} *
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    4-Digit Field PIN
                  </span>
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  placeholder="••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-base tracking-widest font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[48px]"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Banner */}
              {successWorker && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Welcome, {successWorker.name}! Loading screening portal...</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 min-h-[52px]"
              >
                <span>{getTranslation(language, 'loginBtn')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Demo Worker Credentials Picker */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  {getTranslation(language, 'demoCredentials')}
                </span>
                <span className="text-[10px] text-slate-400">Offline cached</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CACHED_ASHA_WORKERS.map((worker) => (
                  <button
                    key={worker.id}
                    type="button"
                    onClick={() => handleSelectDemoWorker(worker)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      workerId === worker.id
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold ring-1 ring-blue-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">{worker.name}</div>
                      <div className="text-[10px] text-slate-500">{worker.id} • {worker.block}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                      PIN: {worker.pin}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Security / Privacy Footnote */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Sessions are validated against on-device cryptographic cache. No internet connection is required to authenticate or perform village screening batches.
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
