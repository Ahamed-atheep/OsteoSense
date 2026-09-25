import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScreeningProvider } from './context/ScreeningContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { AshaLogin } from './screens/AshaLogin';
import { PatientRegistration } from './screens/PatientRegistration';
import { SensorScreening } from './screens/SensorScreening';
import { AIAnalysisEngine } from './screens/AIAnalysisEngine';
import { RiskReport } from './screens/RiskReport';
import { AwarenessHub } from './screens/AwarenessHub';
import { DistrictDashboard } from './screens/DistrictDashboard';

export default function App() {
  return (
    <ScreeningProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
          {/* Header Bar */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<AshaLogin />} />
              <Route path="/register" element={<PatientRegistration />} />
              <Route path="/sensor" element={<SensorScreening />} />
              <Route path="/analysis" element={<AIAnalysisEngine />} />
              <Route path="/report" element={<RiskReport />} />
              <Route path="/awareness" element={<AwarenessHub />} />
              <Route path="/dashboard" element={<DistrictDashboard />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>

          {/* Desktop & Mobile Global Footer */}
          <Footer />

          {/* Mobile Navigation Footer (Hidden on Desktop) */}
          <BottomNav />
        </div>
      </Router>
    </ScreeningProvider>
  );
}
