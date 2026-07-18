import { httpClient, shouldUseApi } from '@/shared/api'
import { agentsMock } from '../data/agents.mock'
import type { AgentsQuery, AgentsResponse } from '../types/agent.types'

export interface AgentsService {
  getOverview(query?: AgentsQuery): Promise<AgentsResponse>
}

const apiAgentsService: AgentsService = {
  getOverview: (query) =>
    httpClient.get('entities', {
      query: {
        search: query?.search,
        type: query?.type,
        region: query?.region,
        state: query?.state,
        city: query?.city,
        roles: query?.roles?.join(','),
        odsCodes: query?.odsCodes?.join(','),
      },
    }),
}

const mockAgentsService: AgentsService = {
  getOverview: async () => ({ data: agentsMock }),
}

export const agentsService = shouldUseApi ? apiAgentsService : mockAgentsService
