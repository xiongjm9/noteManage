import fs from 'fs/promises'
import { DATA_PATH } from '../utils/data'

export default defineEventHandler(async (event) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return default structure
    return { notes: [], progress: {} }
  }
})
