<script setup lang="ts">
import { computed } from 'vue'
import type { ActionImpactType, ActionListItem } from '../types/action.types'

const props = defineProps<{
  action: ActionListItem
  selectedOdsCodes: number[]
}>()

defineEmits<{
  select: [id: string]
}>()

const impactLabels: Record<ActionImpactType, string> = {
  FOUNDATIONAL_ACTION: 'Base',
  DIRECTLY_IMPACTS: 'Impacto direto',
  INDIRECTLY_IMPACTS: 'Impacto indireto',
}

const visibleOds = computed(() => {
  if (props.selectedOdsCodes.length === 0) return props.action.relatedOds

  return props.action.relatedOds.filter((ods) => props.selectedOdsCodes.includes(ods.code))
})
</script>

<template>
  <button
    type="button"
    class="action-card flex flex-col overflow-hidden"
    :aria-label="`Abrir detalhes da acao ${action.title}`"
    @click="$emit('select', action.id)"
  >
    <span class="action-card__impact">
      {{ impactLabels[action.impactType] }}
    </span>

    <div class="action-card__content">
      <h2 class="action-card__title">{{ action.title }}</h2>
      <p class="action-card__owner">{{ action.ownerName }}</p>
    </div>

    <div class="action-card__ods-list flex flex-wrap items-center">
      <span
        v-for="ods in visibleOds"
        :key="ods.code"
        class="action-card__ods inline-flex items-center justify-center"
        :style="{ '--ods-soft-color': ods.softColor, '--ods-color': ods.color }"
        :title="`ODS ${ods.code}: ${ods.title}`"
        :aria-label="`ODS ${ods.code}: ${ods.title}`"
      >
        {{ ods.code }}
      </span>
    </div>
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.action-card {
  @apply h-full min-h-0 w-full rounded-lg border border-border bg-surface p-[var(--bp-layout-card-padding)] text-left outline-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.action-card__impact {
  @apply w-fit rounded-sm bg-primary px-1.5 py-1 text-xs font-medium leading-none text-white;
}

.action-card__content {
  @apply mt-3;
}

.action-card__title {
  @apply line-clamp-2 text-base font-normal leading-5 text-foreground;
}

.action-card__owner {
  @apply mt-1.5 truncate text-sm leading-5 text-muted;
}

.action-card__ods-list {
  @apply mt-auto gap-2 pt-3;
}

.action-card__ods {
  @apply size-7 rounded-full text-xs font-medium leading-none;

  background-color: var(--ods-soft-color);
  color: color-mix(in srgb, var(--ods-color) 80%, black);
}
</style>
