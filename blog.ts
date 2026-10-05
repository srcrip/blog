// Load Notion stuff before the build and save it to disk.
import {
  getDatabase,
  getBlocks,
  getAllBlocks,
  getSupportedBlocks,
  getAsSensiblyStructuredBlocks
} from './src/lib/notion.js'
import { writeFile, mkdir } from 'fs'
import { rm } from 'fs/promises'

async function writeJsonFile (name, content) {
  mkdir('./tmp', { recursive: true }, err => {
    if (err != null) throw err
  })

  writeFile(`./tmp/${name}.json`, JSON.stringify(content), err => {
    if (err != null) throw err
    console.log(`${name} has been saved!`)
  })
}

function warnOnMissingProperties (id, properties) {
  const missing: string[] = []

  if (!properties?.['Published On']?.date?.start) missing.push('Published On')
  if (!properties?.Summary?.rich_text?.[0]?.plain_text) missing.push('Summary')
  if (!properties?.Slug?.rich_text?.[0]?.plain_text) missing.push('Slug')

  if (missing.length > 0) {
    const title =
      properties?.Name?.title?.map(t => t.plain_text).join('') || id
    console.warn(`WARNING: "${title}" is missing: ${missing.join(', ')}`)
  }
}

async function getBlogContent () {
  const database: any = await getDatabase().catch(err => {
    if (err) throw err
  })

  // A list of pages with no content, to remove from the index.
  const skipPages: any[] = []

  // When set, also load pages marked as drafts (for local previewing).
  const includeDrafts = process.env.INCLUDE_DRAFTS === 'true'

  for (const { id, properties } of database) {
    const isPublished = properties.Published?.checkbox
    const isDraft = properties.Draft?.checkbox

    if (!isPublished && !(includeDrafts && isDraft)) {
      skipPages.push(id)
      continue
    }

    const result = await getAllBlocks(id).catch(err => {
      if (err) throw err
    })

    const page = getAsSensiblyStructuredBlocks(getSupportedBlocks(result))

    if (result && result.length > 0) {
      const slugOrId =
        properties?.Slug?.rich_text?.[0]?.plain_text ?? id

      warnOnMissingProperties(id, properties)
      writeJsonFile(slugOrId, page)
    } else {
      skipPages.push(id)
    }
  }

  writeJsonFile(
    'database',
    database.filter(x => !skipPages.includes(x.id))
  )

  return database
}

export async function loadBlog () {
  console.log('clearing tmp folder')

  await rm('./tmp', { force: true, recursive: true })

  return await getBlogContent()
}
