# 📱 OA Sentinel — 7-Screen Walkthrough & Live Application Screenshots
**Updated with Professional Blue/White Chrome Theme & Clinical Enhancements**

DOM screenshots captured directly from the live **OA Sentinel** React application running on `http://localhost:3000`.

---

## 0. ASHA Worker Login (`/login`)

![ASHA Login Screen](file:///E:/Sih004/screenshots/screen_0_login.png)

### Key Features Rendered:
- **Offline Accreditation Header:** `NHM • Rural Northeast Field Screening • Offline Ready`.
- **Credential Fields:** Official ASHA Worker ID and 4-digit Security PIN with instant local cryptographic validation.
- **Offline Cached Workers List:** Single-tap demo credentials loader supporting Kamrup, Rani, Hajo, and Mylliem block field staff.
- **Auto-Navigation:** Direct routing to Patient Registration upon authentication.

---

## 1. Patient Registration (`/register`)

![Patient Registration Screen](file:///E:/Sih004/screenshots/screen_1_registration.png)

### Key Features Rendered:
- **Dynamic ASHA Banner:** Displays currently logged-in ASHA profile (*Sunita Deka, Kamrup Rural Post #4*).
- **Outreach Camp ID:** Outreach session tracking field (`CAMP-KAMRUP-04`) for rural camp surveillance.
- **0–10 Pain Intensity Visual Slider:** VAS pain scale with dynamic emoticons (`😊 No Pain` to `😭 Worst Pain`) and real-time numeric scoring.
- **Rural Livelihood Grid:** Icon buttons for *Tea Garden Worker, Farmer, Weaver, Homemaker, Porter*.
- **Knee Complaints Toggles:** High-contrast switch pills for morning stiffness, swelling, locking, and hill slope pain.
- **Multilingual Selector:** 8-language switcher in header (English, Assamese, Bengali, Bodo, Khasi, Mizo, Manipuri, Nepali).

---

## 2. Live Sensor Screening (`/sensor`)

![Sensor Screening Screen](file:///E:/Sih004/screenshots/screen_2_sensors.png)

### Key Features Rendered:
- **Simulated Demo Mode Badge:** Amber indicator `Simulated Sensor Data — Demo Mode` for uncoupled demonstration.
- **BLE Wearable Status Card:** Real-time BLE connectivity toggling and hardware discovery indicator.
- **6-Channel Telemetry Grid:**
  - 📐 **IMU Accelerometer:** `172 °/s`
  - 📏 **Flexible Goniometer:** `96° ROM`
  - 👣 **5-Point Pressure Array:** `68% Medial / 32% Lateral`
  - 🌡️ **Infrared Thermal:** `+1.6°C Delta`
  - 🎙️ **Acoustic Piezo Mic:** `14 events/min`
  - 🏔️ **Terrain Barometer:** `1.35x Hill Effort`
- **Guided 30-Second Walk Test:** Timed Up & Go (TUG) countdown with live dynamic waveform graphic.
- **Navigation CTA:** `Run Rule-Based Edge Triage Engine`.

---

## 3. Rule-Based Edge Triage Engine (`/analysis`)

![Triage Engine Screen](file:///E:/Sih004/screenshots/screen_3_ai_engine.png)

### Key Features Rendered:
- **Accurate Clinical Naming:** Officially designated as `Rule-Based Edge Triage Engine (v1)` — eliminating unvalidated AI/ML marketing claims.
- **Deterministic Neural Radar Visualizer:** Step-by-step progress tracking for ROM, compartment load ratio, crepitus acoustic filtering, and hill slope strain adjustments.
- **Biomarker Score Cards:** Extracted functional indexes with risk percentage gauges and clinical range references.

---

## 4. Risk Report & Clinical Guidance (`/report`)

![Risk Report Screen](file:///E:/Sih004/screenshots/screen_4_risk_report.png)

> [!IMPORTANT]
> **Preserved Clinical Risk Tokens:** Triage band colors are strictly maintained (`#10b981` Low, `#f59e0b` Moderate, `#ea580c` High, `#e11d48` Urgent Referral). No false radiographic Kellgren-Lawrence grade claims are made.

### Key Features Rendered:
- **Static 3D Knee Joint Model (`KneeJoint3D.jsx`):** 360° rotatable anatomical model with real-time medial compartment stress heatmap and preset views.
- **Longitudinal Trend Chart:** Multi-visit Recharts line chart tracking risk index and ROM across quarterly visits.
- **ASHA Community Care Guidelines:** Non-pharmacological home exercises (isometric quad strengthening, warm compress routines).
- **Nutrition & Lifestyle Section:** Daily local dietary guidance (moringa, curcumin) and walking staff slope mechanics.
- **Clinical Action Suite:** Specialist Referral Voucher modal for GMCH / District Civil Hospital OPD, 1-tap WhatsApp sharing, and PDF export.

---

## 5. Knee Health Awareness & Prevention Hub (`/awareness`)

![Awareness Hub Screen](file:///E:/Sih004/screenshots/screen_5_awareness_hub.png)

### Key Features Rendered:
- **Reachable Anytime:** Direct access from BottomNav without requiring an active screening session.
- **4 Educational Modules:**
  - 🥗 **Joint-Friendly Nutrition:** High-calcium moringa (sajna), anti-inflammatory turmeric decoction, clean hydration, and local small fish.
  - 🏃 **Physical Activity Guidance:** Morning seated knee extensions, non-impact walking, and deep squat avoidance.
  - 🌾 **Occupational Ergonomics:** Custom advice for Tea Garden pluckers, Paddy cultivators, Handloom weavers, and Hill porters.
  - 👟 **Footwear & Posture:** Cushioned rubber soles for rocky trails, symmetric weight stance, and chest-balanced load carrying.
- **Category Filter Pills:** Rapid filtering by topic for ASHA counseling sessions.

---

## 6. District HQ Epidemiological Portal (`/dashboard`)

![District HQ Dashboard Screen](file:///E:/Sih004/screenshots/screen_6_district_dashboard.png)

### Key Features Rendered:
- **Access Authorization Badge:** `Authorized Access: District CMO / Orthopedic Directorate Portal`.
- **District Health KPI Cards:** Total Screened ($1,482$), High Risk Cases ($318$), Referrals Sent ($142$), Active ASHA Workers ($89$).
- **Risk-by-Block Stacked Bar Chart:** Comparative Recharts breakdown across Rani, Chaygaon, Hajo, Boko, and Mylliem blocks.
- **High-Risk Case Registry Table:** Searchable table with block filter, patient risk tags, assigned ASHA contact numbers, and 1-click phone dispatch action.
