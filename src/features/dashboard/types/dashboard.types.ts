import type { ApiResponse } from '@/shared/api'
import type { MetricItem } from '@/shared/components/MetricRail.vue'

export interface RankingEntry {
  id: string
  label: string
  value: string
}

export interface DashboardRanking {
  id: string
  title: string
  entries: RankingEntry[]
}

export interface DashboardData {
  indicators: MetricItem[]
  rankings: DashboardRanking[]
}

export type DashboardResponse = ApiResponse<DashboardData>
