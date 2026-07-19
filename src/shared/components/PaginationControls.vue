<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@/shared/ui'

const props = withDefaults(
  defineProps<{
    currentPage: number
    pageCount: number
    showArrows?: boolean
    ariaLabel?: string
  }>(),
  {
    showArrows: true,
  },
)

const emit = defineEmits<{
  change: [page: number]
}>()

const effectivePageCount = computed(() => Math.max(1, props.pageCount))

const visiblePages = computed(() => {
  const visibleCount = Math.min(7, effectivePageCount.value)
  const start = Math.min(
    Math.max(1, props.currentPage - Math.floor(visibleCount / 2)),
    Math.max(1, effectivePageCount.value - visibleCount + 1),
  )

  return Array.from({ length: visibleCount }, (_, index) => start + index)
})

function changePage(page: number) {
  if (page >= 1 && page <= effectivePageCount.value) emit('change', page)
}
</script>

<template>
  <nav
    v-if="showArrows || pageCount > 1"
    class="pagination flex items-center justify-center"
    :aria-label="ariaLabel ?? 'Paginacao dos cards'"
  >
    <button
      v-if="showArrows"
      type="button"
      class="pagination__arrow grid place-items-center"
      :disabled="currentPage === 1"
      aria-label="Pagina anterior"
      @click="changePage(currentPage - 1)"
    >
      <Icon name="chevron-down" :size="20" class="pagination__arrow-icon --previous" />
    </button>

    <template v-if="pageCount > 1">
      <button
        v-for="page in visiblePages"
        :key="page"
        type="button"
        class="pagination__page group grid place-items-center"
        :aria-label="`Ir para pagina ${page}`"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="changePage(page)"
      >
        <span
          :class="[
            'pagination__dot',
            page === currentPage ? '--active' : '--inactive',
          ]"
        />
      </button>
    </template>

    <button
      v-if="showArrows"
      type="button"
      class="pagination__arrow grid place-items-center"
      :disabled="currentPage === effectivePageCount"
      aria-label="Proxima pagina"
      @click="changePage(currentPage + 1)"
    >
      <Icon name="chevron-down" :size="20" class="pagination__arrow-icon --next" />
    </button>
  </nav>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.pagination {
  @apply shrink-0 gap-1 px-2 py-1;
}

.pagination__arrow {
  @apply size-9 rounded-full bg-surface text-primary outline-none transition-colors hover:bg-surface-muted hover:text-primary-hover focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] disabled:border-border-muted disabled:text-muted disabled:opacity-70;
}

.pagination__arrow-icon.--previous {
  @apply rotate-90;
}

.pagination__arrow-icon.--next {
  @apply -rotate-90;
}

.pagination__page {
  @apply size-8 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.pagination__dot {
  @apply size-2 rounded-full transition-[background-color,transform];
}

.pagination__dot.--active {
  @apply bg-primary;
}

.pagination__dot.--inactive {
  @apply bg-neutral-300 group-hover:bg-neutral-400;
}
</style>
