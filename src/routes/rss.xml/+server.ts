import type { RequestHandler } from "./$types"
import { extractRichText, slugOrId } from "../../utils"

export const prerender = true

export const GET: RequestHandler = async () => {
  const { default: database } = await import('../../../tmp/database.json')

  console.log('Total pages:', database.length)
  console.log('First page properties:', database[0]?.properties)
  
  const publishedPages = database.filter(
    page => page.properties?.Published?.checkbox === true
  )
  
  console.log('Published pages:', publishedPages.length)

  const siteUrl = "https://blog.src.rip"
  const blogTitle = "src.rip"
  const blogDescription = "Thoughts on software engineering and technology"
  
  const rssItems = publishedPages
    .sort((a, b) => new Date(b.last_edited_time).getTime() - new Date(a.last_edited_time).getTime())
    .map(page => {
      const title = page.properties?.Name?.title?.[0]?.plain_text || "Untitled"
      const summary = extractRichText(page.properties?.Summary) || ""
      const slug = slugOrId(page)
      const pubDate = new Date(page.last_edited_time).toUTCString()
      const link = `${siteUrl}/blog/${slug}`

      return `
    <item>
      <title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
      <description>${summary.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blogTitle}</title>
    <description>${blogDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <generator>SvelteKit</generator>${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600"
    }
  })
}

