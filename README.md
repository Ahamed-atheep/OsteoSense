# OsteoSense 🛡️
### Rule-Based Knee Health Screening & Triage System for Rural India
*Smart India Hackathon (SIH 004) • Northeast India Knee Health Initiative*

OsteoSense is an offline-first, mobile-optimized clinical screening application designed for frontline **ASHA (Accredited Social Health Activists)** workers to identify early biomechanical risk indicators of Knee Osteoarthritis (OA) across rural and hilly regions of Northeast India.

---

## 🌟 Key Features

- **Professional Blue/White Chrome**: Restyled clinical headers, navigation, buttons, and card containers with strict preservation of the 4 clinical risk tokens (`#10b981` Low, `#f59e0b` Moderate, `#ea580c` High, `#e11d48` Urgent Referral).
- **Offline ASHA Worker Authentication (`/login`)**: Secure Worker ID and 4-digit PIN authentication validated against local cached worker registries for zero-connectivity field outreach.
- **6-Channel Wearable Telemetry Integration**:
  - IMU Gait Accelerometer (`°/s` angular velocity & step symmetry)
  - Flexible Goniometer (Flexion/Extension Range of Motion, normal $>120°$)
  - 5-Point Pressure Array (Medial vs. Lateral compartment load distribution)
  - Infrared Differential Thermometer ($\Delta T$, joint capsule inflammatory rise)
  - Piezo Acoustic Sensor (Vibroarthrography / crepitus spikes per minute)
  - Barometric Slope Inclinometer (Rural hill slope strain multiplier)
  - Non-intrusive `Simulated Sensor Data — Demo Mode` status badge for demonstration without active BLE hardware.
- **Guided 30-Second Walk Test**: Timed Up & Go (TUG) recording with live animated waveform feedback.
- **Rule-Based Edge Triage Engine (v1)**: On-device deterministic ruleset computing a multi-factorial 0–100 risk score and identifying primary contributing factors.
- **Clinical Safety Boundary**: Strictly a functional risk triage system (**NO false radiographic Kellgren-Lawrence grade claims**).
- **Interactive 3D Knee Joint Model (`KneeJoint3D.jsx`)**: 360° rotatable anatomical joint with live sensor heatmaps displaying medial compartment overload and inflammatory thermal hotspots.
- **Longitudinal Trend Chart**: Interactive Recharts multi-visit tracking for flexion ROM and risk score progression.
- **Awareness & Prevention Hub (`/awareness`)**: Standalone, illustrated educational module accessible anytime covering Joint-Friendly Nutrition, Physical Activity, Occupational Ergonomics (tea garden, paddy, weaving, hill portering), and Posture.
- **Grassroots Usability**:
  - **Offline-First**: Queued sync engine for disconnected field clinics.
  - **Multilingual (9 Languages)**: English, Hindi (हिन्दी), Assamese (অসমীয়া), Bengali (বাংলা), Bodo (बड़ो), Khasi, Mizo, Manipuri (মৈতৈলোন্), Nepali (नेपाली).
  - **Clinical Action Suite**: Digital GMCH Referral Vouchers, pre-formatted WhatsApp dispatch, and PDF export.
- **District HQ Surveillance Portal (`/dashboard`)**: CMO/directorate epidemiological dashboard with stacked risk-by-block distribution charts, restricted access badge, and high-risk case registry.

---

## 📱 7-Screen Application Architecture

| Screen | Route | Key Functionality |
| :--- | :--- | :--- |
| **0. ASHA Login** | `/login` | Offline worker ID & PIN validation, quick-fill demo credentials, NHM accreditation header. |
| **1. Registration** | `/register` | Dynamic ASHA banner, 0–10 pain-intensity slider (VAS), outreach camp ID, village picker, rural livelihoods, complaint toggles. |
| **2. Sensor Screening** | `/sensor` | BLE pair toggle, live 6-channel telemetry grid, demo mode badge, guided 30s walk test with waveform. |
| **3. Triage Engine** | `/analysis` | Rule-Based Edge Triage Engine (v1), neural radar visualizer, biomarker cards with risk gauges. |
| **4. Risk Report** | `/report` | Preserved clinical risk score badge, 3D knee model with heatmap, longitudinal chart, ASHA exercises, nutrition & lifestyle care cards, referral voucher modal. |
| **5. Awareness Hub** | `/awareness` | Educational modules: nutrition (moringa/curcumin), activity, occupational ergonomics, footwear/posture tips. |
| **6. District HQ** | `/dashboard` | CMO access authorization badge, district KPI cards, stacked block risk chart, filterable high-risk patient table. |

*(Refer to [mobile_screens_gallery.md](file:///e:/Sih004/screenshots/mobile_screens_gallery.md) for full-resolution screenshots).*

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18.3.1, Vite 5.4.1
- **Styling**: TailwindCSS 3.4.10, PostCSS, Autoprefixer (custom `medical` and `risk` palettes)
- **Charts & Visualization**: Recharts 2.12.7, Custom SVG 3D transform projection
- **Icons**: Lucide React 0.439.0
- **Automated Validation**: Puppeteer-Core 25.11.0 (`capture_screens.js`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Installation & Run
```bash
# Clone or navigate to the repository
cd Sih004

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Automated UI Screen Capture
To execute automated headless browser capture of all 7 screens:
```bash
node capture_screens.js
```
Screenshots are saved to `./screenshots/`.

---

## 📄 License & Attribution
Developed for Smart India Hackathon (SIH 004) — Northeast India Knee Health Screening & Early Intervention Initiative.
