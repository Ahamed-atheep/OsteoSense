import React, { createContext, useContext, useState, useEffect } from 'react';
import { PREVIOUS_PATIENTS, CACHED_ASHA_WORKERS } from '../data/mockData';

const ScreeningContext = createContext();

export const ScreeningProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Authenticated ASHA Worker State
  const [activeAsha, setActiveAsha] = useState(() => {
    try {
      const cached = localStorage.getItem('oa_active_asha');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return CACHED_ASHA_WORKERS[0];
  });
  const [isAshaAuthenticated, setIsAshaAuthenticated] = useState(() => {
    return localStorage.getItem('oa_asha_auth') === 'true';
  });

  const loginAsha = (workerId, pin) => {
    const found = CACHED_ASHA_WORKERS.find(
      (w) => w.id.toUpperCase() === workerId.trim().toUpperCase() && w.pin === pin.trim()
    );
    if (found) {
      setActiveAsha(found);
      setIsAshaAuthenticated(true);
      try {
        localStorage.setItem('oa_active_asha', JSON.stringify(found));
        localStorage.setItem('oa_asha_auth', 'true');
      } catch (e) {}
      return { success: true, worker: found };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logoutAsha = () => {
    setIsAshaAuthenticated(false);
    try {
      localStorage.removeItem('oa_asha_auth');
    } catch (e) {}
  };
  
  // Default Active Patient
  const [activePatient, setActivePatient] = useState({
    id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
    name: 'Bimala Rabha',
    age: 54,
    gender: 'Female',
    occupation: 'Tea Garden Worker',
    village: 'Rani Gaon',
    block: 'Rani Block',
    campId: 'CAMP-KAMRUP-04',
    painIntensity: 6,
    complaints: {
      morningStiffness: true,
      swelling: true,
      locking: false,
      slopePain: true
    }
  });

  // Sensor Connection & Telemetry State
  const [isBleConnected, setIsBleConnected] = useState(true);
  const [isScanningBle, setIsScanningBle] = useState(false);

  // Live Telemetry Values
  const [sensorTelemetry, setSensorTelemetry] = useState({
    rom: 96,                  // Flexion degrees
    angularVelocity: 172,     // °/s
    medialLoad: 68,           // % Medial vs 32% Lateral
    thermalDelta: 1.6,        // °C joint temp rise
    crepitusEvents: 14,       // sound spikes/min
    terrainIndex: 1.35,       // rural hill slope factor
  });

  // Walk Test Timer State
  const [walkTestStatus, setWalkTestStatus] = useState('idle'); // 'idle' | 'running' | 'complete'
  const [walkTestTimeLeft, setWalkTestTimeLeft] = useState(30);

  // AI Processing State
  const [aiState, setAiState] = useState('idle'); // 'idle' | 'processing' | 'ready'
  const [aiStep, setAiStep] = useState(0);

  // Computed Risk Output (NO radiographic KL Grade claims!)
  const [riskAssessment, setRiskAssessment] = useState({
    score: 78,
    band: 'High Risk',
    colorClass: 'risk-high',
    contributingFactors: [
      { text: 'Medial Compartment Overload (68% load concentration)', icon: 'Footprints' },
      { text: 'Thermal Inflammatory Differential (+1.6°C delta)', icon: 'Thermometer' },
      { text: 'Flexion Range Deficit (96° vs normal >120°)', icon: 'Maximize2' },
      { text: 'Joint Crepitus Audio Bursts (14 spikes/min)', icon: 'Volume2' },
      { text: 'Hilly Terrain Effort Multiplier (1.35x biomechanical strain)', icon: 'Mountain' }
    ],
    visits: [
      { date: '2026-03-10', score: 82, rom: 90 },
      { date: '2026-06-15', score: 80, rom: 92 },
      { date: '2026-09-20', score: 78, rom: 96 }
    ]
  });

  // Offline Sync Queue
  const [offlineQueue, setOfflineQueue] = useState([
    { id: 'PAT-4109', name: 'Moniram Das', time: '10 mins ago' },
    { id: 'PAT-8821', name: 'Bimala Rabha', time: '2 mins ago' },
  ]);
  const [isOnline, setIsOnline] = useState(true);

  // Toggle BLE Bluetooth Scan
  const toggleBle = () => {
    if (isBleConnected) {
      setIsBleConnected(false);
    } else {
      setIsScanningBle(true);
      setTimeout(() => {
        setIsScanningBle(false);
        setIsBleConnected(true);
      }, 1500);
    }
  };

  // Run 30s Walk Test Simulation
  const startWalkTest = () => {
    setWalkTestStatus('running');
    setWalkTestTimeLeft(30);

    const interval = setInterval(() => {
      setWalkTestTimeLeft((prev) => {
        // Dynamically flicker telemetry while patient walks!
        setSensorTelemetry(t => ({
          ...t,
          angularVelocity: Math.floor(165 + Math.random() * 20),
          crepitusEvents: Math.min(25, t.crepitusEvents + (Math.random() > 0.6 ? 1 : 0)),
          rom: Math.floor(94 + Math.random() * 5)
        }));

        if (prev <= 1) {
          clearInterval(interval);
          setWalkTestStatus('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Run On-Device AI Engine Analysis
  const runAiAnalysis = (navigateCallback) => {
    setAiState('processing');
    setAiStep(1);

    setTimeout(() => setAiStep(2), 1000);
    setTimeout(() => setAiStep(3), 2000);
    setTimeout(() => setAiStep(4), 3000);

    setTimeout(() => {
      setAiState('ready');
      // Calculate dynamic risk based on telemetry values
      let baseScore = 40;
      if (sensorTelemetry.rom < 105) baseScore += 18;
      if (sensorTelemetry.medialLoad > 60) baseScore += 12;
      if (sensorTelemetry.thermalDelta > 1.0) baseScore += 10;
      if (sensorTelemetry.crepitusEvents > 8) baseScore += 10;

      let band = 'Low Risk';
      let colorClass = 'risk-low';

      if (baseScore >= 85) {
        band = 'Refer to District Hospital';
        colorClass = 'risk-refer';
      } else if (baseScore >= 65) {
        band = 'High Risk';
        colorClass = 'risk-high';
      } else if (baseScore >= 35) {
        band = 'Moderate Risk';
        colorClass = 'risk-moderate';
      }

      setRiskAssessment(prev => ({
        ...prev,
        score: baseScore,
        band: band,
        colorClass: colorClass
      }));

      if (navigateCallback) navigateCallback();
    }, 4000);
  };

  // Select previous patient file
  const loadExistingPatient = (patientObj) => {
    setActivePatient({
      id: patientObj.id,
      name: patientObj.name,
      age: patientObj.age,
      gender: patientObj.gender,
      occupation: patientObj.occupation,
      village: patientObj.village,
      block: patientObj.block,
      campId: patientObj.campId || 'CAMP-KAMRUP-04',
      painIntensity: patientObj.painIntensity !== undefined ? patientObj.painIntensity : 6,
      complaints: patientObj.complaints
    });
    setRiskAssessment(prev => ({
      ...prev,
      score: patientObj.riskScore,
      band: patientObj.riskBand,
      visits: patientObj.visits || prev.visits
    }));
  };

  return (
    <ScreeningContext.Provider
      value={{
        language,
        setLanguage,
        activeAsha,
        setActiveAsha,
        isAshaAuthenticated,
        loginAsha,
        logoutAsha,
        activePatient,
        setActivePatient,
        isBleConnected,
        isScanningBle,
        toggleBle,
        sensorTelemetry,
        setSensorTelemetry,
        walkTestStatus,
        walkTestTimeLeft,
        startWalkTest,
        aiState,
        aiStep,
        runAiAnalysis,
        riskAssessment,
        loadExistingPatient,
        offlineQueue,
        isOnline,
        setIsOnline
      }}
    >
      {children}
    </ScreeningContext.Provider>
  );
};

export const useScreening = () => useContext(ScreeningContext);
