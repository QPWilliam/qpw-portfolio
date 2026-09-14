import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.AUDIT_URL || 'http://localhost:3001/es';
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox'] });
try {
  const result = await lighthouse(url, {
    port: chrome.port, output: 'html', logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  await mkdir('design/qa', { recursive: true });
  await writeFile('design/qa/lighthouse-mobile.html', result.report);
  await writeFile('design/qa/lighthouse-mobile.json', JSON.stringify(result.lhr, null, 2));
  console.log(JSON.stringify({
    scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
    metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift'].map(key => [key, result.lhr.audits[key].displayValue])),
  }, null, 2));
} finally { await chrome.kill(); }
