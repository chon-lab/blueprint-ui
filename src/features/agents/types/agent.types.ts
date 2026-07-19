import type { ApiResponse } from '@/shared/api'
import type { MetricItem } from '@/shared/components/MetricRail.vue'
import type { OdsSummary } from '@/shared/domain/ods'

export type EntityType = 'AGENCY' | 'COMPANY' | 'HOTEL' | 'MUNICIPALITY' | 'NGO' | 'OTHER'
export type ActionRole = 'CONTRIBUTING_PARTNER' | 'IMPLEMENTATION_PARTNER' | 'OWNER'

export interface AgentOdsSummary extends OdsSummary {
  actionCount: number
}

export interface AgentListItem {
  id: string
  name: string
  type: EntityType
  typeLabel: string
  region: string
  state: string
  stateLabel: string
  city: string
  cityLabel: string
  actionCount: number
  ods: AgentOdsSummary[]
  roles: ActionRole[]
}

export interface AgentsPageData {
  metrics: MetricItem[]
  agents: AgentListItem[]
  availableOds: OdsSummary[]
}

export interface AgentsQuery {
  search?: string
  type?: EntityType | ''
  region?: string
  state?: string
  city?: string
  roles?: ActionRole[]
  odsCodes?: number[]
}

export type AgentsResponse = ApiResponse<AgentsPageData>
