import React from 'react';
import { Activity, ShieldCheck, Heart, Building2, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs pt-8 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Mission */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white text-base font-heading">OsteoSense</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
              v2.4 BLE Production
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
            Smart India Hackathon (SIH 004) • AI & Rule-Based Early Detection of Knee Osteoarthritis Risk Markers in the North Eastern Region. Purpose-built for frontline ASHA health activists and rural community outreach.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
            <span>© 2026 OsteoSense Initiative</span>
            <span>•</span>
            <span>National Health Mission Guidelines</span>
            <span>•</span>
            <span>Offline-First Architecture</span>
          </div>
        </div>

        {/* Clinical Partners */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Clinical Pathways</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Gauhati Medical College & Hospital (GMCH)</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Kamrup District Civil Hospital OPD</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">NEIGRIHMS Shillong Directorate</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Northeast Regional Orthopedic Registry</li>
          </ul>
        </div>

        {/* Sensor & Telemetry Specs */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Wearable Tech</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>6-DOF IMU Gait Accelerometer</li>
            <li>Flexible Joint Goniometer (ROM)</li>
            <li>5-Point Compartment Pressure Array</li>
            <li>Differential Infrared Thermometry</li>
            <li>Piezo Vibroarthrography Contact Mic</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};
