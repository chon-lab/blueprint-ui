import type { ApiResponse } from '@/shared/api'

export type OdsTargetType = 'MEANS_OF_IMPLEMENTATION' | 'RESULT_ODS_TARGET'

export interface SustainableDevelopmentGoal {
  id: string
  code: number
  title: string
  description: string
  officialColorHex: string
}

export interface SdgsPageData {
  items: SustainableDevelopmentGoal[]
}

export type SdgsResponse = ApiResponse<SdgsPageData>
