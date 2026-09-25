import puppeteer from 'puppeteer-core';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const tests = [
  // Mobile Phone Tests (390 x 844)
  { path: '/login', name: 'mobile_login.png', width: 390, height: 844 },
  { path: '/register', name: 'mobile_registration.png', width: 390, height: 844 },
  { path: '/sensor', name: 'mobile_sensor.png', width: 390, height: 844 },
  { path: '/report', name: 'mobile_report.png', width: 390, height: 844 },
  { path: '/dashboard', name: 'mobile_dashboard.png', width: 390, height: 844 },
  
  // Tablet Tests (768 x 1024)
  { path: '/login', name: 'tablet_login.png', width: 768, height: 1024 },
  { path: '/report', name: 'tablet_report.png', width: 768, height: 1024 },
  { path: '/dashboard', name: 'tablet_dashboard.png', width: 768, height: 1024 },

  // Desktop Tests (1440 x 900)
  { path: '/login', name: 'desktop_login.png', width: 1440, height: 900 },
  { path: '/report', name: 'desktop_report.png', width: 1440, height: 900 },
  { path: '/dashboard', name: 'desktop_dashboard.png', width: 1440, height: 900 },
];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const t of tests) {
    await page.setViewport({ width: t.width, height: t.height, deviceScaleFactor: 1.5 });
    const targetUrl = `http://localhost:5000${t.path}`;
    console.log(`Auditing [${t.width}x${t.height}] -> ${targetUrl}...`);
    
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    
    const outputPath = path.join('E:', 'Sih004', 'screenshots', t.name);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Saved: ${outputPath}`);
  }

  await browser.close();
  console.log('All responsive audit captures completed!');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
