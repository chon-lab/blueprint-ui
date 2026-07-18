<script setup lang="ts">
import MetricCard from './MetricCard.vue'

export interface MetricItem {
  value: string | number
  label: string
}

defineProps<{
  items: MetricItem[]
}>()
</script>

<template>
  <aside
    class="metric-rail grid grid-flow-col overflow-x-auto lg:grid-flow-row lg:overflow-hidden"
  >
    <MetricCard v-for="item in items" :key="`${item.value}-${item.label}`" v-bind="item" />
  </aside>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.metric-rail {
  @apply min-h-0 auto-cols-[minmax(8rem,1fr)] grid-rows-1 gap-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:auto-cols-auto lg:grid-cols-1 lg:grid-rows-5;
}
</style>
