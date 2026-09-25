import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Eye, Sparkles, Thermometer, Footprints } from 'lucide-react';

export const KneeJoint3D = ({ medialLoad = 68, thermalDelta = 1.6, selectedZone = 'medial' }) => {
  const [rotationAngle, setRotationAngle] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activePreset, setActivePreset] = useState('front');
  const [showHeatmap, setShowHeatmap] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = currentX - startX;
    setRotationAngle(prev => (prev + delta * 0.5) % 360);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const setViewPreset = (preset) => {
    setActivePreset(preset);
    if (preset === 'front') setRotationAngle(0);
    if (preset === 'medial') setRotationAngle(45);
    if (preset === 'lateral') setRotationAngle(-45);
  };

  // Determine heatmap color based on load & thermal telemetry
  const medialGlow = medialLoad > 65 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(245, 158, 11, 0.7)';
  const lateralGlow = (100 - medialLoad) > 40 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(16, 185, 129, 0.5)';

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-xl border border-slate-700 relative overflow-hidden select-none">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 font-heading">Static 3D Joint Model</h4>
            <p className="text-[11px] text-slate-400">Sensor Heatmap & Load Overlay</p>
          </div>
        </div>

        {/* Heatmap Toggle */}
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`px-2.5 py-1 text-xs rounded-full border font-medium transition-all flex items-center gap-1.5 ${
            showHeatmap
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${showHeatmap ? 'bg-rose-400 animate-pulse' : 'bg-slate-500'}`}></div>
          {showHeatmap ? 'Heatmap On' : 'Heatmap Off'}
        </button>
      </div>

      {/* 3D Canvas / Interactive SVG Renderer */}
      <div
        className="h-64 w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing py-2"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Helper Drag Hint */}
        <div className="absolute top-2 left-2 flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 pointer-events-none">
          <RotateCw className="w-3 h-3 text-orange-400 animate-spin-slow" />
          <span>Drag to rotate 360°</span>
        </div>

        {/* Telemetry Pill Overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-[11px] text-slate-300 flex items-center gap-1.5">
            <Footprints className="w-3.5 h-3.5 text-orange-400" />
            <span>Medial: <strong className="text-orange-400">{medialLoad}%</strong> load</span>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-[11px] text-slate-300 flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>ΔT: <strong className="text-rose-400">+{thermalDelta}°C</strong></span>
          </div>
        </div>

        {/* Static Anatomical 3D Mesh Visualization (SVG-based 3D transform projection) */}
        <div
          className="transition-transform duration-75 ease-out flex items-center justify-center"
          style={{ transform: `rotateY(${rotationAngle}deg) rotateX(5deg)` }}
        >
          <svg viewBox="0 0 200 240" className="w-52 h-60 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] overflow-visible">
            <defs>
              {/* Bone Shading Gradient */}
              <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Medial Hotspot Radial Glow */}
              <radialGradient id="medialGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={medialGlow} />
                <stop offset="70%" stopColor="rgba(239,68,68,0.3)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0)" />
              </radialGradient>

              {/* Lateral Hotspot Radial Glow */}
              <radialGradient id="lateralGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={lateralGlow} />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </radialGradient>
            </defs>

            {/* FEMUR (Distal End - Top Bone) */}
            <g id="femur" className="transition-all">
              <path
                d="M 70 10 L 70 90 Q 70 115 50 120 Q 30 115 35 90 Q 40 60 40 10 Z"
                fill="url(#boneGrad)"
                stroke="#64748b"
                strokeWidth="2"
              />
              <path
                d="M 130 10 L 130 90 Q 130 115 150 120 Q 170 115 165 90 Q 160 60 160 10 Z"
                fill="url(#boneGrad)"
                stroke="#64748b"
                strokeWidth="2"
              />
              {/* Femoral Condyles Join */}
              <path
                d="M 40 10 L 160 10 L 150 85 Q 100 105 50 85 Z"
                fill="url(#boneGrad)"
                stroke="#64748b"
                strokeWidth="2"
              />
            </g>

            {/* ARTICULAR CARTILAGE LAYER (Static Geometry - No deformation) */}
            <path
              d="M 38 112 C 45 125, 75 125, 85 115 C 95 110, 105 110, 115 115 C 125 125, 155 125, 162 112 C 150 130, 50 130, 38 112 Z"
              fill="#38bdf8"
              opacity="0.85"
              stroke="#0284c7"
              strokeWidth="1.5"
            />

            {/* TIBIA & FIBULA (Proximal End - Bottom Bones) */}
            <g id="tibia">
              {/* Tibial Plateau */}
              <path
                d="M 32 135 Q 100 125 168 135 L 160 155 Q 100 160 40 155 Z"
                fill="url(#boneGrad)"
                stroke="#64748b"
                strokeWidth="2"
              />
              {/* Tibial Shaft */}
              <path
                d="M 60 155 L 65 230 L 135 230 L 140 155 Z"
                fill="url(#boneGrad)"
                stroke="#64748b"
                strokeWidth="2"
              />
              {/* Fibula (Lateral side) */}
              <path
                d="M 162 150 L 175 160 L 168 230 L 156 230 Z"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="1.5"
              />
            </g>

            {/* PATELLA (Knee Cap Overlay) */}
            <path
              d="M 82 85 Q 100 70 118 85 Q 122 105 100 120 Q 78 105 82 85 Z"
              fill="#f1f5f9"
              opacity="0.9"
              stroke="#94a3b8"
              strokeWidth="2"
              filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"
            />

            {/* SENSOR HEATMAP GLOW OVERLAYS (Color/Glow Intensity Only - Static Mesh) */}
            {showHeatmap && (
              <g id="heatmap-overlays">
                {/* Medial Compartment Load Hotspot (Left Side on SVG) */}
                <circle
                  cx="58"
                  cy="120"
                  r={32 + (medialLoad > 65 ? 8 : 0)}
                  fill="url(#medialGlowGrad)"
                  className="animate-pulse"
                />
                <circle
                  cx="58"
                  cy="120"
                  r="6"
                  fill="#ef4444"
                  className="animate-ping"
                />

                {/* Lateral Compartment Load Hotspot (Right Side on SVG) */}
                <circle
                  cx="142"
                  cy="120"
                  r="26"
                  fill="url(#lateralGlowGrad)"
                />
                <circle
                  cx="142"
                  cy="120"
                  r="4"
                  fill="#10b981"
                />

                {/* Hotspot Labels */}
                <text x="35" y="105" fill="#f87171" fontSize="10" fontWeight="bold">Medial ({medialLoad}%)</text>
                <text x="125" y="105" fill="#34d399" fontSize="10" fontWeight="bold">Lateral ({100 - medialLoad}%)</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Preset View Controls */}
      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
        <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
          <Eye className="w-3 h-3 text-slate-400" /> Presets:
        </span>
        <button
          onClick={() => setViewPreset('front')}
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            activePreset === 'front' ? 'bg-orange-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Anterior (Front)
        </button>
        <button
          onClick={() => setViewPreset('medial')}
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            activePreset === 'medial' ? 'bg-orange-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Medial View
        </button>
        <button
          onClick={() => setViewPreset('lateral')}
          className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
            activePreset === 'lateral' ? 'bg-orange-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Lateral View
        </button>
      </div>
    </div>
  );
};
