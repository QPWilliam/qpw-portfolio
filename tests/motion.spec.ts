import { test, expect } from '@playwright/test';

test('ambient motion stops while using the phone and outside the hero', async ({ page }) => {
  await page.goto('/es');
  const hero = page.locator('.hero');
  const floatingPhone = page.locator('.hero-phone-float');
  await expect(hero).toHaveAttribute('data-ambient', 'running');
  await expect(floatingPhone).toHaveCSS('animation-play-state', 'running');
  await page.getByTestId('hero-phone').getByRole('button', { name: 'Probar demo: Bots y automatización' }).click();
  await page.mouse.move(10, 10);
  await expect(floatingPhone).toHaveCSS('animation-play-state', 'paused');
  await page.locator('#journey').scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-ambient', 'paused');
  await expect(page.locator('.scene-ink .scene-drift')).toHaveCSS('animation-play-state', 'paused');
});

test('scroll reveals finish once and remain visible after revisiting a section', async ({ page }) => {
  await page.goto('/es');
  const heading = page.locator('#journey-title');
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute('data-reveal-state', 'visible');
  await expect(heading).toHaveCSS('opacity', '1');
  await page.locator('.brand').first().scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Activar modo oscuro', exact: true }).click();
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute('data-reveal-state', 'visible');
  expect(await heading.evaluate(element => element.getAnimations().length)).toBe(0);
  await expect(heading).toHaveCSS('opacity', '1');
});

test('changing reduced motion reveals waiting content and cancels active decoration', async ({ page }) => {
  await page.goto('/es');
  const heading = page.locator('#contact-title');
  await expect(heading).toHaveAttribute('data-reveal-state', 'waiting');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(heading).toHaveCSS('opacity', '1');
  await expect(page.locator('.hero-name-word').first()).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.scene-ink .scene-drift')).toHaveCSS('animation-name', 'none');
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
});

test('keyboard focus exposes unvisited content immediately', async ({ page }) => {
  await page.goto('/es');
  const contact = page.getByRole('link', { name: 'Conversemos', exact: true });
  await contact.focus();
  await expect(contact).toBeFocused();
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('.contact-links')).toHaveCSS('opacity', '1');
});

test('content stays readable when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3000'}/es`);
  await expect(page.getByRole('heading', { name: 'William Burrión', exact: true })).toBeVisible();
  await page.locator('#contact-title').scrollIntoViewIfNeeded();
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: 'Conversemos', exact: true })).toBeVisible();
  await context.close();
});
