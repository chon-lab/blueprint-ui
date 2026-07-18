import { httpClient, shouldUseApi } from '@/shared/api'
import type { DashboardResponse } from '../types/dashboard.types'
import { dashboardMock } from '../data/dashboard.mock'

export interface DashboardService {
  getOverview(): Promise<DashboardResponse>
}

const apiDashboardService: DashboardService = {
  getOverview: () => httpClient.get('dashboard/overview'),
}

const mockDashboardService: DashboardService = {
  getOverview: async () => ({ data: dashboardMock }),
}

export const dashboardService = shouldUseApi ? apiDashboardService : mockDashboardService
