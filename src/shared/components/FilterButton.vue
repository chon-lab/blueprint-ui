<script setup lang="ts">
import { Icon } from '@/shared/ui'

defineProps<{
  label: string
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-[var(--bp-input-height-md)] w-fit justify-self-start items-center gap-3 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
  >
    <span>{{ label }}</span>
    <Icon name="plus" :size="17" class="text-neutral-600" />
  </button>
</template>
