import type { SdgsPageData } from '../types/sdg.types'
import { odsCatalog } from '@/shared/domain/ods-catalog'

export const sdgsMock: SdgsPageData = {
  items: odsCatalog.map((ods) => ({
    id: `ods-${ods.code}`,
    code: ods.code,
    title: ods.title,
    description: '',
    officialColorHex: ods.color,
  })),
}
