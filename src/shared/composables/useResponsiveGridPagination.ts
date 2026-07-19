import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CSSProperties, ComputedRef, Ref } from 'vue'

export interface GridBreakpoint {
  minWidth: number
  columns: number
}

interface ResponsiveGridOptions {
  breakpoints: GridBreakpoint[]
  minItemHeight?: number
  gap?: number
  maxRows?: number
  infiniteScrollMaxWidth?: number
}

export function useResponsiveGridPagination<T>(
  items: ComputedRef<readonly T[]>,
  options: ResponsiveGridOptions,
) {
  const containerRef = ref<HTMLElement | null>(null)
  const sentinelRef = ref<HTMLElement | null>(null)
  const currentPage = ref(1)
  const columns = ref(1)
  const rows = ref(1)
  const containerWidth = ref(0)
  const isMeasured = ref(false)
  let resizeObserver: ResizeObserver | undefined
  let intersectionObserver: IntersectionObserver | undefined
  let measurementFrame: number | undefined

  const gap = options.gap ?? 10
  const minItemHeight = options.minItemHeight ?? 180
  const maxRows = options.maxRows ?? 4
  const sortedBreakpoints = [...options.breakpoints].sort((a, b) => b.minWidth - a.minWidth)

  const isInfiniteScroll = computed(
    () =>
      isMeasured.value &&
      options.infiniteScrollMaxWidth !== undefined &&
      containerWidth.value <= options.infiniteScrollMaxWidth,
  )
  const pageSize = computed(() =>
    Math.max(1, columns.value * (isInfiniteScroll.value ? maxRows : rows.value)),
  )
  const pageCount = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize.value)))
  const hasMoreItems = computed(
    () => isInfiniteScroll.value && currentPage.value < pageCount.value,
  )
  const visibleItems = computed(() => {
    if (isInfiniteScroll.value) {
      return items.value.slice(0, currentPage.value * pageSize.value)
    }

    const start = (currentPage.value - 1) * pageSize.value
    return items.value.slice(start, start + pageSize.value)
  })
  const gridStyle = computed<CSSProperties>(() => {
    const styles: CSSProperties = {
      gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`,
    }

    if (!isInfiniteScroll.value) {
      styles.gridTemplateRows = `repeat(${rows.value}, minmax(0, 1fr))`
    }

    return styles
  })

  function measure() {
    const container = containerRef.value
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const nextColumns = sortedBreakpoints.find((breakpoint) => width >= breakpoint.minWidth)?.columns ?? 1
    const nextRows = Math.max(1, Math.min(maxRows, Math.floor((height + gap) / (minItemHeight + gap))))

    containerWidth.value = width
    if (columns.value !== nextColumns) columns.value = nextColumns
    if (rows.value !== nextRows) rows.value = nextRows
    isMeasured.value = true
  }

  function scheduleMeasure() {
    if (measurementFrame !== undefined) cancelAnimationFrame(measurementFrame)
    measurementFrame = requestAnimationFrame(() => {
      measurementFrame = undefined
      measure()
    })
  }

  function goToPage(page: number) {
    currentPage.value = Math.min(Math.max(1, page), pageCount.value)
  }

  function loadNextPage() {
    if (hasMoreItems.value) goToPage(currentPage.value + 1)
  }

  function observeSentinel() {
    intersectionObserver?.disconnect()

    if (!isInfiniteScroll.value || !hasMoreItems.value) return

    const root = containerRef.value
    const sentinel = sentinelRef.value
    if (!root || !sentinel) return

    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) loadNextPage()
      },
      {
        root,
        rootMargin: '0px 0px 160px',
      },
    )
    intersectionObserver.observe(sentinel)
  }

  watch([items, pageSize], () => {
    currentPage.value = 1
  })

  watch(pageCount, () => {
    if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
  })

  watch(
    [containerRef, sentinelRef, isInfiniteScroll, hasMoreItems],
    observeSentinel,
    { flush: 'post' },
  )

  onMounted(() => {
    resizeObserver = new ResizeObserver(scheduleMeasure)
    if (containerRef.value) resizeObserver.observe(containerRef.value)
    scheduleMeasure()
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    intersectionObserver?.disconnect()
    if (measurementFrame !== undefined) cancelAnimationFrame(measurementFrame)
  })

  return {
    containerRef: containerRef as Ref<HTMLElement | null>,
    sentinelRef: sentinelRef as Ref<HTMLElement | null>,
    currentPage,
    hasMoreItems,
    isInfiniteScroll,
    isMeasured,
    pageCount,
    visibleItems,
    gridStyle,
    goToPage,
  }
}
