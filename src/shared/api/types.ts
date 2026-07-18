export interface ApiMeta {
  requestId?: string
  timestamp?: string
}

export interface ApiResponse<T> {
  data: T
  meta?: ApiMeta
}

export interface PaginatedData<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ApiErrorPayload {
  code: string
  message: string
  details?: Record<string, unknown>
}

export type QueryParams = Record<string, string | number | boolean | null | undefined>
