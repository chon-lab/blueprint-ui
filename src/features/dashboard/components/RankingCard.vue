<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardRanking } from '../types/dashboard.types'

const props = defineProps<{
  ranking: DashboardRanking
}>()

const visibleEntries = computed(() => props.ranking.entries.slice(0, 5))
</script>

<template>
  <article class="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface px-5 py-4">
    <h2 class="text-sm font-medium text-primary">{{ ranking.title }}</h2>
    <ol class="mt-3 min-h-0 flex-1 overflow-hidden">
      <li
        v-for="(entry, index) in visibleEntries"
        :key="entry.id"
        class="grid grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-x-2 py-1 text-xs first:pt-0 last:pb-0 xl:text-sm"
      >
        <span class="text-neutral-600">{{ index + 1 }}.</span>
        <span class="truncate text-neutral-700">{{ entry.label }}</span>
        <span class="whitespace-nowrap text-muted">{{ entry.value }}</span>
      </li>
    </ol>
  </article>
</template>
