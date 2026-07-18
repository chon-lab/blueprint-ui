<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardRanking } from '../types/dashboard.types'

const props = defineProps<{
  ranking: DashboardRanking
}>()

const visibleEntries = computed(() => props.ranking.entries.slice(0, 5))
</script>

<template>
  <article class="ranking-card flex flex-col overflow-hidden">
    <h2 class="ranking-card__title">{{ ranking.title }}</h2>
    <ol class="ranking-card__list overflow-hidden">
      <li
        v-for="(entry, index) in visibleEntries"
        :key="entry.id"
        class="ranking-card__entry grid items-center"
      >
        <span class="ranking-card__position">{{ index + 1 }}.</span>
        <span class="ranking-card__label">{{ entry.label }}</span>
        <span class="ranking-card__value">{{ entry.value }}</span>
      </li>
    </ol>
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
  @apply mt-3 min-h-0 flex-1;
}

.ranking-card__entry {
  @apply grid-cols-[1rem_minmax(0,1fr)_auto] gap-x-2 py-1 text-xs first:pt-0 last:pb-0 xl:text-sm;
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
</style>
