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
    track: '--sm',
    thumb: '--sm',
    checked: '--checked-sm',
  },
  md: {
    track: '--md',
    thumb: '--md',
    checked: '--checked-md',
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
      'switch inline-flex items-center',
      disabled ? '--disabled' : '--enabled',
    ]"
  >
    <span class="switch__control relative inline-flex">
      <input
        :id="inputId"
        class="switch__input peer"
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
          'switch__track relative inline-flex',
          sizeClasses[size].track,
        ]"
        aria-hidden="true"
      >
        <span
          :class="[
            'switch__thumb absolute',
            sizeClasses[size].thumb,
            modelValue ? sizeClasses[size].checked : '--unchecked',
          ]"
        />
      </span>
    </span>

    <span v-if="hasContent" class="switch__content grid">
      <span class="switch__label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" :id="descriptionId" class="switch__description">
        {{ description }}
      </span>
    </span>
  </label>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.switch {
  @apply min-h-[var(--bp-layout-touch-target)] w-fit gap-2.5;
}

.switch.--disabled {
  @apply cursor-not-allowed opacity-60;
}

.switch.--enabled {
  @apply cursor-pointer;
}

.switch__control {
  @apply shrink-0;
}

.switch__input {
  @apply sr-only;
}

.switch__track {
  @apply rounded-full bg-neutral-300 transition-colors duration-150 peer-checked:bg-primary peer-focus-visible:ring-[3px] peer-focus-visible:ring-[var(--bp-color-focus-ring)];
}

.switch__track.--sm {
  @apply h-[var(--bp-switch-height-sm)] w-[var(--bp-switch-width-sm)];
}

.switch__track.--md {
  @apply h-[var(--bp-switch-height-md)] w-[var(--bp-switch-width-md)];
}

.switch__thumb {
  @apply left-[var(--bp-switch-thumb-offset)] top-[var(--bp-switch-thumb-offset)] rounded-full bg-white shadow-sm transition-transform duration-150;
}

.switch__thumb.--sm {
  @apply size-[var(--bp-switch-thumb-sm)];
}

.switch__thumb.--md {
  @apply size-[var(--bp-switch-thumb-md)];
}

.switch__thumb.--checked-sm {
  @apply translate-x-[var(--bp-switch-translate-sm)];
}

.switch__thumb.--checked-md {
  @apply translate-x-[var(--bp-switch-translate-md)];
}

.switch__thumb.--unchecked {
  @apply translate-x-0;
}

.switch__content {
  @apply gap-0.5;
}

.switch__label {
  @apply text-sm leading-5 text-foreground;
}

.switch__description {
  @apply text-xs leading-4 text-muted;
}
</style>
