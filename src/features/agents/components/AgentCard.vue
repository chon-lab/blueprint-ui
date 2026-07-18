<script setup lang="ts">
import type { AgentListItem } from '../types/agent.types'

defineProps<{
  agent: AgentListItem
}>()

defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <button
    type="button"
    class="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg border border-border bg-surface px-5 py-4 text-left outline-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
    :aria-label="`Abrir detalhes do agente ${agent.name}`"
    @click="$emit('select', agent.id)"
  >
    <span class="w-fit rounded-sm bg-primary px-1.5 py-1 text-xs font-medium leading-none text-white">
      {{ agent.typeLabel }}
    </span>

    <div class="mt-auto pt-5">
      <h2 class="line-clamp-2 text-base font-normal leading-5 text-foreground">{{ agent.name }}</h2>
      <p class="mt-2 truncate text-sm leading-5 text-muted">
        {{ agent.stateLabel }}
        <span class="px-1 text-neutral-400">&bull;</span>
        {{ agent.cityLabel }}
      </p>
    </div>

    <div class="mt-auto flex flex-wrap items-center gap-2 pt-4">
      <span class="rounded-full border border-neutral-700 bg-surface px-3 py-1.5 text-xs leading-none text-foreground">
        {{ agent.actionCount }} a&ccedil;&otilde;es
      </span>
      <span
        v-for="ods in agent.ods"
        :key="ods.code"
        class="flex size-7 items-center justify-center rounded-full text-xs font-medium"
        :style="{ backgroundColor: ods.softColor, color: ods.color }"
        :title="ods.title"
      >
        {{ ods.code }}
      </span>
    </div>
  </button>
</template>
