import { initializeApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public.firebaseConfig

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  const auth = getAuth(app)
  const db = getFirestore(app, firebaseConfig.databaseId)

  const user = useState<User | null>('firebase_user', () => null)
  const loading = useState<boolean>('firebase_loading', () => true)

  if (process.client) {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  return {
    provide: {
      auth,
      db,
      user,
      loading
    }
  }
})
