import { computed, ref } from 'vue'
import { useServiceData } from '@/shared/composables/useServiceData'
import type { MetricItem } from '@/shared/components/MetricRail.vue'
import { actionsService } from '../services/actions.service'
import type { ActionImpactType, ActionListItem } from '../types/action.types'

const hasPublicParticipation = (action: ActionListItem) =>
  /prefeitura|embratur|ag[êe]ncia/i.test(action.ownerName)

const countByImpact = (items: readonly ActionListItem[], impactType: ActionImpactType) =>
  items.filter((action) => action.impactType === impactType).length

const publicParticipationRate = (items: readonly ActionListItem[]) => {
  if (items.length === 0) return '0%'

  return `${Math.round((items.filter(hasPublicParticipation).length / items.length) * 100)}%`
}

const countDistinct = (items: readonly string[]) => new Set(items).size

const countRelatedOds = (items: readonly ActionListItem[]) =>
  new Set(items.flatMap((action) => action.relatedOds.map((ods) => ods.code))).size

const averageRelatedOds = (items: readonly ActionListItem[]) => {
  if (items.length === 0) return 0

  const relationshipCount = items.reduce((total, action) => total + action.relatedOds.length, 0)
  return Number((relationshipCount / items.length).toFixed(1))
}

function buildMetrics(
  filteredItems: readonly ActionListItem[],
  totalItems: readonly ActionListItem[],
  showTotal: boolean,
): MetricItem[] {
  const withTotal = (value: string | number, totalValue: string | number, label: string): MetricItem => ({
    value,
    totalValue: showTotal ? totalValue : undefined,
    label,
  })

  return [
    withTotal(filteredItems.length, totalItems.length, 'total'),
    withTotal(
      countByImpact(filteredItems, 'FOUNDATIONAL_ACTION'),
      countByImpact(totalItems, 'FOUNDATIONAL_ACTION'),
      'a\u00e7\u00f5es\nde base',
    ),
    withTotal(
      countByImpact(filteredItems, 'DIRECTLY_IMPACTS'),
      countByImpact(totalItems, 'DIRECTLY_IMPACTS'),
      'a\u00e7\u00f5es com\nimpacto direto',
    ),
    withTotal(
      countByImpact(filteredItems, 'INDIRECTLY_IMPACTS'),
      countByImpact(totalItems, 'INDIRECTLY_IMPACTS'),
      'a\u00e7\u00f5es com\nimpacto indireto',
    ),
    withTotal(
      publicParticipationRate(filteredItems),
      publicParticipationRate(totalItems),
      'a\u00e7\u00f5es com\nparticipa\u00e7\u00e3o p\u00fablica',
    ),
    withTotal(countRelatedOds(filteredItems), countRelatedOds(totalItems), 'ODS\nrelacionadas'),
    withTotal(
      countDistinct(filteredItems.map((action) => action.state)),
      countDistinct(totalItems.map((action) => action.state)),
      'estados\ncontemplados',
    ),
    withTotal(
      countDistinct(filteredItems.map((action) => action.city)),
      countDistinct(totalItems.map((action) => action.city)),
      'cidades\ncontempladas',
    ),
    withTotal(
      countDistinct(filteredItems.map((action) => action.region)),
      countDistinct(totalItems.map((action) => action.region)),
      'regi\u00f5es\ncontempladas',
    ),
    withTotal(
      countDistinct(filteredItems.map((action) => action.ownerName)),
      countDistinct(totalItems.map((action) => action.ownerName)),
      'agentes\nrespons\u00e1veis',
    ),
    withTotal(
      filteredItems.filter((action) => action.relatedOds.length > 1).length,
      totalItems.filter((action) => action.relatedOds.length > 1).length,
      'a\u00e7\u00f5es com\nm\u00faltiplas ODS',
    ),
    withTotal(
      averageRelatedOds(filteredItems),
      averageRelatedOds(totalItems),
      'm\u00e9dia de ODS\npor a\u00e7\u00e3o',
    ),
    withTotal(
      filteredItems.filter(hasPublicParticipation).length,
      totalItems.filter(hasPublicParticipation).length,
      'a\u00e7\u00f5es com\nagentes p\u00fablicos',
    ),
  ]
}

export function useActions() {
  const search = ref('')
  const impactType = ref<ActionImpactType | ''>('')
  const region = ref('')
  const state = ref('')
  const city = ref('')
  const selectedOdsCodes = ref<number[]>([])

  const stateData = useServiceData(async () => {
    const response = await actionsService.getOverview()
    return response.data
  })

  const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase('pt-BR'))
  const allActions = computed(() => stateData.data.value?.actions ?? [])
  const hasActiveFilters = computed(
    () =>
      Boolean(normalizedSearch.value) ||
      Boolean(impactType.value) ||
      Boolean(region.value) ||
      Boolean(state.value) ||
      Boolean(city.value) ||
      selectedOdsCodes.value.length > 0,
  )
  const actions = computed(() =>
    allActions.value.filter((action) => {
      const matchesSearch =
        !normalizedSearch.value ||
        action.title.toLocaleLowerCase('pt-BR').includes(normalizedSearch.value) ||
        action.ownerName.toLocaleLowerCase('pt-BR').includes(normalizedSearch.value)
      const matchesType = !impactType.value || action.impactType === impactType.value
      const matchesRegion = !region.value || action.region === region.value
      const matchesState = !state.value || action.state === state.value
      const matchesCity = !city.value || action.city === city.value
      const matchesOds =
        selectedOdsCodes.value.length === 0 ||
        action.relatedOds.some((ods) => selectedOdsCodes.value.includes(ods.code))

      return matchesSearch && matchesType && matchesRegion && matchesState && matchesCity && matchesOds
    }),
  )
  const metrics = computed(() => buildMetrics(actions.value, allActions.value, hasActiveFilters.value))

  return {
    ...stateData,
    search,
    impactType,
    region,
    state,
    city,
    selectedOdsCodes,
    metrics,
    availableOds: computed(() => stateData.data.value?.availableOds ?? []),
    actions,
  }
}
