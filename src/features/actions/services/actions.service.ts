import { httpClient, shouldUseApi } from '@/shared/api'
import type { ActionsQuery, ActionsResponse } from '../types/action.types'
import { actionsMock } from '../data/actions.mock'

export interface ActionsService {
  getOverview(query?: ActionsQuery): Promise<ActionsResponse>
}

const apiActionsService: ActionsService = {
  getOverview: (query) =>
    httpClient.get('actions', {
      query: {
        search: query?.search,
        impactType: query?.impactType,
        region: query?.region,
        state: query?.state,
        city: query?.city,
        odsCodes: query?.odsCodes?.join(','),
      },
    }),
}

const mockActionsService: ActionsService = {
  getOverview: async () => ({ data: actionsMock }),
}

export const actionsService = shouldUseApi ? apiActionsService : mockActionsService
