import dotenv from 'dotenv'

// Make sure the environment variables are loaded into node.
dotenv.config()

export const appConfig = {
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
