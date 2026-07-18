import { computed, ref } from 'vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import { agentsService } from '../services/agents.service'

export function useAgents() {
  const search = ref('Prefeitura')
  const type = ref('')
  const region = ref('northeast')
  const state = ref('')
  const city = ref('')
  const ownersOnly = ref(false)
  const implementationPartnersOnly = ref(false)
  const contributingPartnersOnly = ref(false)
  const selectedOdsCodes = ref<number[]>([1, 3])

  const stateData = useServiceData(async () => {
    const response = await agentsService.getOverview()
    return response.data
  })

  const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase('pt-BR'))
  const agents = computed(() =>
    (stateData.data.value?.agents ?? []).filter((agent) => {
      const matchesSearch =
        !normalizedSearch.value || agent.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch.value)
      const matchesType = !type.value || agent.type === type.value
      const matchesRegion = !region.value || agent.region === region.value
      const matchesState = !state.value || agent.state === state.value
      const matchesCity = !city.value || agent.city === city.value
      const matchesOwner = !ownersOnly.value || agent.roles.includes('OWNER')
      const matchesImplementation =
        !implementationPartnersOnly.value || agent.roles.includes('IMPLEMENTATION_PARTNER')
      const matchesContribution =
        !contributingPartnersOnly.value || agent.roles.includes('CONTRIBUTING_PARTNER')
      const matchesOds =
        selectedOdsCodes.value.length === 0 ||
        selectedOdsCodes.value.some((code) => agent.ods.some((ods) => ods.code === code))

      return (
        matchesSearch &&
        matchesType &&
        matchesRegion &&
        matchesState &&
        matchesCity &&
        matchesOwner &&
        matchesImplementation &&
        matchesContribution &&
        matchesOds
      )
    }),
  )

  return {
    ...stateData,
    search,
    type,
    region,
    state,
    city,
    ownersOnly,
    implementationPartnersOnly,
    contributingPartnersOnly,
    selectedOdsCodes,
    metrics: computed(() => stateData.data.value?.metrics ?? []),
    availableOds: computed(() => stateData.data.value?.availableOds ?? []),
    agents,
  }
}
