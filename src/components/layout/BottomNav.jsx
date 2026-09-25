import React from 'react';
import { NavLink } from 'react-router-dom';
import { useScreening } from '../../context/ScreeningContext';
import { getTranslation } from '../../data/translations';
import { UserPlus, Cpu, Zap, FileBarChart, BookOpen, Building2 } from 'lucide-react';

export const BottomNav = () => {
  const { language } = useScreening();

  const navItems = [
    { path: '/register', labelKey: 'tabRegister', icon: UserPlus, badge: '1' },
    { path: '/sensor', labelKey: 'tabSensors', icon: Cpu, badge: '2' },
    { path: '/analysis', labelKey: 'tabAnalysis', icon: Zap, badge: '3' },
    { path: '/report', labelKey: 'tabReport', icon: FileBarChart, badge: '4' },
    { path: '/awareness', labelKey: 'tabAwareness', icon: BookOpen, badge: 'Hub' },
    { path: '/dashboard', labelKey: 'tabDashboard', icon: Building2, badge: 'HQ' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)]">
      <div className="max-w-lg sm:max-w-xl mx-auto px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[52px] sm:min-w-[62px] py-1 px-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25 scale-105 font-bold'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                    <span
                      className={`absolute -top-1 -right-2 text-[8px] sm:text-[9px] font-extrabold px-1 py-0.2 rounded-full ${
                        isActive ? 'bg-sky-200 text-blue-900' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight text-center truncate max-w-[56px] sm:max-w-[68px]">
                    {getTranslation(language, item.labelKey)}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
