<script setup lang="ts">
import { Icon } from '@/shared/ui'

defineEmits<{
  close: []
}>()
</script>

<template>
  <button
    type="button"
    class="search-mode-back-button inline-flex items-center"
    aria-label="Voltar para a listagem"
    @click="$emit('close')"
  >
    <Icon name="chevron-down" :size="18" class="search-mode-back-button__icon" />
    <span>Voltar</span>
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.search-mode-back-button {
  @apply w-fit gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-primary outline-none transition-colors hover:bg-primary-50 hover:text-primary-hover focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.search-mode-back-button__icon {
  @apply rotate-90;
}
</style>
