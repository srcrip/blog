export const slugOrId = (page: any) => {
  return extractRichText(page?.properties?.Slug) ?? page.id
}

// Notion splits text into multiple segments wherever the formatting changes
// (e.g. inline code), so join them all back together.
const joinPlainText = (segments: any[] | undefined) =>
  segments?.map(segment => segment.plain_text).join('') || undefined

export const extractRichText = (property: any) =>
  joinPlainText(property?.rich_text)

export const extractTitle = (property: any) =>
  joinPlainText(property?.title)

export const getPages = async () => {
  try {
    const { default: data } = await import('../tmp/database.json')

    const slugs = new Set()
    if (
      data.some((post) => {
        const slug = extractRichText(post.properties.Slug)

        if (!slug) {
          return false
        } else {
          if (slugs.has(slug)) {
            return true
          }
          slugs.add(slug)
          return false
        }
      })
    ) {
      throw new Error('Error: Duplicate slug. Go fix it in notion!')
    }

    return data
  } catch (err) {
    console.error(err)
    return undefined
  }
}
