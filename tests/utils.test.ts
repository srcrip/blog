import { expect, test } from '@playwright/test'
import { extractRichText, slugOrId } from '../src/utils'

test.describe('Utils Functions', () => {
  test('extractRichText handles valid rich text property', () => {
    const property = {
      rich_text: [
        {
          plain_text: 'test-slug'
        }
      ]
    }

    expect(extractRichText(property)).toBe('test-slug')
  })

  test('extractRichText handles empty rich text array', () => {
    const property = {
      rich_text: []
    }

    expect(extractRichText(property)).toBeUndefined()
  })

  test('extractRichText handles null/undefined property', () => {
    expect(extractRichText(null)).toBeUndefined()
    expect(extractRichText(undefined)).toBeUndefined()
  })

  test('extractRichText handles malformed property', () => {
    const property = {
      rich_text: null
    }

    expect(extractRichText(property)).toBeUndefined()
  })

  test('slugOrId returns slug when available', () => {
    const page = {
      id: 'test-id-123',
      properties: {
        Slug: {
          rich_text: [
            {
              plain_text: 'test-slug'
            }
          ]
        }
      }
    }

    expect(slugOrId(page)).toBe('test-slug')
  })

  test('slugOrId returns id when slug unavailable', () => {
    const page = {
      id: 'test-id-123',
      properties: {
        Slug: {
          rich_text: []
        }
      }
    }

    expect(slugOrId(page)).toBe('test-id-123')
  })

  test('slugOrId handles page without properties', () => {
    const page = {
      id: 'test-id-123'
    }

    expect(slugOrId(page)).toBe('test-id-123')
  })
})

test.describe('getPages Function - Integration', () => {
  test('getPages integration via API endpoint', async ({ request }) => {
    const response = await request.get('/')

    // If homepage loads, the getPages function worked
    expect(response.status()).toBe(200)
  })

  test('database structure validation via RSS feed', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const rssContent = await response.text()

    // If RSS contains items, the database and getPages worked
    expect(rssContent).toContain('<item>')
    expect(rssContent).toContain('<title>')
    expect(rssContent).toContain('<link>')
  })
})
