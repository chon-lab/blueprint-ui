import { httpClient, shouldUseApi } from '@/shared/api'
import { sdgsMock } from '../data/sdgs.mock'
import type { SdgsResponse } from '../types/sdg.types'

export interface SdgsService {
  list(): Promise<SdgsResponse>
}

const apiSdgsService: SdgsService = {
  list: () => httpClient.get('ods'),
}

const mockSdgsService: SdgsService = {
  list: async () => ({ data: sdgsMock }),
}

export const sdgsService = shouldUseApi ? apiSdgsService : mockSdgsService
