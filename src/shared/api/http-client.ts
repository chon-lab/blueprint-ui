import type { ApiErrorPayload, ApiResponse, QueryParams } from './types'

export class ApiClientError extends Error {
  readonly status: number
  readonly payload?: ApiErrorPayload

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.payload = payload
  }
}

interface RequestOptions extends RequestInit {
  query?: QueryParams
}

class HttpClient {
  constructor(private readonly baseUrl: string) {}

  get<T>(path: string, options: RequestOptions = {}) {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  post<TResponse, TBody>(path: string, body: TBody, options: RequestOptions = {}) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  private async request<T>(path: string, options: RequestOptions): Promise<ApiResponse<T>> {
    const { query, headers, ...requestInit } = options
    const url = this.buildUrl(path, query)
    const response = await fetch(url, {
      ...requestInit,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    })

    if (!response.ok) {
      const payload = await this.readError(response)
      throw new ApiClientError(response.status, payload?.message ?? 'Erro ao acessar a API.', payload)
    }

    return response.json() as Promise<ApiResponse<T>>
  }

  private buildUrl(path: string, query?: QueryParams) {
    const base = this.baseUrl.replace(/\/$/, '')
    const resource = path.replace(/^\//, '')
    const search = new URLSearchParams()

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        search.set(key, String(value))
      }
    })

    const queryString = search.toString()
    return `${base}/${resource}${queryString ? `?${queryString}` : ''}`
  }

  private async readError(response: Response) {
    try {
      return (await response.json()) as ApiErrorPayload
    } catch {
      return undefined
    }
  }
}

const baseUrl = (window as any)._env_?.VITE_API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? '/api'
export const httpClient = new HttpClient(baseUrl)
