<script setup lang="ts">
import Icon from './Icon.vue'

export interface SelectOption {
  label: string
  value: string
}

interface Props {
  modelValue?: string
  options: SelectOption[]
  accessibleLabel: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <span class="relative inline-flex min-w-0 shrink-0">
    <select
      :value="modelValue"
      :disabled="disabled"
      :aria-label="accessibleLabel"
      class="h-[var(--bp-input-height-md)] w-full min-w-0 appearance-none rounded-md border border-border bg-surface py-0 pl-3 pr-9 text-sm text-foreground outline-none transition-[border-color,box-shadow] hover:border-border-strong focus:border-focus focus:ring-[3px] focus:ring-[var(--bp-color-focus-ring)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted"
      @change="updateValue"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <Icon
      name="chevron-down"
      :size="15"
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600"
    />
  </span>
</template>
