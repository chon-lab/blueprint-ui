<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import type { SwitchSize } from './types'

interface Props {
  modelValue?: boolean
  id?: string
  name?: string
  label?: string
  description?: string
  ariaLabel?: string
  size?: SwitchSize
  disabled?: boolean
  required?: boolean
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: 'md',
  disabled: false,
  required: false,
  value: 'on',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const slots = useSlots()
const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const descriptionId = computed(() => `${inputId.value}-description`)
const hasContent = computed(() => Boolean(props.label || props.description || slots.default))

const sizeClasses: Record<SwitchSize, { track: string; thumb: string; checked: string }> = {
  sm: {
    track: 'h-[var(--bp-switch-height-sm)] w-[var(--bp-switch-width-sm)]',
    thumb: 'size-[var(--bp-switch-thumb-sm)]',
    checked: 'translate-x-[var(--bp-switch-translate-sm)]',
  },
  md: {
    track: 'h-[var(--bp-switch-height-md)] w-[var(--bp-switch-width-md)]',
    thumb: 'size-[var(--bp-switch-thumb-md)]',
    checked: 'translate-x-[var(--bp-switch-translate-md)]',
  },
}

function updateValue(event: Event) {
  const checked = (event.target as HTMLInputElement).checked

  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label
    :for="inputId"
    :class="[
      'inline-flex w-fit items-start gap-2.5',
      disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    ]"
  >
    <span class="relative mt-0.5 inline-flex shrink-0">
      <input
        :id="inputId"
        class="peer sr-only"
        type="checkbox"
        role="switch"
        :name="name"
        :value="value"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-label="ariaLabel || label"
        :aria-describedby="description ? descriptionId : undefined"
        @change="updateValue"
      />

      <span
        :class="[
          'relative inline-flex rounded-full bg-neutral-300 transition-colors duration-150 peer-checked:bg-primary peer-focus-visible:ring-[3px] peer-focus-visible:ring-[var(--bp-color-focus-ring)]',
          sizeClasses[size].track,
        ]"
        aria-hidden="true"
      >
        <span
          :class="[
            'absolute left-[var(--bp-switch-thumb-offset)] top-[var(--bp-switch-thumb-offset)] rounded-full bg-white shadow-sm transition-transform duration-150',
            sizeClasses[size].thumb,
            modelValue ? sizeClasses[size].checked : 'translate-x-0',
          ]"
        />
      </span>
    </span>

    <span v-if="hasContent" class="grid gap-0.5">
      <span class="text-sm font-medium leading-5 text-foreground">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" :id="descriptionId" class="text-xs leading-4 text-muted">
        {{ description }}
      </span>
    </span>
  </label>
</template>
