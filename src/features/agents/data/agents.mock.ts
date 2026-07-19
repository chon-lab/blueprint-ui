import { locationCatalog } from '@/shared/domain/geography'
import { odsCatalog } from '@/shared/domain/ods-catalog'
import type {
  ActionRole,
  AgentListItem,
  AgentsPageData,
  EntityType,
} from '../types/agent.types'

const entityTypes: EntityType[] = ['MUNICIPALITY', 'NGO', 'HOTEL', 'COMPANY', 'AGENCY', 'OTHER']

const typeLabels: Record<EntityType, string> = {
  MUNICIPALITY: 'Prefeitura',
  NGO: 'ONG',
  HOTEL: 'Hotel',
  COMPANY: 'Empresa',
  AGENCY: 'Ag\u00eancia',
  OTHER: 'Outro',
}

const rolePatterns: ActionRole[][] = [
  ['OWNER'],
  ['IMPLEMENTATION_PARTNER'],
  ['CONTRIBUTING_PARTNER'],
  ['OWNER', 'IMPLEMENTATION_PARTNER'],
  ['IMPLEMENTATION_PARTNER', 'CONTRIBUTING_PARTNER'],
  ['OWNER', 'IMPLEMENTATION_PARTNER', 'CONTRIBUTING_PARTNER'],
]

const nameByType: Record<EntityType, (city: string, sequence: number) => string> = {
  MUNICIPALITY: (city) => `Prefeitura de ${city}`,
  NGO: (city) => `Instituto ${city} Sustent\u00e1vel`,
  HOTEL: (city, sequence) => `Hotel Horizonte ${city} ${sequence}`,
  COMPANY: (city) => `Turismo Criativo ${city}`,
  AGENCY: (city) => `Ag\u00eancia Destino ${city}`,
  OTHER: (city) => `Observat\u00f3rio do Turismo de ${city}`,
}

const agents: AgentListItem[] = Array.from({ length: 36 }, (_, index) => {
  const location = locationCatalog[index % locationCatalog.length]!
  const cycle = Math.floor(index / locationCatalog.length)
  const type = entityTypes[(index + cycle) % entityTypes.length]!
  const actionCount = ((index * 7) % 48) + 3
  const firstOdsIndex = (index * 2) % odsCatalog.length
  const ods = [
    odsCatalog[firstOdsIndex]!,
    odsCatalog[(firstOdsIndex + 5) % odsCatalog.length]!,
    odsCatalog[(firstOdsIndex + 11) % odsCatalog.length]!,
  ].map((item, odsIndex) => ({
    ...item,
    actionCount: Math.min(actionCount, ((index + 3) * (odsIndex + 2)) % actionCount + 1),
  }))

  return {
    id: `agent-${index + 1}`,
    name: nameByType[type](location.cityLabel, cycle + 1),
    type,
    typeLabel: typeLabels[type],
    region: location.region,
    state: location.state,
    stateLabel: location.stateLabel,
    city: location.city,
    cityLabel: location.cityLabel,
    actionCount,
    ods,
    roles: rolePatterns[index % rolePatterns.length]!,
  }
})

const countByType = (type: EntityType) => agents.filter((agent) => agent.type === type).length
const countByRole = (role: ActionRole) => agents.filter((agent) => agent.roles.includes(role)).length
const countDistinct = (items: readonly string[]) => new Set(items).size
const relatedOdsCount = new Set(agents.flatMap((agent) => agent.ods.map((ods) => ods.code))).size

export const agentsMock: AgentsPageData = {
  availableOds: odsCatalog,
  metrics: [
    { value: agents.length, label: 'total' },
    { value: countByType('MUNICIPALITY'), label: 'prefeituras' },
    { value: countByType('NGO'), label: 'ONGs' },
    { value: countByType('HOTEL'), label: 'hot\u00e9is' },
    { value: countByType('COMPANY'), label: 'empresas' },
    { value: countByType('AGENCY'), label: 'ag\u00eancias' },
    { value: countByType('OTHER'), label: 'outros' },
    { value: countByRole('OWNER'), label: 'respons\u00e1veis' },
    { value: countByRole('IMPLEMENTATION_PARTNER'), label: 'parceiros de\nimplementa\u00e7\u00e3o' },
    { value: countByRole('CONTRIBUTING_PARTNER'), label: 'parceiros de\ncontribui\u00e7\u00e3o' },
    { value: countDistinct(agents.map((agent) => agent.state)), label: 'estados\nrepresentados' },
    { value: countDistinct(agents.map((agent) => agent.city)), label: 'cidades\nrepresentadas' },
    { value: relatedOdsCount, label: 'ODS\nrelacionadas' },
  ],
  agents,
}
