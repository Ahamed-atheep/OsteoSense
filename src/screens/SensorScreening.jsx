import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { SENSOR_CONFIG } from '../data/mockData';
import {
  Bluetooth,
  Activity,
  Maximize2,
  Footprints,
  Thermometer,
  Volume2,
  Mountain,
  Play,
  CheckCircle2,
  RefreshCw,
  Zap,
  Radio,
  Timer,
  Info,
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const SensorScreening = () => {
  const navigate = useNavigate();
  const {
    language,
    activePatient,
    isBleConnected,
    isScanningBle,
    toggleBle,
    sensorTelemetry,
    walkTestStatus,
    walkTestTimeLeft,
    startWalkTest
  } = useScreening();

  // Map sensor IDs to standard Lucide icons
  const iconMap = {
    imu: Activity,
    goniometer: Maximize2,
    pressure: Footprints,
    thermal: Thermometer,
    acoustic: Volume2,
    barometer: Mountain
  };

  // Get dynamic telemetry value per sensor ID
  const getTelemetryValue = (id) => {
    switch (id) {
      case 'imu':
        return `${sensorTelemetry.angularVelocity} °/s`;
      case 'goniometer':
        return `${sensorTelemetry.rom}° ROM`;
      case 'pressure':
        return `${sensorTelemetry.medialLoad}% Medial / ${100 - sensorTelemetry.medialLoad}% Lat`;
      case 'thermal':
        return `+${sensorTelemetry.thermalDelta}°C Delta`;
      case 'acoustic':
        return `${sensorTelemetry.crepitusEvents} events/min`;
      case 'barometer':
        return `${sensorTelemetry.terrainIndex}x Hill Effort`;
      default:
        return 'Normal';
    }
  };

  return (
    <div className="pb-24 lg:pb-12 pt-2 max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Patient Header Summary Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Patient Telemetry Stream</div>
          <div className="text-lg font-black text-slate-900 font-heading">
            {activePatient.name} ({activePatient.age}y, {activePatient.gender})
          </div>
          <div className="text-xs text-slate-500">
            {activePatient.village} ({activePatient.block}) • {activePatient.occupation}
            {activePatient.campId && ` • Camp: ${activePatient.campId}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-blue-50 text-blue-800 text-xs font-bold rounded-2xl border border-blue-200">
            ID: {activePatient.id}
          </span>
        </div>
      </div>

      {/* BLE Connection Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
          
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div
                className={`w-13 h-13 p-3 rounded-2xl flex items-center justify-center border transition-all ${
                  isBleConnected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-rose-500/20 border-rose-400 text-rose-400'
                }`}
              >
                <Bluetooth className={`w-6 h-6 ${isScanningBle ? 'animate-bounce' : ''}`} />
              </div>
              {isBleConnected && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-ping"></span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bluetooth Status</span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                    isBleConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {isBleConnected ? 'Connected' : 'Disconnected'}
                </span>
                
                {/* Simulated Demo Mode Badge */}
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
                  <Radio className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                  {getTranslation(language, 'demoBadge')}
                </span>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-slate-100 font-heading">
                {isScanningBle
                  ? getTranslation(language, 'bleStatusScanning')
                  : isBleConnected
                  ? getTranslation(language, 'bleStatusConnected')
                  : getTranslation(language, 'bleStatusDisconnected')}
              </h3>
            </div>
          </div>

          <button
            onClick={toggleBle}
            disabled={isScanningBle}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border shadow-md active:scale-95 ${
              isBleConnected
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
                : 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-blue-400 shadow-blue-500/30'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isScanningBle ? 'animate-spin' : ''}`} />
            <span>{isBleConnected ? 'Disconnect Band' : getTranslation(language, 'connectBleBtn')}</span>
          </button>

        </div>
      </div>

      {/* Main 2-Column Responsive Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): 6 Sensor Channels */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-600" />
              {getTranslation(language, 'sensorChecklist')}
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              6/6 Channels Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SENSOR_CONFIG.map((s) => {
              const IconComp = iconMap[s.id] || Activity;
              const liveVal = getTelemetryValue(s.id);
              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Live stream active"></span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-heading">{s.name}</h4>
                    <div className="text-xl font-black text-blue-700 font-heading mt-0.5">{liveVal}</div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{s.desc}</p>
                  </div>

                  <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between font-medium">
                    <span>Baseline: {s.normalRange}</span>
                    <span className="text-emerald-600 font-bold">Streaming ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): 30s Walk Test + Waveform + CTA */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Guided Walk Test Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    {getTranslation(language, 'walkTestTitle')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {getTranslation(language, 'walkTestInstructions')}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-blue-600 font-heading">
                  {walkTestTimeLeft}s
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase">Countdown</div>
              </div>
            </div>

            {/* Live Animated Waveform Graphic */}
            <div className="bg-slate-900 rounded-2xl p-4 relative overflow-hidden border border-slate-800 h-36 flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:12px_100%] opacity-30"></div>
              
              {walkTestStatus === 'running' ? (
                <div className="w-full flex items-center justify-around h-20 gap-1 px-2 z-10">
                  {[40, 65, 30, 85, 95, 45, 60, 100, 70, 50, 90, 40, 75, 80, 55, 35, 90, 45, 60, 70].map((h, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-sky-500 to-blue-300 w-1.5 rounded-full transition-all duration-300 animate-pulse"
                      style={{ height: `${(h * Math.random()) + 20}%` }}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-400 z-10 space-y-1.5 px-4">
                  <Activity className="w-8 h-8 text-sky-400 mx-auto" />
                  <div className="text-xs font-semibold">
                    {walkTestStatus === 'complete' ? '30-Second Walk Test Completed & Telemetry Locked' : 'Press Start button below to record 30s walking cadence'}
                  </div>
                </div>
              )}
            </div>

            {/* Start / Complete Walk Test Button */}
            <button
              onClick={startWalkTest}
              disabled={walkTestStatus === 'running'}
              className={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 min-h-[50px] ${
                walkTestStatus === 'running'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              <Play className={`w-4 h-4 ${walkTestStatus === 'running' ? 'animate-spin' : ''}`} />
              <span>
                {walkTestStatus === 'running'
                  ? getTranslation(language, 'walkTestRunning')
                  : walkTestStatus === 'complete'
                  ? 'Re-run Walk Test'
                  : getTranslation(language, 'startWalkTest')}
              </span>
            </button>
          </div>

          {/* Proceed to Triage Engine CTA */}
          <button
            onClick={() => navigate('/analysis')}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 min-h-[56px]"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>{getTranslation(language, 'proceedToAi')}</span>
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
};
