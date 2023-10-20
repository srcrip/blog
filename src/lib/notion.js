import { Client } from '@notionhq/client'
// import { appConfig } from './config'
import dotenv from 'dotenv'

// Make sure the environment variables are loaded into node.
dotenv.config()

const appConfig = {
  notion: {
    token: String(process.env.NOTION_TOKEN),
    databaseId: String(process.env.NOTION_DATABASE_ID)
  },
  properties: {
    title: 'title',
    summary: 'summary',
    tags: 'tags',
    published: 'published'
  }
}

const { token, databaseId: notionDatabaseId } = appConfig.notion

// Initialize the Notion client
export const notionClient = new Client({
  auth: token
})

export const getDatabase = async (databaseId = notionDatabaseId) => {
  const { results } = await notionClient.databases.query({
    database_id: databaseId
  })
  return results
}

export const getPage = async (pageId) =>
  await notionClient.pages.retrieve({ page_id: pageId })

export const getBlocks = async (blockId) => {
  const { results } = await notionClient.blocks.children.list({
    block_id: blockId
  })
  return results
}

export async function getAllBlocks(notebookId) {
  const maxTries = 5;
  const listChildren = async (cursor = undefined, accumulatedBlocks = []) => {
    const response = await notionClient.blocks.children.list({
      block_id: notebookId,
      page_size: 100,
      start_cursor: cursor,
    });

    const blocks = [...accumulatedBlocks, ...response.results];

    if (!response.next_cursor) {
      return blocks;
    }

    const newBlocks = retryFn(
      () => listChildren(response.next_cursor, blocks),
      maxTries
    )

    return newBlocks;
  }

  const blocks = await retryFn(
    () => listChildren(),
    maxTries
  )

  return blocks;
}

export async function retryFn(fn, maxTries, ...args) {
  let tries = 0
  while (tries <= maxTries) {
    try {
      return fn(...args)
    } catch (e) {
      const waitTime = 500 * 2 ** tries
      await sleep(waitTime)
      tries += 1
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const isEmptyParagraph = (block) =>
  block.type === 'paragraph' &&
  block.paragraph.text &&
  block.paragraph.text.length === 0

export const getSupportedBlocks = (result) =>
  result.filter((block) => block.type !== 'unsupported')

export const getNonEmptyParagraphs = (result) =>
  result.filter(
    (block) => block.type !== 'paragraph' || !isEmptyParagraph(block)
  )

export const notionConfig = {
  couldBeNonSequencedTypes: [
    'toggle',
    'to_do',
    'bulleted_list_item',
    'numbered_list_item'
  ]
}

// the very same result, with consideration of blocks that make sense as siblings under one root block/first sibling, rather than independent blocks. The blocks that are indentified as siblings, their index gets eaten up, and they get added to the first of their type as siblings.
export const getAsSensiblyStructuredBlocks = (result) => {
  const ret = [result[0]]
  for (let blockIndex = 1; blockIndex < result.length; blockIndex++) {
    if (
      notionConfig.couldBeNonSequencedTypes.includes(result[blockIndex].type) &&
      !isEmptyParagraph(result[blockIndex - 1]) &&
      result[blockIndex].type === result[blockIndex - 1].type
    ) {
      if (!ret[ret.length - 1].siblings) ret[ret.length - 1].siblings = []
      ret[ret.length - 1].siblings.push(result[blockIndex])
    } else {
      ret.push(result[blockIndex])
    }
  }
  return ret
}
