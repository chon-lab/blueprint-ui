import { nextTick, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type QueryValue = string | null | (string | null)[] | undefined

export interface UrlQueryBinding {
  key: string
  apply: (value: QueryValue) => void
  serialize: () => string | undefined
}

interface StringBindingOptions {
  isValid?: (value: string) => boolean
}

interface PaginationBinding {
  currentPage: Ref<number>
  pageCount: Readonly<Ref<number>>
  goToPage: (page: number) => void
  isReady: Readonly<Ref<boolean>>
  queryKey?: string
}

interface UrlQuerySyncOptions {
  bindings: UrlQueryBinding[]
  pagination: PaginationBinding
}

function queryStrings(value: QueryValue) {
  const values = Array.isArray(value) ? value : [value]
  return values.filter((item): item is string => typeof item === 'string')
}

function firstQueryString(value: QueryValue) {
  return queryStrings(value)[0]
}

function querySignature(query: Record<string, QueryValue>) {
  return Object.keys(query)
    .sort()
    .map((key) => `${key}=${queryStrings(query[key]).join(',')}`)
    .join('&')
}

function parsePage(value: QueryValue) {
  const parsedValue = Number.parseInt(firstQueryString(value) ?? '', 10)
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : 1
}

export function createStringQueryBinding<T extends string>(
  key: string,
  state: Ref<T>,
  options: StringBindingOptions = {},
): UrlQueryBinding {
  return {
    key,
    apply(value) {
      const queryValue = firstQueryString(value) ?? ''
      state.value = (queryValue && options.isValid && !options.isValid(queryValue) ? '' : queryValue) as T
    },
    serialize() {
      return state.value || undefined
    },
  }
}

export function createBooleanQueryBinding(key: string, state: Ref<boolean>): UrlQueryBinding {
  return {
    key,
    apply(value) {
      const queryValue = firstQueryString(value)
      state.value = queryValue === '1' || queryValue === 'true'
    },
    serialize() {
      return state.value ? '1' : undefined
    },
  }
}

export function createNumberArrayQueryBinding(
  key: string,
  state: Ref<number[]>,
  isValid: (value: number) => boolean = () => true,
): UrlQueryBinding {
  return {
    key,
    apply(value) {
      const parsedValues = queryStrings(value)
        .flatMap((item) => item.split(','))
        .map((item) => Number.parseInt(item, 10))
        .filter((item) => Number.isInteger(item) && isValid(item))

      state.value = [...new Set(parsedValues)].sort((left, right) => left - right)
    },
    serialize() {
      const values = [...new Set(state.value)].filter(isValid).sort((left, right) => left - right)
      return values.length > 0 ? values.join(',') : undefined
    },
  }
}

export function useUrlQuerySync({ bindings, pagination }: UrlQuerySyncOptions) {
  const route = useRoute()
  const router = useRouter()
  const pageQueryKey = pagination.queryKey ?? 'pagina'
  const requestedPage = ref(1)
  let isApplyingRoute = false
  let routeRevision = 0

  function syncUrl() {
    if (!pagination.isReady.value || isApplyingRoute) return

    const nextQuery: Record<string, QueryValue> = { ...route.query }
    const managedKeys = [...bindings.map((binding) => binding.key), pageQueryKey]

    managedKeys.forEach((key) => delete nextQuery[key])
    bindings.forEach((binding) => {
      const value = binding.serialize()
      if (value !== undefined) nextQuery[binding.key] = value
    })

    if (pagination.currentPage.value > 1) {
      nextQuery[pageQueryKey] = String(pagination.currentPage.value)
    }

    if (querySignature(nextQuery) !== querySignature(route.query)) {
      void router.replace({ query: nextQuery })
    }
  }

  async function applyRoute() {
    const revision = ++routeRevision
    isApplyingRoute = true

    bindings.forEach((binding) => binding.apply(route.query[binding.key]))
    requestedPage.value = parsePage(route.query[pageQueryKey])

    await nextTick()
    if (revision !== routeRevision) return

    if (pagination.isReady.value) {
      pagination.goToPage(requestedPage.value)
      requestedPage.value = pagination.currentPage.value
    }

    isApplyingRoute = false
    syncUrl()
  }

  watch(() => route.query, applyRoute, { deep: true, immediate: true })

  watch(
    () => bindings.map((binding) => binding.serialize()).join('\u001f'),
    () => {
      if (isApplyingRoute) return

      requestedPage.value = 1
      pagination.goToPage(1)
      syncUrl()
    },
  )

  watch(pagination.currentPage, (page) => {
    if (isApplyingRoute || !pagination.isReady.value) return

    requestedPage.value = page
    syncUrl()
  })

  watch(
    [pagination.isReady, pagination.pageCount],
    async ([isReady]) => {
      if (!isReady || isApplyingRoute) return

      await nextTick()
      pagination.goToPage(requestedPage.value)
      requestedPage.value = pagination.currentPage.value
      syncUrl()
    },
    { immediate: true },
  )
}
