<script setup lang="ts">
import type { ActionImpactType, ActionListItem } from '../types/action.types'

defineProps<{
  action: ActionListItem
}>()

defineEmits<{
  select: [id: string]
}>()

const impactLabels: Record<ActionImpactType, string> = {
  FOUNDATIONAL_ACTION: 'Base',
  DIRECTLY_IMPACTS: 'Impacto direto',
  INDIRECTLY_IMPACTS: 'Impacto indireto',
}
</script>

<template>
  <button
    type="button"
    class="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg border border-border bg-surface px-5 py-4 text-left outline-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
    :aria-label="`Abrir detalhes da acao ${action.title}`"
    @click="$emit('select', action.id)"
  >
    <span class="w-fit rounded-sm bg-primary px-1.5 py-1 text-xs font-medium leading-none text-white">
      {{ impactLabels[action.impactType] }}
    </span>

    <div class="mt-auto pt-5">
      <h2 class="line-clamp-2 text-base font-normal leading-5 text-foreground">{{ action.title }}</h2>
      <p class="mt-2 truncate text-sm leading-5 text-muted">{{ action.ownerName }}</p>
    </div>

    <span
      class="mt-auto w-fit max-w-full truncate rounded-full px-3 py-1.5 text-xs font-normal leading-none"
      :style="{ backgroundColor: action.ods.softColor, color: action.ods.color }"
    >
      {{ action.ods.title }}
    </span>
  </button>
</template>
