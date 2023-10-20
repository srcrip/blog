import type { PageServerLoad } from './$types'
import { extractRichText } from '../../../utils'
import { redirect } from '@sveltejs/kit'

const makePageData = async (page: any, slugOrId: string) => {
  // TODO: Turn this into a function in utils?
  const { default: blocks } = await import(`../../../../tmp/${slugOrId}.json`)

  const pageData = {
    blocks,
    page
  }

  return pageData
}

export const load: PageServerLoad = async ({ params }) => {
  let { slugOrId } = params
  slugOrId = String(slugOrId)

  const { default: database } = await import('../../../../tmp/database.json')

  for (const page of database) {
    const slug = extractRichText(page.properties?.["Slug"])

    // try to load by slug
    if (slug === slugOrId) {
      const pageData = await makePageData(page, slug)
      return pageData
    }

    // then try to load by id
    if (page.id === slugOrId) {
      // but if this param is an id ...
      // and there is also a valid slug ...
      // then redirect to the slug
      if (slug) {
        throw redirect(308, `/blog/${slug}`)
      } else {
        const pageData = await makePageData(page, page.id)
        return pageData
      }
    }
  }
}
