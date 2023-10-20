export const NOTION_BLOCK_TYPES = [
  'title',
  'heading_1',
  'heading_2',
  'heading_3',
  'rich_text',
  'multi_select',
  'checkbox',
  'people',
  'paragraph',
  'toggle',
  'to_do',
  'bulleted_list_item',
  'numbered_list_item'
] as const

export const NOTION_COLORS = [
  'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red'
] as const

export type BlockType = (typeof NOTION_BLOCK_TYPES)[number]

export interface NotionBlock {
  id: string
  type: BlockType
  [key: string]: any
}

export interface NumberedListItemBlock extends NotionBlock {
  numbered_list_item: { text: RichTextBlock[] }
  siblings: Array<{ numbered_list_item: { text: RichTextBlock[] } }>
}

export interface BulletedListItemBlock extends NotionBlock {
  bulleted_list_item: {
    text: RichTextBlock[]
  }
  siblings: Array<{
    bulleted_list_item: {
      text: RichTextBlock[]
    }
  }>
}

export interface TagBlock extends NotionBlock {
  id: string
  name: string
  color: string
}

export type NotionColorFg = (typeof NOTION_COLORS)[number]
export type NotionColorBg = `${NotionColorFg}_background`
export type NotionColor = NotionColorFg | NotionColorBg

export interface RichTextBlock {
  text: {
    content: string
    link: null | { url: string }
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: NotionColor
  }
}
