<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import type { DashboardRanking } from '../types/dashboard.types'

const props = defineProps<{
  ranking: DashboardRanking
}>()

const entriesPerPage = 5
const currentPage = ref(1)
const pageCount = computed(() => Math.max(1, Math.ceil(props.ranking.entries.length / entriesPerPage)))
const positionOffset = computed(() => (currentPage.value - 1) * entriesPerPage)
const visibleEntries = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage
  return props.ranking.entries.slice(start, start + entriesPerPage)
})

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(1, page), pageCount.value)
}

watch(
  () => props.ranking.entries.length,
  () => {
    currentPage.value = 1
  },
)
</script>

<template>
  <article class="ranking-card flex flex-col overflow-hidden">
    <h2 class="ranking-card__title">{{ ranking.title }}</h2>
    <ol class="ranking-card__list grid overflow-hidden">
      <li
        v-for="(entry, index) in visibleEntries"
        :key="entry.id"
        class="ranking-card__entry grid items-center"
      >
        <span class="ranking-card__position">{{ positionOffset + index + 1 }}.</span>
        <span class="ranking-card__label">{{ entry.label }}</span>
        <span class="ranking-card__value">{{ entry.value }}</span>
      </li>
    </ol>
    <PaginationControls
      class="ranking-card__pagination"
      :current-page="currentPage"
      :page-count="pageCount"
      :show-arrows="false"
      :aria-label="`Paginacao das posicoes de ${ranking.title}`"
      @change="goToPage"
    />
  </article>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.ranking-card {
  @apply h-full min-h-0 rounded-lg border border-border bg-surface px-5 py-4;
}

.ranking-card__title {
  @apply text-sm font-medium text-primary;
}

.ranking-card__list {
  @apply mt-3 min-h-0 flex-1 grid-rows-5;
}

.ranking-card__entry {
  @apply min-h-0 grid-cols-[1rem_minmax(0,1fr)_auto] gap-x-2 py-1 text-xs first:pt-0 last:pb-0 xl:text-sm;
}

.ranking-card__position {
  @apply text-neutral-600;
}

.ranking-card__label {
  @apply truncate text-neutral-700;
}

.ranking-card__value {
  @apply whitespace-nowrap text-muted;
}

.ranking-card__pagination {
  @apply -mx-2 -mb-1;
}
</style>
