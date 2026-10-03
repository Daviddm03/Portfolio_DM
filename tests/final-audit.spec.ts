import { expect, test } from '@playwright/test'

test('contact entrances stay visible after scrolling back above the section', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1')
  await page.locator('#contact').evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight + 60))
  await page.waitForTimeout(1200)
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1')
  await expect(page.locator('[data-contact-links]')).toHaveCSS('opacity', '1')
  await expect(page.locator('[data-contact-links]')).toHaveCSS('transform', 'none')
})

test('construction communicates Shift Schedule to assistive technology', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const scene = page.getByRole('img', { name: 'Shift Schedule · Planned' })
  await expect(scene).toHaveAccessibleDescription('Staff scheduling built around shifts, availability and daily operations.')
})

test('supporting groups reveal once, survive resize, and expose static reduced-motion content', async ({ page }) => {
  await page.goto('/')
  const groups = page.locator('[data-scroll-reveal]')
  expect(await groups.count()).toBeGreaterThan(8)
  for (const group of await groups.all()) {
    // Cross the reveal threshold; a short row can fit below the 85% line.
    await group.evaluate(el => el.scrollIntoView({ block: 'center' }))
    await expect(group).toHaveCSS('opacity', '1')
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.setViewportSize({ width: 390, height: 844 })
  for (const group of await groups.all()) await expect(group).toHaveCSS('opacity', '1')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const group of await groups.all()) {
    await expect(group).toHaveCSS('opacity', '1')
    await expect(group).toHaveCSS('transform', 'none')
  }
})

for (const [width, height] of [[1366, 768], [1024, 768], [768, 1024], [1024, 500]]) {
  for (const reducedMotion of ['reduce', 'no-preference'] as const) {
    test(`complete page fits ${width}×${height}, motion ${reducedMotion}`, async ({ page }, testInfo) => {
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => {
        if (/React.*warning|GSAP target|ScrollTrigger.*warning/i.test(message.text())) errors.push(message.text())
      })
      await page.setViewportSize({ width, height })
      await page.emulateMedia({ reducedMotion })
      await page.goto('/')
      await page.getByRole('button', { name: 'Menu +' }).click()
      await page.getByRole('link', { name: /01 Introduction/ }).click()
      await expect(page.locator('#introduction')).toBeFocused()
      await expect(page.locator('#introduction')).toHaveCSS('opacity', '1')
      if (await page.locator('.pin-spacer').count() === 0) {
        await expect.poll(() => page.locator('#introduction').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(96)
      }
      const details = await page.locator('[data-intro-detail]').last().boundingBox()
      const intro = await page.locator('#introduction').boundingBox()
      expect(details!.y + details!.height).toBeLessThanOrEqual(intro!.y + intro!.height + 1)
      await page.screenshot({ path: testInfo.outputPath('introduction.png') })
      for (const section of await page.locator('main > section').all()) {
        await section.evaluate(el => el.scrollIntoView({ block: 'start' }))
        await page.waitForTimeout(1100)
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
      }
      for (const heading of await page.locator('h1, h2, h3').all()) {
        expect(await heading.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1)
      }
      await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true })
      expect(errors).toEqual([])
    })
  }
}

test('keyboard skip navigation and both ends of the menu focus trap work', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to selected work' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#work')).toBeFocused()
  await page.getByRole('button', { name: 'Menu +' }).click()
  const menu = page.getByRole('dialog', { name: 'Portfolio navigation' })
  const first = menu.getByRole('button', { name: 'Back to top' })
  const last = menu.getByRole('link', { name: 'LinkedIn', exact: true })
  await first.focus()
  await page.keyboard.press('Shift+Tab')
  await expect(last).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(first).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Menu +' })).toBeFocused()
})

test('repeated viewport and motion changes preserve the landing pin without runtime warnings', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.stack ?? error.message))
  page.on('console', message => {
    if (/GSAP target|ScrollTrigger.*warning/i.test(message.text())) errors.push(message.text())
  })
  await page.goto('/')
  for (let round = 0; round < 3; round++) {
    await page.locator('#contact').evaluate(el => el.scrollIntoView({ block: 'start' }))
    await page.waitForTimeout(1100)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)
    await expect(page.locator('.pin-spacer')).toHaveCount(1)
  }
  expect(errors).toEqual([])
})
