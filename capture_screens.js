import puppeteer from 'puppeteer-core';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const screens = [
  { path: '/login', name: 'screen_0_login.png', width: 1440, height: 900 },
  { path: '/register', name: 'screen_1_registration.png', width: 1440, height: 960 },
  { path: '/sensor', name: 'screen_2_sensors.png', width: 1440, height: 900 },
  { path: '/analysis', name: 'screen_3_ai_engine.png', width: 1440, height: 900 },
  { path: '/report', name: 'screen_4_risk_report.png', width: 1440, height: 1100 },
  { path: '/awareness', name: 'screen_5_awareness_hub.png', width: 1440, height: 900 },
  { path: '/dashboard', name: 'screen_6_district_dashboard.png', width: 1440, height: 900 },
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const s of screens) {
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 1.5 });
    const targetUrl = `http://localhost:5000${s.path}`;
    console.log(`Navigating to ${targetUrl}...`);
    
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200)); // wait for animations & recharts
    
    const outputPath = path.join('E:', 'Sih004', 'screenshots', s.name);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Captured: ${outputPath}`);
  }

  await browser.close();
  console.log('All 7 real screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
