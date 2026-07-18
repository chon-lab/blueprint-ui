import { computed } from 'vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import { dashboardService } from '../services/dashboard.service'

export function useDashboard() {
  const state = useServiceData(async () => {
    const response = await dashboardService.getOverview()
    return response.data
  })

  return {
    ...state,
    indicators: computed(() => state.data.value?.indicators ?? []),
    rankings: computed(() => state.data.value?.rankings ?? []),
  }
}
