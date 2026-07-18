<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@/shared/ui'

const props = defineProps<{
  currentPage: number
  pageCount: number
  showArrows?: boolean
  ariaLabel?: string
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const visiblePages = computed(() => {
  const visibleCount = Math.min(7, props.pageCount)
  const start = Math.min(
    Math.max(1, props.currentPage - Math.floor(visibleCount / 2)),
    Math.max(1, props.pageCount - visibleCount + 1),
  )

  return Array.from({ length: visibleCount }, (_, index) => start + index)
})

function changePage(page: number) {
  if (page >= 1 && page <= props.pageCount) emit('change', page)
}
</script>

<template>
  <nav
    v-if="pageCount > 1"
    class="flex shrink-0 items-center justify-center gap-0.5 px-2 py-1.5"
    :aria-label="ariaLabel ?? 'Paginacao dos cards'"
  >
    <button
      v-if="showArrows !== false"
      type="button"
      class="grid size-9 place-items-center rounded-full text-muted outline-none transition-colors hover:bg-surface-muted hover:text-primary focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] disabled:opacity-30"
      :disabled="currentPage === 1"
      aria-label="Pagina anterior"
      @click="changePage(currentPage - 1)"
    >
      <Icon name="chevron-down" :size="20" class="rotate-90" />
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      type="button"
      class="group grid size-9 place-items-center rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
      :aria-label="`Ir para pagina ${page}`"
      :aria-current="page === currentPage ? 'page' : undefined"
      @click="changePage(page)"
    >
      <span
        :class="[
          'size-2.5 rounded-full transition-[background-color,transform] sm:size-3',
          page === currentPage ? 'scale-100 bg-primary' : 'scale-90 bg-neutral-300 group-hover:bg-neutral-400',
        ]"
      />
    </button>

    <button
      v-if="showArrows !== false"
      type="button"
      class="grid size-9 place-items-center rounded-full text-muted outline-none transition-colors hover:bg-surface-muted hover:text-primary focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] disabled:opacity-30"
      :disabled="currentPage === pageCount"
      aria-label="Proxima pagina"
      @click="changePage(currentPage + 1)"
    >
      <Icon name="chevron-down" :size="20" class="-rotate-90" />
    </button>
  </nav>
</template>
