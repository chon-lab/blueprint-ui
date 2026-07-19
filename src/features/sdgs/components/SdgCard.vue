<script setup lang="ts">
import type { SustainableDevelopmentGoal } from '../types/sdg.types'

defineProps<{
  sdg: SustainableDevelopmentGoal
}>()
</script>

<template>
  <article
    class="sdg-card flex flex-col overflow-hidden"
    :style="{ '--sdg-color': sdg.officialColorHex }"
  >
    <strong class="sdg-card__code">{{ sdg.code }}</strong>
    <h2 class="sdg-card__title">{{ sdg.title }}</h2>
    <div class="sdg-card__spacer" aria-hidden="true" />
  </article>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.sdg-card {
  @apply h-full min-h-0 rounded-sm p-3 text-white transition-transform duration-150 hover:-translate-y-0.5 sm:px-[clamp(0.75rem,1.3vw,1.25rem)] sm:py-[clamp(0.75rem,1.8vh,1.25rem)];

  background-color: color-mix(in srgb, var(--sdg-color) 80%, black);
}

.sdg-card__code {
  @apply text-xl font-semibold leading-none sm:text-[clamp(1.25rem,2.3vw,2.25rem)];
}

.sdg-card__title {
  @apply mt-2 line-clamp-3 max-w-52 text-xs font-normal leading-tight sm:text-[clamp(0.75rem,1vw,1rem)];
}

.sdg-card__spacer {
  @apply mt-auto;
}
</style>
