<script setup lang="ts">
defineProps<{
  value: string | number
  label: string
}>()
</script>

<template>
  <article
    class="flex h-full min-h-0 flex-col items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-center"
  >
    <strong class="text-lg font-normal leading-none text-primary">{{ value }}</strong>
    <span class="mt-1 line-clamp-3 max-w-36 whitespace-pre-line text-[clamp(0.78rem,1vw,1rem)] leading-tight text-foreground">{{ label }}</span>
  </article>
</template>
