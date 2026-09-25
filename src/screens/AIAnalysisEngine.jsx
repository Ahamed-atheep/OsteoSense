import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import {
  SlidersHorizontal,
  Cpu,
  CheckCircle2,
  Maximize2,
  Activity,
  Footprints,
  Thermometer,
  Volume2,
  Mountain,
  ChevronRight,
  Sparkles,
  BarChart3,
  Radio
} from 'lucide-react';

export const AIAnalysisEngine = () => {
  const navigate = useNavigate();
  const { language, activePatient, sensorTelemetry, aiState, aiStep, runAiAnalysis, isBleConnected } = useScreening();

  // Auto-start analysis if idle
  useEffect(() => {
    if (aiState === 'idle') {
      runAiAnalysis();
    }
  }, []);

  const featureCards = [
    {
      id: 'rom',
      title: 'Range of Motion (ROM)',
      value: `${sensorTelemetry.rom}°`,
      status: 'Reduced Flexion',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      progress: 68,
      icon: Maximize2,
      normal: 'Normal: >120°'
    },
    {
      id: 'vel',
      title: 'Max Angular Velocity',
      value: `${sensorTelemetry.angularVelocity} °/s`,
      status: 'Moderate Slowing',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      progress: 62,
      icon: Activity,
      normal: 'Normal: 240 °/s'
    },
    {
      id: 'pressure',
      title: 'Pressure Asymmetry',
      value: `${sensorTelemetry.medialLoad}% Medial`,
      status: 'High Varus Load',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      progress: 82,
      icon: Footprints,
      normal: 'Normal: 50% / 50%'
    },
    {
      id: 'thermal',
      title: 'Thermal Differential (ΔT)',
      value: `+${sensorTelemetry.thermalDelta}°C`,
      status: 'Active Inflammation',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      progress: 75,
      icon: Thermometer,
      normal: 'Normal: <0.5°C'
    },
    {
      id: 'crepitus',
      title: 'Joint Crepitus Audio',
      value: `${sensorTelemetry.crepitusEvents} events/min`,
      status: 'Frequent Sound Spikes',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      progress: 70,
      icon: Volume2,
      normal: 'Normal: <3 events'
    },
    {
      id: 'terrain',
      title: 'Rural Terrain Context',
      value: `${sensorTelemetry.terrainIndex}x Strain`,
      status: 'Hilly Unpaved Slope',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      progress: 65,
      icon: Mountain,
      normal: 'Flat Paved: 1.0x'
    }
  ];

  return (
    <div className="pb-24 lg:pb-12 pt-2 px-4 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Deterministic Triage Engine</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-700 border border-amber-400/30 flex items-center gap-1.5">
              <Radio className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
              {getTranslation(language, 'demoBadge')}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Edge AI v2.4 (Offline Model)
            </span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-heading mt-1">
            {getTranslation(language, 'aiTitle')}
          </div>
          <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
            <span>Subject: <strong className="text-slate-700">{activePatient.name}</strong> ({activePatient.age}y, {activePatient.gender})</span>
            <span>•</span>
            <span>Village: <strong className="text-slate-700">{activePatient.village}</strong></span>
            {activePatient.campId && (
              <>
                <span>•</span>
                <span>Camp: <strong className="text-slate-700">{activePatient.campId}</strong></span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Analysis State</div>
            <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {aiState === 'ready' ? 'Computation Complete' : 'Active Feature Extraction'}
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 shadow-sm shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Neural Radar Scanner & Progress Timeline (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-700 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Pulsing Radar Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center my-2">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border border-sky-400/40 radar-sweep"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/50 z-10 border border-white/20">
                <Cpu className="w-9 h-9 text-white animate-pulse" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-heading text-slate-100 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                {getTranslation(language, 'processingTelemetry')}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                {getTranslation(language, 'aiSubtitle')}
              </p>
            </div>

            {/* Step-by-Step Progress Timeline */}
            <div className="w-full bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 text-left space-y-2.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Edge Pipeline Stages
              </div>
              {[
                getTranslation(language, 'step1'),
                getTranslation(language, 'step2'),
                getTranslation(language, 'step3'),
                getTranslation(language, 'step4'),
              ].map((stepText, idx) => {
                const isDone = aiStep > idx + 1 || aiState === 'ready';
                const isCurrent = aiStep === idx + 1 && aiState === 'processing';
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs font-semibold p-1.5 rounded-lg transition-colors">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin shrink-0"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0"></div>
                    )}
                    <span className={isDone ? 'text-slate-200' : isCurrent ? 'text-sky-300 font-bold' : 'text-slate-500'}>
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Hardware Inference Specs */}
            <div className="w-full grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-700/60">
              <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-bold">Latency</div>
                <div className="text-xs font-extrabold text-sky-300">18.4 ms / sample</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-bold">Model Size</div>
                <div className="text-xs font-extrabold text-sky-300">1.8 MB (INT8 Quant)</div>
              </div>
            </div>

          </div>

          {/* Model Credibility Note */}
          <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-200/80 text-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>🛡️</span> Zero Cloud Dependence Guarantee
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              In accordance with rural healthcare mandates, all ML matrices and kinematic feature transformations execute strictly in-memory on the local browser client without transmitting PHI over cellular networks.
            </p>
          </div>

        </div>

        {/* Right Column: Extracted Biomarkers & CTAs (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Extracted Biomechanical & Thermal Biomarkers
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Calculated in real-time from IMU, FSR and acoustic transducers</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hidden sm:inline-block">
                6 Multi-Modal Channels
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {featureCards.map((fc) => {
                const IconComp = fc.icon;
                return (
                  <div
                    key={fc.id}
                    className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5 hover:shadow-md hover:bg-white transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 font-heading">{fc.title}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{fc.normal}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border whitespace-nowrap ${fc.statusColor}`}>
                        {fc.status}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xl font-extrabold text-slate-900 font-heading">{fc.value}</span>
                      <span className="text-xs font-bold text-blue-700">{fc.progress}% Risk Contribution</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-1000"
                        style={{ width: `${fc.progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={() => navigate('/report')}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 min-h-[54px] cursor-pointer"
              >
                <span>{getTranslation(language, 'aiReadyBtn')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
