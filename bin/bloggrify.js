#!/usr/bin/env node
import { createJiti } from 'jiti'
import { fileURLToPath } from 'url'

const jiti = createJiti(fileURLToPath(import.meta.url))

const { run } = jiti('../cli/index.ts')
run()
