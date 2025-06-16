import type { RequestHandler } from './$types'
import { getPages } from '../../utils'

const data = await getPages()

const site = "https://blog.src.rip"

const getPaths = () => {
  return data.map((post) => {
    return {
      path: `/blog/${post.id}`
    }
  })
}

const posts = [
  { path: "/" },
  { path: "/consulting" },
  ...getPaths()
]

export const GET: RequestHandler = async () => {
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map(
          ({ path }) =>
            `
      <url>
        <loc>${site + path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
      `
        )
        .join("")}

    </urlset>
  `.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      }
    }
  )
}
