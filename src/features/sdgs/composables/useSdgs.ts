import { computed } from 'vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import { sdgsService } from '../services/sdgs.service'

export function useSdgs() {
  const state = useServiceData(async () => {
    const response = await sdgsService.list()
    return response.data
  })

  return {
    ...state,
    sdgs: computed(() => state.data.value?.items ?? []),
  }
}
