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
  @apply h-full min-h-0 rounded-sm px-[clamp(0.5rem,1.3vw,1.25rem)] py-[clamp(0.45rem,1.8vh,1.25rem)] text-white transition-transform duration-150 hover:-translate-y-0.5;

  background-color: color-mix(in srgb, var(--sdg-color) 80%, black);
}

.sdg-card__code {
  @apply text-[clamp(1.15rem,2.3vw,2.25rem)] font-semibold leading-none;
}

.sdg-card__title {
  @apply mt-[clamp(0.25rem,0.8vh,0.5rem)] line-clamp-3 max-w-52 text-[clamp(0.6rem,1vw,1rem)] font-normal leading-tight;
}

.sdg-card__spacer {
  @apply mt-auto;
}
</style>
