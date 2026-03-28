import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { User } from 'firebase/auth'

export const useFirebase = () => {
  const { $auth, $db, $user, $loading } = useNuxtApp()

  return {
    auth: $auth as Auth,
    db: $db as Firestore,
    user: $user as Ref<User | null>,
    loading: $loading as Ref<boolean>
  }
}
