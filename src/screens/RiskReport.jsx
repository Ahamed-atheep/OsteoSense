import React, { useState, useEffect } from 'react';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { KneeJoint3D } from '../components/3d/KneeJoint3D';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Share2,
  Send,
  Download,
  Info,
  Activity,
  HeartPulse,
  TrendingDown,
  Sparkles,
  ShieldAlert,
  Dumbbell,
  Clock,
  MapPin,
  Check,
  Apple,
  Footprints
} from 'lucide-react';

export const RiskReport = () => {
  const { language, activePatient, riskAssessment, sensorTelemetry } = useScreening();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralSent, setReferralSent] = useState(false);
  const [showPdfSuccess, setShowPdfSuccess] = useState(false);

  useEffect(() => {
    // Fire confetti on load for clean report creation
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  // Determine risk band badge style (STRICTLY PRESERVED CLINICAL TOKENS)
  const getRiskBadgeStyle = (score) => {
    if (score >= 85) return { bg: 'bg-rose-500', text: 'text-white', border: 'border-rose-600', band: 'Refer to District Hospital', gradient: 'from-rose-600 to-red-700' };
    if (score >= 65) return { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600', band: 'High Risk', gradient: 'from-rose-500 via-orange-500 to-amber-500' };
    if (score >= 35) return { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600', band: 'Moderate Risk', gradient: 'from-amber-500 to-yellow-500' };
    return { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600', band: 'Low Risk', gradient: 'from-emerald-500 to-teal-600' };
  };

  const badgeStyle = getRiskBadgeStyle(riskAssessment.score);

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `*OsteoSense Field Report*\n` +
      `Patient: ${activePatient.name} (${activePatient.age}y, ${activePatient.gender})\n` +
      `Village: ${activePatient.village} (${activePatient.block})\n` +
      `Camp ID: ${activePatient.campId || 'Outreach'}\n` +
      `Pain Score: ${activePatient.painIntensity !== undefined ? activePatient.painIntensity : 'N/A'}/10\n` +
      `Risk Score: ${riskAssessment.score}/100 (${badgeStyle.band})\n` +
      `Flexion ROM: ${sensorTelemetry.rom}° | Thermal ΔT: +${sensorTelemetry.thermalDelta}°C\n` +
      `Medial Pressure: ${sensorTelemetry.medialLoad}%\n` +
      `Screened by ASHA Sunita Deka`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDownloadPdf = () => {
    setShowPdfSuccess(true);
    setTimeout(() => setShowPdfSuccess(false), 3000);
  };

  return (
    <div className="pb-24 lg:pb-12 pt-2 px-4 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
      
      {/* Patient Header Summary Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Clinical Triage Summary</div>
          <div className="text-xl font-extrabold text-slate-900 font-heading mt-0.5">
            {activePatient.name} ({activePatient.age}y, {activePatient.gender})
          </div>
          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
            <span>Location: <strong className="text-slate-700">{activePatient.village}</strong> ({activePatient.block})</span>
            <span>•</span>
            <span>Occupation: <strong className="text-slate-700">{activePatient.occupation}</strong></span>
            {activePatient.campId && (
              <>
                <span>•</span>
                <span>Camp: <strong className="text-slate-700">{activePatient.campId}</strong></span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1.5 bg-blue-50 text-blue-800 text-xs font-bold rounded-xl border border-blue-200 shadow-xs">
            ID: {activePatient.id}
          </span>
          <button
            onClick={handleDownloadPdf}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export Summary</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Desktop Clinical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (lg:col-span-6): Score Card, 3D Joint, Care & Nutrition Guidelines */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Color-Coded Risk Score Card (Preserved Clinical Colors) */}
          <div className={`bg-gradient-to-r ${badgeStyle.gradient} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden space-y-4`}>
            <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/90 bg-black/20 px-3 py-1 rounded-full border border-white/20">
                  {getTranslation(language, 'riskScore')}
                </span>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-6xl font-extrabold font-heading tracking-tight leading-none">
                    {riskAssessment.score}
                  </span>
                  <span className="text-2xl font-bold text-white/80">/ 100</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-sm font-extrabold border border-white/40 shadow-inner">
                  {badgeStyle.band}
                </span>
                <div className="text-[11px] text-white/80 mt-1 font-medium">Screening Triage Band</div>
              </div>
            </div>

            {/* Clinical Disclaimer Note (No radiographic KL claims!) */}
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-xs text-white leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-200 shrink-0 mt-0.5" />
              <span>{getTranslation(language, 'noDiagnosisClaimNote')}</span>
            </div>
          </div>

          {/* Static 3D Knee Joint Model Space */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'interactive3dTitle')}
              </h3>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Medial Stress Heatmap
              </span>
            </div>

            <KneeJoint3D medialLoad={sensorTelemetry.medialLoad} thermalDelta={sensorTelemetry.thermalDelta} />

            <p className="text-[11px] text-slate-500 px-1 leading-relaxed">
              {getTranslation(language, 'interactive3dNote')}
            </p>
          </div>

          {/* ASHA Community Care Guidelines */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-blue-600" />
              {getTranslation(language, 'ashaGuidanceTitle')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>🧘</span> Isometric Quad Strengthening
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Tighten thigh muscle for 10s while seated, 15 reps twice daily before field labor.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-200 text-xs space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <span>🔥</span> Warm Compress & Warm-Up
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Apply warm moist cloth 15 min morning before tea garden or paddy harvesting.
                </p>
              </div>
            </div>
          </div>

          {/* Nutrition & Lifestyle Guidance Card Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Apple className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'nutritionCareTitle')}
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Regional Nutrition
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🥗</span> Moringa & Curcumin Decoction
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Consume drumstick leaves (sajna) and warm turmeric milk weekly to lower joint inflammation and replenish natural calcium.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🦯</span> Bamboo Staff on Hill Slopes
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Use a walking pole during slope descent to relieve up to 25% of downhill impact torque on the medial compartment.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (lg:col-span-6): Contributing Factors, Recharts Trend, Referral Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Primary Contributing Risk Factors */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                {getTranslation(language, 'contributingFactors')}
              </h3>
              <span className="text-xs text-slate-500 font-medium">Ranked by Model Weight</span>
            </div>

            <div className="space-y-2.5">
              {riskAssessment.contributingFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-blue-50/30 transition-colors flex items-center justify-between text-xs font-bold text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                      {idx + 1}
                    </span>
                    <span>{factor.text}</span>
                  </div>
                  <span className="text-[10px] text-blue-700 bg-blue-100/90 px-2.5 py-0.5 rounded-full font-bold shrink-0">
                    High Impact
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Trend Chart (Recharts) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  {getTranslation(language, 'visitHistoryTitle')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Progression across screening checkups</p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                3 Visits Recorded
              </span>
            </div>

            <div className="h-52 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskAssessment.visits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#ea580c" strokeWidth={3} name="Risk Score" dot={{ r: 5, fill: '#ea580c' }} />
                  <Line type="monotone" dataKey="rom" stroke="#10b981" strokeWidth={2} name="Flexion ROM (°)" dot={{ r: 4, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons: Referral, PDF, WhatsApp */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Clinical Follow-Up Actions
            </h3>
            
            {/* Referral Flag Button */}
            <button
              onClick={() => setShowReferralModal(true)}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-98 min-h-[52px] cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>{getTranslation(language, 'referralBtn')}</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Share */}
              <button
                onClick={handleShareWhatsapp}
                className="py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[48px] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{getTranslation(language, 'whatsappBtn')}</span>
              </button>

              {/* PDF Download */}
              <button
                onClick={handleDownloadPdf}
                className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[48px] cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>{getTranslation(language, 'exportPdfBtn')}</span>
              </button>
            </div>

            {showPdfSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 animate-bounce">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>PDF Summary Generated & Saved to Local Storage!</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Referral Voucher Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 font-heading">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Specialist Referral Voucher
              </h3>
              <button
                onClick={() => setShowReferralModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {referralSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 font-heading">
                  Referral Voucher Dispatched!
                </h4>
                <p className="text-xs text-slate-600">
                  Referral code <strong className="text-rose-600">REF-KM-8821</strong> sent to District Civil Hospital Orthopedics OPD queue.
                </p>
                <button
                  onClick={() => {
                    setReferralSent(false);
                    setShowReferralModal(false);
                  }}
                  className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Close Modal
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900">Destination Facility:</div>
                  <div className="text-slate-700 font-semibold">Gauhati Medical College & Hospital (GMCH) / Kamrup District Civil Hospital</div>
                  <div className="text-slate-500 text-[11px]">Recommended Priority: Within 7 Days</div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700">ASHA Referral Reason Note:</label>
                  <textarea
                    rows={3}
                    defaultValue={`High biomechanical joint risk (Score ${riskAssessment.score}/100) with severe flexion deficit (${sensorTelemetry.rom}°), active thermal delta (+${sensorTelemetry.thermalDelta}°C), and medial load concentration.`}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-xs focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button
                  onClick={() => setReferralSent(true)}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Official Referral Voucher</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
