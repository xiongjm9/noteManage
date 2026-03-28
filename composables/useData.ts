export const useData = () => {
  const data = useState<any>('app_data', () => ({ notes: [], progress: {} }))
  const loading = useState<boolean>('app_data_loading', () => true)

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await $fetch<any>('/api/data')
      data.value = res
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      loading.value = false
    }
  }

  const saveData = async (newData: any) => {
    try {
      await $fetch('/api/data', {
        method: 'POST',
        body: newData
      })
      data.value = newData
    } catch (err) {
      console.error('Failed to save data:', err)
    }
  }

  return {
    data,
    loading,
    fetchData,
    saveData
  }
}
