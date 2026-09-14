import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('catalog keeps Core and PioApp separate and filters professional and personal work', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('.project-trigger')).toHaveCount(7);
  const filters = page.getByRole('group', { name: 'Filtrar proyectos' });
  await filters.getByRole('button', { name: /Alisa/ }).click();
  await expect(page.locator('.project-trigger')).toHaveCount(3);
  for (const id of ['core', 'pioapp', 'pinulito']) await expect(page.getByTestId(`project-${id}`)).toBeVisible();
  await page.getByTestId('project-pioapp').click();
  await expect(page.getByTestId('work-phone').getByRole('heading', { name: 'PioApp', exact: true })).toBeVisible();
  await filters.getByRole('button', { name: /Personales/ }).click();
  await expect(page.locator('.project-trigger')).toHaveCount(4);
  await expect(page.getByTestId('work-phone').getByRole('heading', { name: 'ScanLearn', exact: true })).toBeVisible();
});

test('every project opens in the phone with functional features and architecture views', async ({ page }) => {
  await page.goto('/es');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const phone = page.getByTestId('work-phone');
  for (const id of ['core', 'pioapp', 'pinulito', 'scanlearn', 'chatmenu', 'proferre', 'portfolio']) {
    await page.getByTestId(`project-${id}`).click();
    await expect(phone.locator('.project-case')).toBeVisible();
    await expect(phone.locator('.case-feature')).toHaveCount(3);
    const second = phone.locator('.case-feature').nth(1);
    await second.getByRole('button').click();
    await expect(second.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    await expect(second.locator('p')).toBeVisible();
    await phone.getByRole('button', { name: 'Arquitectura', exact: true }).click();
    await expect(phone.locator('.case-architecture')).toBeVisible();
  }
  await page.getByTestId('project-core').click();
  await expect.poll(() => phone.locator('.device-viewport').evaluate(element => element.scrollTop)).toBe(0);
});

for (const lang of ['es', 'en', 'ja']) {
  test(`${lang}: CV defaults to the page language and downloads the matching PDF`, async ({ page, request }) => {
    await page.goto(`/${lang}`);
    const selector = page.locator('.cv-download select');
    await expect(selector).toHaveValue(lang);
    const link = page.locator('.cv-link');
    await expect(link).toHaveAttribute('href', `/cv/william-burrion-${lang}.pdf`);
    const pending = page.waitForEvent('download');
    await link.click();
    const download = await pending;
    expect(download.suggestedFilename()).toBe(`William-Burrion-CV-${lang.toUpperCase()}.pdf`);
    expect(await download.failure()).toBeNull();
    const response = await request.get(`/cv/william-burrion-${lang}.pdf`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  });
}

test('CV language can change independently from the website language', async ({ page }) => {
  await page.goto('/es');
  await page.getByLabel('Idioma del CV', { exact: true }).selectOption('ja');
  await expect(page.locator('.cv-link')).toHaveAttribute('href', '/cv/william-burrion-ja.pdf');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page).toHaveURL(/\/es$/);
});

test('project cases and CV controls stay accessible on mobile in Japanese', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/ja');
  await page.getByTestId('project-pioapp').click();
  await page.getByTestId('work-phone').getByRole('button', { name: '構成', exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});
