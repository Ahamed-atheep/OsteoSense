import React, { useState } from 'react';
import { useScreening } from '../context/ScreeningContext';
import { getTranslation } from '../data/translations';
import { AWARENESS_TOPICS } from '../data/mockData';
import {
  Apple,
  Activity,
  Briefcase,
  Footprints,
  Sparkles,
  HeartPulse,
  ShieldCheck,
  Compass,
  CheckCircle,
  HelpCircle,
  Sun,
  Flame,
  Droplets,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const AwarenessHub = () => {
  const { language } = useScreening();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryIcons = {
    nutrition: Apple,
    activity: Activity,
    ergonomics: Briefcase,
    posture: Footprints
  };

  const filteredTopics = selectedCategory === 'all'
    ? AWARENESS_TOPICS
    : AWARENESS_TOPICS.filter((t) => t.category === selectedCategory);

  return (
    <div className="pb-24 lg:pb-12 pt-2 px-4 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
      
      {/* Awareness Hub Hero Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-inner text-3xl shrink-0">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                  Community Health & Prevention Library
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/30 text-white">
                  Evidence-Based ICMR Guidelines
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {getTranslation(language, 'awareTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1.5 max-w-2xl leading-relaxed">
                {getTranslation(language, 'awareSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white">
              <span className="font-bold text-sky-200">9 Supported Languages</span>
              <div className="text-[11px] text-white/80">Available offline for field workers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
            }`}
          >
            All Health Categories
          </button>

          {AWARENESS_TOPICS.map((topic) => {
            const IconComp = categoryIcons[topic.category] || BookOpen;
            const isActive = selectedCategory === topic.category;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedCategory(topic.category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span>{getTranslation(language, topic.titleKey) || topic.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Awareness Content Sections Grid */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => {
          const IconComp = categoryIcons[topic.category] || BookOpen;
          return (
            <div
              key={topic.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 space-y-5"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                      {getTranslation(language, topic.titleKey) || topic.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">{topic.badge}</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 self-start sm:self-center">
                  {topic.items.length} Actionable Clinical Modules
                </span>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topic.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100/90 px-2 py-0.5 rounded-full shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Recommended by Orthopedic Protocol</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Education Note */}
      <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 rounded-2xl bg-blue-600 text-white shrink-0 shadow-sm">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-extrabold text-sm text-slate-900 font-heading">ASHA Community Counseling Protocol</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            These guidelines are designed for oral demonstration during village outreach camps and self-help group (SHG) meetings. For patients identified as High Risk or Referral Grade, accompany these lifestyle suggestions with the official District Hospital Referral Voucher.
          </p>
        </div>
      </div>

    </div>
  );
};
