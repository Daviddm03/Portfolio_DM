import { expect, test } from '@playwright/test'

test('menu traps focus, supports Escape, and restores the opener', async ({
  page,
}) => {
  await page.goto('/')

  const opener = page.getByRole('button', { name: 'Menu +' })

  await opener.click()

  const menu = page.getByRole('dialog', {
    name: 'Portfolio navigation',
  })

  await expect(menu).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close ×' })).toBeFocused()

  await page.keyboard.press('Tab')

  await expect(
    menu.getByRole('link', { name: /Introduction/ }),
  ).toBeFocused()

  await menu.getByRole('link', { name: 'LinkedIn', exact: true }).focus()
  await page.keyboard.press('Tab')

  await expect(
    menu.getByRole('button', { name: 'Back to top' }),
  ).toBeFocused()

  await page.keyboard.press('Escape')

  await expect(menu).not.toBeVisible()
  await expect(opener).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('reduced motion exposes the introduction without a pin', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('#introduction')).toBeVisible()
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
})

test('menu Introduction reaches the cinematic final frame and Contact reaches visible links', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Menu +' }).click()
  await page.getByRole('link', { name: /01 Introduction/ }).click()

  await expect(page.locator('#introduction')).toHaveCSS('opacity', '1')
  await expect(page.locator('#introduction')).toBeFocused()

  await page.getByRole('button', { name: 'Menu +' }).click()
  await page.getByRole('link', { name: /06 Contact/ }).click()

  await expect(page.locator('#contact')).toBeFocused()
  await expect(page.locator('[data-contact-link]').first()).toHaveCSS(
    'opacity',
    '1',
  )

  await page
    .getByRole('button', { name: 'Back to top', exact: true })
    .last()
    .click()

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

for (const [width, height] of [
  [1440, 900],
  [1920, 1080],
  [1024, 900],
  [768, 900],
  [390, 844],
  [390, 667],
  [375, 812],
  [320, 740],
]) {
  test(`normal motion and navigation fit ${width}×${height}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height })
    await page.goto('/')

    await page.getByRole('button', { name: 'Menu +' }).click()
    await page.getByRole('link', { name: /01 Introduction/ }).click()

    await expect(page.locator('#introduction')).toBeFocused()
    await expect(page.locator('#introduction')).toHaveCSS('opacity', '1')

    const pinned = await page.locator('.pin-spacer').count()

    if (!pinned) {
      await expect
        .poll(() =>
          page
            .locator('#introduction')
            .evaluate(el => Math.round(el.getBoundingClientRect().top)),
        )
        .toBe(96)
    }

    const title = await page.locator('#introduction-title').boundingBox()
    const introBottom = await page
      .locator('[data-intro-detail]')
      .last()
      .boundingBox()

    expect(title!.y).toBeGreaterThan(60)

    if (pinned) {
      expect(introBottom!.y + introBottom!.height).toBeLessThanOrEqual(height)
    } else {
      const section = await page.locator('#introduction').boundingBox()

      expect(introBottom!.y + introBottom!.height).toBeLessThanOrEqual(
        section!.y + section!.height,
      )
    }

    await page.screenshot({
      path: testInfo.outputPath('introduction.png'),
    })

    await page.getByRole('button', { name: 'Menu +' }).click()
    await page.getByRole('link', { name: /02 Selected Work/ }).click()

    await expect(page.locator('#work')).toBeFocused()

    await expect
      .poll(() =>
        page
          .locator('#work')
          .evaluate(el => Math.round(el.getBoundingClientRect().top)),
      )
      .toBe(96)

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    ).toBeLessThanOrEqual(1)

    await page.screenshot({
      path: testInfo.outputPath('work.png'),
    })
  })
}

test('both real previews load and project source URLs respond', async ({
  page,
  request,
}) => {
  test.setTimeout(60000)

  await page.goto('/')

  for (const iframe of await page.locator('iframe').all()) {
    await iframe.scrollIntoViewIfNeeded()

    const frame = await iframe.contentFrame()

    await expect(frame.locator('body')).not.toBeEmpty({
      timeout: 20000,
    })

    const response = await request.get(
      (await iframe.getAttribute('src'))!,
    )

    expect(response.ok()).toBeTruthy()

    expect(response.headers()['x-frame-options'] ?? '').not.toMatch(
      /deny|sameorigin/i,
    )
  }

  const sources = await page
    .getByRole('link', { name: /View source code/ })
    .evaluateAll(links =>
      links.map(link => (link as HTMLAnchorElement).href),
    )

  expect(sources).toHaveLength(5)

  for (const url of sources) {
    const response = await request.get(url)

    expect(response.status(), url).toBeLessThan(400)
  }
})

for (const [width, height] of [
  [1440, 900],
  [1920, 1080],
  [1024, 900],
  [768, 900],
  [390, 844],
  [390, 667],
  [375, 812],
  [320, 740],
]) {
  test(`layout fits ${width}×${height}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )

    expect(overflow).toBeLessThanOrEqual(1)

    const journey = page.locator('[data-journey-content]')

    await expect(journey).toHaveCount(7)

    for (const heading of await page.locator('h1, h2, h3').all()) {
      const box = await heading.boundingBox()

      expect(box?.x).toBeGreaterThanOrEqual(-1)
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
        width + 1,
      )

      expect(
        await heading.evaluate(el => el.scrollWidth - el.clientWidth),
      ).toBeLessThanOrEqual(1)
    }

    await page.locator('#building-next').scrollIntoViewIfNeeded()

    await page.screenshot({
      path: testInfo.outputPath('building-next.png'),
    })

    await page.locator('#stack').scrollIntoViewIfNeeded()

    await page.screenshot({
      path: testInfo.outputPath('stack.png'),
    })

    await page.screenshot({
      path: testInfo.outputPath('page.png'),
      fullPage: true,
    })
  })
}

test('Building Next supports keyboard interaction', async ({ page }) => {
  await page.goto('/')

  await page.locator('#building-next').scrollIntoViewIfNeeded()

  const project = page
    .locator('#building-next')
    .getByRole('button')
    .first()

  await project.focus()

  await expect(project).toBeFocused()
  await expect(project).toHaveAttribute('aria-expanded', 'false')

  await page.keyboard.press('Enter')

  await expect(project).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Enter')

  await expect(project).toHaveAttribute('aria-expanded', 'false')

  await page.keyboard.press('Space')

  await expect(project).toHaveAttribute('aria-expanded', 'true')
})