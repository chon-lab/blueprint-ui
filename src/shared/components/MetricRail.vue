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
    class="grid min-h-0 grid-flow-col auto-cols-[minmax(8rem,1fr)] grid-rows-1 gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-1 lg:grid-rows-5 lg:overflow-hidden"
  >
    <MetricCard v-for="item in items" :key="`${item.value}-${item.label}`" v-bind="item" />
  </aside>
</template>
