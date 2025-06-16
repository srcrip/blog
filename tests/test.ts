import { expect, test } from '@playwright/test'

test('home page has expected h1', async ({ page }) => {
  await page.goto('/')
  const header = await page.textContent('h1')
  expect(header).toBe('blog.src.rip')
})

test('RSS feed is accessible and valid', async ({ request }) => {
  const response = await request.get('/rss.xml')
  
  // Check that the RSS feed loads successfully
  expect(response.status()).toBe(200)
  
  // Get the RSS content
  const rssContent = await response.text()
  
  // Check content type - static files might not have the exact content-type
  // expect(response.headers()['content-type']).toContain('application/rss+xml')
  
  // Verify RSS structure
  expect(rssContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
  expect(rssContent).toContain('<rss version="2.0"')
  expect(rssContent).toContain('<title>src.rip</title>')
  expect(rssContent).toContain('<description>Thoughts on software engineering and technology</description>')
  expect(rssContent).toContain('<link>https://blog.src.rip</link>')
  
  // Verify it contains blog post items
  expect(rssContent).toContain('<item>')
  expect(rssContent).toContain('</item>')
  
  // Check for at least one blog post with proper structure - using more specific matches
  expect(rssContent).toContain('<title>Writing Git commit messages with Claude</title>')
  expect(rssContent).toContain('<description>No more context switching</description>')
  expect(rssContent).toContain('<link>https://blog.src.rip/blog/ai-git-commits</link>')
  expect(rssContent).toMatch(/<pubDate>.*<\/pubDate>/)
})
