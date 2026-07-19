import { computed, ref } from 'vue'
import type { MetricItem } from '@/shared/components/MetricRail.vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import { agentsService } from '../services/agents.service'
import type { ActionRole, AgentListItem, EntityType } from '../types/agent.types'

const countByType = (items: readonly AgentListItem[], type: EntityType) =>
  items.filter((agent) => agent.type === type).length

const countByRole = (items: readonly AgentListItem[], role: ActionRole) =>
  items.filter((agent) => agent.roles.includes(role)).length

const countDistinct = (items: readonly string[]) => new Set(items).size

const countRelatedOds = (items: readonly AgentListItem[]) =>
  new Set(items.flatMap((agent) => agent.ods.map((ods) => ods.code))).size

function buildMetrics(
  filteredItems: readonly AgentListItem[],
  totalItems: readonly AgentListItem[],
  showTotal: boolean,
): MetricItem[] {
  const withTotal = (value: number, totalValue: number, label: string): MetricItem => ({
    value,
    totalValue: showTotal ? totalValue : undefined,
    label,
  })

  return [
    withTotal(filteredItems.length, totalItems.length, 'total'),
    withTotal(countByType(filteredItems, 'MUNICIPALITY'), countByType(totalItems, 'MUNICIPALITY'), 'prefeituras'),
    withTotal(countByType(filteredItems, 'NGO'), countByType(totalItems, 'NGO'), 'ONGs'),
    withTotal(countByType(filteredItems, 'HOTEL'), countByType(totalItems, 'HOTEL'), 'hot\u00e9is'),
    withTotal(countByType(filteredItems, 'COMPANY'), countByType(totalItems, 'COMPANY'), 'empresas'),
    withTotal(countByType(filteredItems, 'AGENCY'), countByType(totalItems, 'AGENCY'), 'ag\u00eancias'),
    withTotal(countByType(filteredItems, 'OTHER'), countByType(totalItems, 'OTHER'), 'outros'),
    withTotal(countByRole(filteredItems, 'OWNER'), countByRole(totalItems, 'OWNER'), 'respons\u00e1veis'),
    withTotal(
      countByRole(filteredItems, 'IMPLEMENTATION_PARTNER'),
      countByRole(totalItems, 'IMPLEMENTATION_PARTNER'),
      'parceiros de\nimplementa\u00e7\u00e3o',
    ),
    withTotal(
      countByRole(filteredItems, 'CONTRIBUTING_PARTNER'),
      countByRole(totalItems, 'CONTRIBUTING_PARTNER'),
      'parceiros de\ncontribui\u00e7\u00e3o',
    ),
    withTotal(
      countDistinct(filteredItems.map((agent) => agent.state)),
      countDistinct(totalItems.map((agent) => agent.state)),
      'estados\nrepresentados',
    ),
    withTotal(
      countDistinct(filteredItems.map((agent) => agent.city)),
      countDistinct(totalItems.map((agent) => agent.city)),
      'cidades\nrepresentadas',
    ),
    withTotal(countRelatedOds(filteredItems), countRelatedOds(totalItems), 'ODS\nrelacionadas'),
  ]
}

export function useAgents() {
  const search = ref('')
  const type = ref('')
  const region = ref('')
  const state = ref('')
  const city = ref('')
  const ownersOnly = ref(false)
  const implementationPartnersOnly = ref(false)
  const contributingPartnersOnly = ref(false)
  const selectedOdsCodes = ref<number[]>([])

  const stateData = useServiceData(async () => {
    const response = await agentsService.getOverview()
    return response.data
  })

  const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase('pt-BR'))
  const allAgents = computed(() => stateData.data.value?.agents ?? [])
  const hasActiveFilters = computed(
    () =>
      Boolean(normalizedSearch.value) ||
      Boolean(type.value) ||
      Boolean(region.value) ||
      Boolean(state.value) ||
      Boolean(city.value) ||
      ownersOnly.value ||
      implementationPartnersOnly.value ||
      contributingPartnersOnly.value ||
      selectedOdsCodes.value.length > 0,
  )
  const agents = computed(() =>
    allAgents.value.filter((agent) => {
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
  const metrics = computed(() => buildMetrics(agents.value, allAgents.value, hasActiveFilters.value))

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
    metrics,
    availableOds: computed(() => stateData.data.value?.availableOds ?? []),
    agents,
  }
}
