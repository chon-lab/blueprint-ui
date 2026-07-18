import type { ApiResponse } from '@/shared/api'
import type { MetricItem } from '@/shared/components/MetricRail.vue'
import type { OdsSummary } from '@/shared/domain/ods'

export type ActionImpactType =
  | 'DIRECTLY_IMPACTS'
  | 'INDIRECTLY_IMPACTS'
  | 'FOUNDATIONAL_ACTION'

export interface ActionListItem {
  id: string
  title: string
  impactType: ActionImpactType
  ownerName: string
  region: string
  state: string
  city: string
  ods: OdsSummary
}

export interface ActionsPageData {
  metrics: MetricItem[]
  actions: ActionListItem[]
  availableOds: OdsSummary[]
}

export interface ActionsQuery {
  search?: string
  impactType?: ActionImpactType | ''
  region?: string
  state?: string
  city?: string
  odsCodes?: number[]
}

export type ActionsResponse = ApiResponse<ActionsPageData>
