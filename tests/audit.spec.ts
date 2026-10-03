import { expect, test } from '@playwright/test'

for (const [width, height] of [[1440, 900], [1920, 1080]]) {
test(`capture refined desktop composition ${width}x${height}`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width, height })
  await page.goto('/')
  await page.waitForTimeout(1200)
  await page.screenshot({ path: testInfo.outputPath('hero.png') })
  for (const target of ['work', 'building-next', 'about', 'stack', 'contact']) {
    await page.locator(`#${target}`).evaluate(el => el.scrollIntoView({ block: 'start' }))
    await page.waitForTimeout(1200)
    await page.getByRole('button', { name: 'Menu +' }).click({ trial: true })
    await page.screenshot({ path: testInfo.outputPath(`${target}.png`) })
  }
  for (const target of ['tip-title', 'forty-two-title']) {
    await page.locator(`#${target}`).evaluate(el => el.closest('section')!.scrollIntoView({ block: 'start' }))
    await page.waitForTimeout(1200)
    await page.screenshot({ path: testInfo.outputPath(`${target}.png`) })
  }
  await page.locator('[data-42-project]').last().scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await page.screenshot({ path: testInfo.outputPath('terminal-projects.png') })
  await page.locator('[data-construction-site]').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-construction-site]')).toHaveAttribute('data-state', 'finished', { timeout: 15000 })
  await page.screenshot({ path: testInfo.outputPath('construction-finished.png') })
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: testInfo.outputPath('footer.png') })
  console.log(await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    sections: [...document.querySelectorAll('main section')].map(el => ({
      id: el.id, height: Math.round(el.getBoundingClientRect().height),
    })),
    journeyCopies: document.querySelectorAll('[data-journey-content]').length,
  })))
})
}
