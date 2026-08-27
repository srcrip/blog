import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  testMatch: '**/*.ts',
  webServer: {
    command: 'bun run build && bun run preview',
    port: 4173
  }
}

export default config
