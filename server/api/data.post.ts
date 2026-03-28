import fs from 'fs/promises'
import path from 'path'
import { DATA_PATH } from '../utils/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(DATA_PATH)
    await fs.mkdir(dataDir, { recursive: true })
    
    // Save the data
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to save data: ${error.message}`
    })
  }
})
