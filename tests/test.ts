import { expect, test } from '@playwright/test'

test('home page has expected h1', async ({ page }) => {
  await page.goto('/')
  const header = await page.textContent('h1')
  expect(header).toBe('blog.src.rip')
})
