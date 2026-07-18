import { onMounted, shallowRef } from 'vue'
import type { ShallowRef } from 'vue'

export interface ServiceDataState<T> {
  data: ShallowRef<T | null>
  error: ShallowRef<Error | null>
  isLoading: ShallowRef<boolean>
  load: () => Promise<void>
}

export function useServiceData<T>(loader: () => Promise<T>): ServiceDataState<T> {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<Error | null>(null)
  const isLoading = shallowRef(true)

  async function load() {
    isLoading.value = true
    error.value = null

    try {
      data.value = await loader()
    } catch (cause) {
      error.value = cause instanceof Error ? cause : new Error('Nao foi possivel carregar os dados.')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)

  return { data, error, isLoading, load }
}
