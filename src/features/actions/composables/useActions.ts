import { computed, ref } from 'vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import { actionsService } from '../services/actions.service'
import type { ActionImpactType } from '../types/action.types'

export function useActions() {
  const search = ref('')
  const impactType = ref<ActionImpactType | ''>('')
  const region = ref('northeast')
  const state = ref('')
  const city = ref('campina-grande')
  const selectedOdsCodes = ref<number[]>([])

  const stateData = useServiceData(async () => {
    const response = await actionsService.getOverview()
    return response.data
  })

  const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase('pt-BR'))
  const actions = computed(() =>
    (stateData.data.value?.actions ?? []).filter((action) => {
      const matchesSearch =
        !normalizedSearch.value ||
        action.title.toLocaleLowerCase('pt-BR').includes(normalizedSearch.value) ||
        action.ownerName.toLocaleLowerCase('pt-BR').includes(normalizedSearch.value)
      const matchesType = !impactType.value || action.impactType === impactType.value
      const matchesRegion = !region.value || action.region === region.value
      const matchesState = !state.value || action.state === state.value
      const matchesCity = !city.value || action.city === city.value
      const matchesOds =
        selectedOdsCodes.value.length === 0 || selectedOdsCodes.value.includes(action.ods.code)

      return matchesSearch && matchesType && matchesRegion && matchesState && matchesCity && matchesOds
    }),
  )

  return {
    ...stateData,
    search,
    impactType,
    region,
    state,
    city,
    selectedOdsCodes,
    metrics: computed(() => stateData.data.value?.metrics ?? []),
    availableOds: computed(() => stateData.data.value?.availableOds ?? []),
    actions,
  }
}
