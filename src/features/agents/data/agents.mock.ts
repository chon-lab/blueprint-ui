import type { AgentListItem, AgentsPageData } from '../types/agent.types'
import { odsCatalog } from '@/shared/domain/ods-catalog'

const municipality = (
  id: string,
  name: string,
  state: string,
  stateLabel: string,
  city: string,
  cityLabel: string,
  actionCount: number,
): AgentListItem => ({
  id,
  name,
  type: 'MUNICIPALITY',
  typeLabel: 'Prefeitura',
  region: 'northeast',
  state,
  stateLabel,
  city,
  cityLabel,
  actionCount,
  ods: [
    { code: 3, title: 'Sa\u00fade e Bem-Estar', color: '#4c9f38', softColor: '#e5efdf' },
    { code: 4, title: 'Educa\u00e7\u00e3o de Qualidade', color: '#c5192d', softColor: '#f8e1e4' },
  ],
  roles: ['OWNER', 'IMPLEMENTATION_PARTNER', 'CONTRIBUTING_PARTNER'],
})

export const agentsMock: AgentsPageData = {
  availableOds: odsCatalog,
  metrics: [
    { value: 230, label: 'total' },
    { value: 10, label: 'prefeituras' },
    { value: 73, label: 'ONGs' },
    { value: 73, label: 'hot\u00e9is' },
    { value: 73, label: 'outros' },
  ],
  agents: [
    municipality('campina-grande', 'Prefeitura de Campina Grande', 'paraiba', 'Para\u00edba', 'campina-grande', 'Campina Grande', 34),
    municipality('recife', 'Prefeitura de Recife', 'pernambuco', 'Pernambuco', 'recife', 'Recife', 12),
    municipality('salvador', 'Prefeitura de Salvador', 'bahia', 'Bahia', 'salvador', 'Salvador', 3),
    municipality('natal', 'Prefeitura de Natal', 'rio-grande-do-norte', 'Rio Grande do Norte', 'natal', 'Natal', 33),
    municipality('maceio', 'Prefeitura de Macei\u00f3', 'alagoas', 'Alagoas', 'maceio', 'Macei\u00f3', 54),
    municipality('aracaju', 'Prefeitura de Aracaju', 'sergipe', 'Sergipe', 'aracaju', 'Aracaju', 32),
    municipality('sao-luis', 'Prefeitura de S\u00e3o Lu\u00eds', 'maranhao', 'Maranh\u00e3o', 'sao-luis', 'S\u00e3o Lu\u00eds', 11),
    municipality('teresina', 'Prefeitura de Teresina', 'piaui', 'Piau\u00ed', 'teresina', 'Teresina', 22),
    municipality('porto-seguro', 'Prefeitura de Porto Seguro', 'bahia', 'Bahia', 'porto-seguro', 'Porto Seguro', 33),
    municipality('ipojuca', 'Prefeitura de Ipojuca', 'pernambuco', 'Pernambuco', 'ipojuca', 'Ipojuca', 4),
  ],
}
