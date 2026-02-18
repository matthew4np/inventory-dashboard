import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    env: {
    POSTGRES_URL: "postgresql://neondb_owner:npg_0LtVyYF7eURx@ep-still-night-ahrrt12o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
    },
    // Sets the project root; all other paths will be relative to this
    root: './', 
    
    // Limits Vitest to only look for tests in this specific folder
    dir: './IntegrationTest'
  },
})