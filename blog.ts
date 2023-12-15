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

async function writeJsonFile(name, content) {
  mkdir('./tmp', { recursive: true }, (err) => {
    if (err) throw err
  })

  writeFile(`./tmp/${name}.json`, JSON.stringify(content), (err) => {
    if (err) throw err
    console.log(`${name} has been saved!`)
  })
}

async function getBlogContent() {
  const database: any = await getDatabase().catch((err) => {
    if (err) throw err
  })

  // A list of pages with no content, to remove from the index.
  const skipPages: any[] = []

  for (const { id, properties } of database) {
    if (!properties.Published.checkbox) {
      skipPages.push(id)
      continue
    }

    const result = await getAllBlocks(id).catch((err) => {
      if (err) throw err
    })

    const page = getAsSensiblyStructuredBlocks(getSupportedBlocks(result))

    if (result && result.length > 0) {
      const slugOrId =
        properties?.['Slug']?.['rich_text']?.[0]?.['plain_text'] ?? id

      writeJsonFile(slugOrId, page)
    } else {
      skipPages.push(id)
    }
  }

  writeJsonFile(
    'database',
    database.filter((x) => !skipPages.includes(x.id))
  )

  return database
}

export async function loadBlog() {
  console.log('clearing tmp folder')

  await rm('./tmp', { force: true, recursive: true })

  return getBlogContent()
}
