import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('residence demo: book, inspect and cancel a space', async ({ page }) => {
  await page.goto('/es');
  const phone = page.getByTestId('hero-phone');
  await phone.getByRole('button', { name: 'Probar demo: Gestión residencial' }).click();
  await phone.getByRole('button', { name: 'Reservar un espacio', exact: true }).click();
  await phone.getByRole('combobox', { name: 'Espacio', exact: true }).selectOption('2');
  const date = new Date(); date.setDate(date.getDate() + 2);
  await phone.getByLabel('Fecha', { exact: true }).fill(date.toLocaleDateString('en-CA'));
  await phone.getByRole('button', { name: '14:00' }).click();
  await phone.getByRole('button', { name: 'Confirmar reserva' }).click();
  await expect(phone.getByText('Tu espacio está reservado.')).toBeVisible();
  await phone.getByRole('button', { name: 'Mis reservas', exact: true }).click();
  await expect(phone.getByText('Terraza', { exact: true })).toBeVisible();
  await phone.getByRole('button', { name: 'Cancelar reserva' }).click();
  await expect(phone.getByText('Aún no tienes reservas.')).toBeVisible();
});

test('bot demo responds to quick actions and written messages, then resets', async ({ page }) => {
  await page.goto('/es');
  const phone = page.getByTestId('hero-phone');
  await phone.getByRole('button', { name: 'Probar demo: Bots y automatización' }).click();
  await phone.getByRole('button', { name: 'Consultar pedido', exact: true }).click();
  await expect(phone.getByText(/Tu pedido de ejemplo está en preparación/)).toBeVisible();
  await phone.getByRole('textbox', { name: 'Escribe un mensaje' }).fill('¿Qué horarios tienen?');
  await phone.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(phone.getByText(/En este ejemplo, atendemos/)).toBeVisible();
  await phone.getByRole('button', { name: 'Reiniciar demo' }).click();
  await expect(phone.getByText(/Tu pedido de ejemplo está en preparación/)).toHaveCount(0);
  await expect(phone.getByText(/Soy el asistente de esta demo/)).toBeVisible();
});

test('ERP demo changes an order through preparation to ready and filters', async ({ page }) => {
  await page.goto('/es');
  const phone = page.getByTestId('hero-phone');
  await phone.getByRole('button', { name: 'Probar demo: Ecosistema ERP' }).click();
  await phone.getByRole('button').filter({ hasText: '#1042' }).click();
  await phone.getByRole('button', { name: 'Preparar pedido' }).click();
  await expect(phone.getByText('En preparación', { exact: true })).toBeVisible();
  await phone.getByRole('button', { name: 'Marcar como listo' }).click();
  await expect(phone.getByText('Listo para recoger', { exact: true })).toBeVisible();
  await phone.locator('.mini-back').click();
  await phone.getByLabel('Filtrar pedidos').selectOption('ready');
  await expect(phone.locator('.order-card')).toHaveCount(2);
  await phone.getByRole('button', { name: 'Volver a mis proyectos', exact: true }).click();
  await expect(phone.getByText('Mis proyectos', { exact: true })).toBeVisible();
});

test('project selection and wide preview show the chosen real project', async ({ page }) => {
  await page.goto('/es');
  await page.getByTestId('project-scanlearn').click();
  const phone = page.getByTestId('work-phone');
  await expect(phone.getByRole('heading', { name: 'ScanLearn', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Vista amplia', exact: true }).click();
  await expect(phone).toHaveClass(/device-wide/);
  await phone.getByRole('button', { name: 'Arquitectura', exact: true }).click();
  await expect(phone.locator('.case-architecture')).toContainText('Fastify');
});

test('language switch keeps the selected apps and localizes document and demos', async ({ page }) => {
  await page.goto('/es');
  await page.getByTestId('hero-phone').getByRole('button', { name: 'Probar demo: Ecosistema ERP' }).click();
  await page.getByTestId('project-chatmenu').click();
  await page.locator('.locale-switch').getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByTestId('hero-phone').getByText('From order to delivery.')).toBeVisible();
  await expect(page.getByTestId('work-phone').getByRole('heading', { name: 'ChatMenu', exact: true })).toBeVisible();
  await page.locator('.locale-switch').getByRole('link', { name: '日本語', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page.getByTestId('hero-phone').getByText('注文から、お渡しまで。')).toBeVisible();
});

test('theme and reduced motion preferences survive reload', async ({ page }) => {
  await page.goto('/es');
  await page.getByRole('button', { name: 'Activar modo oscuro', exact: true }).click();
  await page.getByRole('button', { name: 'Reducir animaciones', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('.hero-name')).toHaveCSS('animation-name', 'none');
});

test('mobile navigation closes after selecting a section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/es');
  const menu = page.getByRole('button', { name: 'Abrir navegación', exact: true });
  await menu.click();
  await page.locator('#main-navigation').getByRole('link', { name: 'Trayectoria', exact: true }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#journey$/);
  await expect(page.getByRole('heading', { name: 'Cada proyecto, un paso más.' })).toBeInViewport();
  await expect.poll(() => page.locator('.site-header').evaluate(el => el.getBoundingClientRect().top)).toBe(0);
  await expect.poll(() => page.locator('#journey').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(86);
  await menu.click();
  await expect(page.locator('#main-navigation')).toBeInViewport();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('desktop navigation stays visible and section links clear the sticky header', async ({ page }) => {
  await page.goto('/es');
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  const header = page.locator('.site-header');
  await expect.poll(() => header.evaluate(el => el.getBoundingClientRect().top)).toBe(0);
  await header.getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect.poll(() => page.locator('#projects').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(96);
  const preview = page.locator('.work-preview');
  await preview.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'instant' }));
  const headerBottom = await header.evaluate(el => el.getBoundingClientRect().bottom);
  await expect.poll(() => preview.evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(headerBottom + 24);
});

for (const lang of ['es', 'en', 'ja']) {
  test(`${lang}: no browser errors or horizontal overflow at phone, tablet and desktop widths`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${lang}`);
      await expect(page.locator('h1')).toBeVisible();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test('contact links and downloadable résumé are available', async ({ page, request }) => {
  await page.goto('/es');
  await expect(page.getByRole('link', { name: 'Conversemos', exact: true })).toHaveAttribute('href', 'mailto:william.burrion@gmail.com');
  await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', /linkedin\.com/);
  const pdf = await request.get('/cv/william-burrion.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
});

test('light and dark views pass automated WCAG AA checks', async ({ page }) => {
  await page.goto('/es');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Activar modo oscuro', exact: true }).click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});
