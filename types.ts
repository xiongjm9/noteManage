export interface Course {
  id: string
  title: string
  description: string
  tag: string
  category: string
  duration: string
  image: string
  type: 'video' | 'audio' | 'lab'
  instructors?: string[]
  learners?: string
}

export interface AppData {
  notes: any[]
  progress: Record<string, any>
}
