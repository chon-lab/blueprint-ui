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
}

export function useResponsiveGridPagination<T>(
  items: ComputedRef<readonly T[]>,
  options: ResponsiveGridOptions,
) {
  const containerRef = ref<HTMLElement | null>(null)
  const currentPage = ref(1)
  const columns = ref(1)
  const rows = ref(1)
  let resizeObserver: ResizeObserver | undefined
  let measurementFrame: number | undefined

  const gap = options.gap ?? 10
  const minItemHeight = options.minItemHeight ?? 180
  const maxRows = options.maxRows ?? 4
  const sortedBreakpoints = [...options.breakpoints].sort((a, b) => b.minWidth - a.minWidth)

  const pageSize = computed(() => Math.max(1, columns.value * rows.value))
  const pageCount = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize.value)))
  const visibleItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return items.value.slice(start, start + pageSize.value)
  })
  const gridStyle = computed<CSSProperties>(() => ({
    gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows.value}, minmax(0, 1fr))`,
  }))

  function measure() {
    const container = containerRef.value
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const nextColumns = sortedBreakpoints.find((breakpoint) => width >= breakpoint.minWidth)?.columns ?? 1
    const nextRows = Math.max(1, Math.min(maxRows, Math.floor((height + gap) / (minItemHeight + gap))))

    if (columns.value !== nextColumns) columns.value = nextColumns
    if (rows.value !== nextRows) rows.value = nextRows
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

  watch([items, pageSize], () => {
    currentPage.value = 1
  })

  watch(pageCount, () => {
    if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
  })

  onMounted(() => {
    resizeObserver = new ResizeObserver(scheduleMeasure)
    if (containerRef.value) resizeObserver.observe(containerRef.value)
    scheduleMeasure()
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    if (measurementFrame !== undefined) cancelAnimationFrame(measurementFrame)
  })

  return {
    containerRef: containerRef as Ref<HTMLElement | null>,
    currentPage,
    pageCount,
    visibleItems,
    gridStyle,
    goToPage,
  }
}
