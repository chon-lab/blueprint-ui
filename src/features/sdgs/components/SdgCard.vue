<script setup lang="ts">
import type { SustainableDevelopmentGoal } from '../types/sdg.types'

defineProps<{
  sdg: SustainableDevelopmentGoal
}>()
</script>

<template>
  <article
    class="flex h-full min-h-0 flex-col overflow-hidden rounded-sm px-[clamp(0.75rem,1.3vw,1.25rem)] py-[clamp(0.75rem,1.8vh,1.25rem)] text-white transition-transform duration-150 hover:-translate-y-0.5"
    :style="{ backgroundColor: sdg.officialColorHex }"
  >
    <strong class="text-[clamp(1.75rem,2.3vw,2.25rem)] font-semibold leading-none">{{ sdg.code }}</strong>
    <h2 class="mt-2 line-clamp-3 max-w-52 text-[clamp(0.75rem,1vw,1rem)] font-normal leading-tight">{{ sdg.title }}</h2>
    <div class="mt-auto" aria-hidden="true" />
  </article>
</template>
