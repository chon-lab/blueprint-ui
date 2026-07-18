<script setup lang="ts">
import { Icon } from '@/shared/ui'

defineProps<{
  label: string
}>()
</script>

<template>
  <button
    type="button"
    class="filter-button inline-flex items-center"
  >
    <span>{{ label }}</span>
    <Icon name="plus" :size="17" class="filter-button__icon" />
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.filter-button {
  @apply h-[var(--bp-input-height-md)] w-fit justify-self-start gap-3 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.filter-button__icon {
  @apply text-neutral-600;
}
</style>
