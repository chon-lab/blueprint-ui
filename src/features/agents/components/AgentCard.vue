<script setup lang="ts">
import { computed } from 'vue'
import type { AgentListItem } from '../types/agent.types'

const props = defineProps<{
  agent: AgentListItem
  selectedOdsCodes: number[]
}>()

defineEmits<{
  select: [id: string]
}>()

const filteredOds = computed(() =>
  props.agent.ods.filter((ods) => props.selectedOdsCodes.includes(ods.code)),
)
</script>

<template>
  <button
    type="button"
    class="agent-card flex flex-col overflow-hidden"
    :aria-label="`Abrir detalhes do agente ${agent.name}`"
    @click="$emit('select', agent.id)"
  >
    <span class="agent-card__type">
      {{ agent.typeLabel }}
    </span>

    <div class="agent-card__content">
      <h2 class="agent-card__title">{{ agent.name }}</h2>
      <p class="agent-card__location">
        {{ agent.stateLabel }}
        <span class="agent-card__location-separator">&bull;</span>
        {{ agent.cityLabel }}
      </p>
    </div>

    <div class="agent-card__metadata flex flex-wrap items-center">
      <span class="agent-card__action-count">
        {{ agent.actionCount }} a&ccedil;&otilde;es
      </span>
      <span
        v-for="ods in filteredOds"
        :key="ods.code"
        class="agent-card__ods inline-flex items-center justify-center"
        :style="{ '--ods-soft-color': ods.softColor, '--ods-color': ods.color }"
        :title="`${ods.title}: ${ods.actionCount} acoes`"
      >
        {{ ods.actionCount }}
      </span>
    </div>
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.agent-card {
  @apply h-full min-h-0 w-full rounded-lg border border-border bg-surface px-5 py-4 text-left outline-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.agent-card__type {
  @apply w-fit rounded-sm bg-primary px-1.5 py-1 text-xs font-medium leading-none text-white;
}

.agent-card__content {
  @apply mt-auto pt-5;
}

.agent-card__title {
  @apply line-clamp-2 text-base font-normal leading-5 text-foreground;
}

.agent-card__location {
  @apply mt-2 truncate text-sm leading-5 text-muted;
}

.agent-card__location-separator {
  @apply px-1 text-neutral-400;
}

.agent-card__metadata {
  @apply mt-auto gap-2 pt-4;
}

.agent-card__action-count {
  @apply rounded-full border border-neutral-700 bg-surface px-3 py-1.5 text-xs leading-none text-foreground;
}

.agent-card__ods {
  @apply size-7 rounded-full text-xs font-medium;

  background-color: var(--ods-soft-color);
  color: color-mix(in srgb, var(--ods-color) 80%, black);
}
</style>
