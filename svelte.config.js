import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const getDatabase = async () => {
  try {
    const { default: database } = await import('./tmp/database.json', {
      assert: { type: 'json' }
    })

    return database
  } catch {
    return []
  }
}

const getEntries = async () => {
  const database = await getDatabase()

  return [
    '/',
    ...database.map((page) => {
      return `/blog/${page.id}`
    })
  ]
}

// const pages = await db()

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: true
  }),
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    prerender: {
      entries: await getEntries()
      // entries: [
      //   '/',
      //   ...pages
      // ]
    }
  }
}

export default config
