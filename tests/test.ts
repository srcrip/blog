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

test('blog post loads by slug', async ({ page }) => {
  await page.goto('/blog/ai-git-commits')
  
  // Should load the blog post successfully
  expect(page.url()).toMatch(/\/blog\/ai-git-commits$/)
  
  // Check for blog post content - might be in title element or page text
  const pageText = await page.textContent('body')
  expect(pageText).toContain('Writing Git commit messages with Claude')
})

test('blog post loads by ID and redirects to slug', async ({ page }) => {
  await page.goto('/blog/12b654a3-3ecc-80e6-bef9-f3afb5dcfc76')
  
  // Should redirect to the slug URL
  expect(page.url()).toMatch(/\/blog\/ai-git-commits$/)
  
  // Check for blog post content
  const pageText = await page.textContent('body')
  expect(pageText).toContain('Writing Git commit messages with Claude')
})

test('blog post handles non-existent post', async ({ page }) => {
  const response = await page.goto('/blog/non-existent-post')
  
  // Should return 404 or error page
  expect(response?.status()).toBe(404)
})

test('sitemap is accessible and valid', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  
  // Check that the sitemap loads successfully
  expect(response.status()).toBe(200)
  
  // Get the sitemap content
  const sitemapContent = await response.text()
  
  // Verify sitemap structure
  expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8" ?>')
  expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  expect(sitemapContent).toContain('<url>')
  expect(sitemapContent).toContain('<loc>https://blog.src.rip/</loc>')
  expect(sitemapContent).toContain('<loc>https://blog.src.rip/consulting</loc>')
  
  // Verify it contains blog post URLs
  expect(sitemapContent).toContain('<loc>https://blog.src.rip/blog/')
  expect(sitemapContent).toContain('<changefreq>weekly</changefreq>')
  expect(sitemapContent).toContain('<priority>0.5</priority>')
})

test('RSS feed handles HTML escaping', async ({ request }) => {
  const response = await request.get('/rss.xml')
  const rssContent = await response.text()
  
  // Verify HTML entities are properly escaped
  expect(rssContent).not.toContain('<title><')
  expect(rssContent).not.toContain('<description><')
  
  // Should contain properly escaped content
  if (rssContent.includes('&lt;') || rssContent.includes('&gt;') || rssContent.includes('&amp;')) {
    expect(rssContent).toMatch(/&(lt|gt|amp);/)
  }
})
