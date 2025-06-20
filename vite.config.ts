import { sveltekit } from '@sveltejs/kit/vite'

const hmrWatch = {
  name: 'watch-content',
  handleHotUpdate (ctx) {
    console.log('HMR: Fetching Notion pages...')

    // reload(false)

    return ctx.modules
  }
}

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), hmrWatch]
}

export default config
