export const slugOrId = (page: any) => {
  return extractRichText(page?.properties?.["Slug"]) ?? page.id
}

export const extractRichText = (property: any) => {
  if (!property) {
    return
  } else {
    return property["rich_text"]?.[0]?.["plain_text"]
  }
}

export const getPages = async () => {
  try {
    const { default: data } = await import('../tmp/database.json')

    const slugs = new Set()
    if (
      data.some((post) => {
        const slug = extractRichText(post.properties["Slug"])

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
