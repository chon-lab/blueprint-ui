<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/shared/ui'

const props = withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 0,
  },
)

defineEmits<{
  activate: []
}>()

const trigger = ref<HTMLButtonElement | null>(null)
const filterCount = computed(() => Math.max(0, Math.floor(props.count)))

defineExpose({
  focus: () => trigger.value?.focus(),
})
</script>

<template>
  <button
    ref="trigger"
    type="button"
    :class="['search-mode-trigger grid place-items-center', { '--active': filterCount > 0 }]"
    :aria-label="filterCount > 0 ? `Pesquisar com ${filterCount} filtros ativos` : 'Pesquisar e filtrar'"
    @click="$emit('activate')"
  >
    <Icon name="search" :size="20" />
    <span v-if="filterCount > 0" class="search-mode-trigger__badge grid place-items-center" aria-hidden="true">
      {{ filterCount }}
    </span>
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.search-mode-trigger {
  @apply relative size-[var(--bp-button-height-md)] shrink-0 rounded-full border border-primary bg-surface text-primary outline-none transition-colors hover:bg-primary-50 focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] active:bg-primary-100;
}

.search-mode-trigger.--active {
  @apply bg-primary text-white hover:bg-primary-hover;
}

.search-mode-trigger__badge {
  @apply absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-danger px-1 text-[0.625rem] font-semibold leading-none text-white ring-2 ring-background;
}
</style>
