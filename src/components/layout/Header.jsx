import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useScreening } from '../../context/ScreeningContext';
import { LANGUAGES, getTranslation } from '../../data/translations';
import {
  Activity,
  Globe,
  Wifi,
  WifiOff,
  UserCheck,
  ChevronDown,
  Sparkles,
  Stethoscope,
  UserPlus,
  Cpu,
  Zap,
  FileBarChart,
  BookOpen,
  Building2,
  LogOut
} from 'lucide-react';

export const Header = () => {
  const { language, setLanguage, isOnline, setIsOnline, offlineQueue, activeAsha, isAshaAuthenticated, logoutAsha } = useScreening();

  const navLinks = [
    { path: '/register', labelKey: 'tabRegister', icon: UserPlus },
    { path: '/sensor', labelKey: 'tabSensors', icon: Cpu },
    { path: '/analysis', labelKey: 'tabAnalysis', icon: Zap },
    { path: '/report', labelKey: 'tabReport', icon: FileBarChart },
    { path: '/awareness', labelKey: 'tabAwareness', icon: BookOpen },
    { path: '/dashboard', labelKey: 'tabDashboard', icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 via-blue-700 to-sky-700 text-white shadow-lg border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-inner group-hover:scale-105 transition-transform shrink-0">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight font-heading leading-none">
                {getTranslation(language, 'appTitle') || 'OsteoSense'}
              </span>
              <span className="bg-sky-400/25 backdrop-blur-sm text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full border border-sky-300/40 text-sky-100 uppercase tracking-wider">
                v2.4 BLE
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-sky-100/90 font-medium tracking-wide">
              {getTranslation(language, 'subTitle')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible on lg: screens >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-white text-blue-900 shadow-md font-extrabold scale-102'
                      : 'text-sky-100 hover:text-white hover:bg-white/15 font-semibold'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{getTranslation(language, item.labelKey)}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls: ASHA badge, Sync & Language */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Active ASHA worker indicator */}
          {isAshaAuthenticated && activeAsha ? (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold text-sky-100">
              <UserCheck className="w-3.5 h-3.5 text-sky-200" />
              <span className="truncate max-w-[100px]">{activeAsha.name}</span>
              <span className="text-[10px] font-normal text-sky-200 hidden lg:inline">({activeAsha.id})</span>
              <Link
                to="/login"
                title="Switch ASHA Account"
                className="ml-0.5 p-1 hover:bg-white/20 rounded-lg text-sky-200 hover:text-white transition-colors"
              >
                <LogOut className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-2.5 sm:px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-2xl text-[11px] sm:text-xs font-bold border border-white/30 text-white transition-all shadow-sm whitespace-nowrap"
            >
              {getTranslation(language, 'tabLogin')}
            </Link>
          )}

          {/* Online/Offline Status Indicator */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            title="Toggle simulated offline mode for field testing"
            className={`px-2 sm:px-3 py-1.5 rounded-2xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 backdrop-blur-md border transition-all ${
              isOnline
                ? 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100'
                : 'bg-rose-900/40 border-rose-300/40 text-rose-200 animate-pulse'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="hidden xl:inline">{getTranslation(language, 'onlineSync')}</span>
                <span className="hidden sm:inline xl:hidden">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span className="hidden xl:inline">{getTranslation(language, 'offlineSync')}</span>
                <span className="hidden sm:inline xl:hidden">Offline ({offlineQueue.length})</span>
              </>
            )}
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language Selector"
              className="appearance-none bg-white/20 backdrop-blur-md text-white border border-white/40 text-[11px] sm:text-xs font-bold rounded-2xl pl-2.5 sm:pl-3 pr-6 sm:pr-7 py-1.5 max-w-[100px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-800 bg-white">
                  {lang.flag} {lang.native} ({lang.name})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-sky-100 absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </div>
    </header>
  );
};
