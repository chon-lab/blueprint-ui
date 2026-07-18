<script setup lang="ts">
defineProps<{
  value: string | number
  label: string
}>()
</script>

<template>
  <article
    class="metric-card flex flex-col items-center justify-center"
  >
    <strong class="metric-card__value">{{ value }}</strong>
    <span class="metric-card__label">{{ label }}</span>
  </article>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.metric-card {
  @apply h-full min-h-0 rounded-lg border border-border bg-surface px-3 py-2 text-center;
}

.metric-card__value {
  @apply text-lg font-normal leading-none text-primary;
}

.metric-card__label {
  @apply mt-1 line-clamp-3 max-w-36 whitespace-pre-line text-[clamp(0.78rem,1vw,1rem)] leading-tight text-foreground;
}
</style>
