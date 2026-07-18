<script setup lang="ts">
import { computed, useId } from 'vue'
import type { InputHTMLAttributes } from 'vue'
import type { InputSize } from './types'

defineOptions({ inheritAttrs: false })

type InputValue = string | number

interface Props {
  modelValue?: InputValue | null
  id?: string
  type?: InputHTMLAttributes['type']
  label?: string
  hint?: string
  error?: string
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: InputValue]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const messageId = computed(() => `${inputId.value}-message`)

const sizeClasses: Record<InputSize, string> = {
  sm: '--sm',
  md: '--md',
  lg: '--lg',
}

const stateClasses = computed(() =>
  props.error ? '--error' : '--default',
)

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  const value = props.type === 'number' && input.value !== '' ? input.valueAsNumber : input.value

  emit('update:modelValue', value)
}
</script>

<template>
  <div class="input grid">
    <label v-if="label" :for="inputId" class="input__label">
      {{ label }}
      <span v-if="required" class="input__required" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <span
        v-if="$slots.leading"
        class="input__leading absolute flex items-center"
      >
        <slot name="leading" />
      </span>

      <input
        v-bind="$attrs"
        :id="inputId"
        :type="type"
        :value="modelValue ?? ''"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error || hint ? messageId : undefined"
        :class="[
          'input__control',
          sizeClasses[size],
          stateClasses,
          $slots.leading && '--with-leading',
          $slots.trailing && '--with-trailing',
        ]"
        @input="updateValue"
      />

      <span
        v-if="$slots.trailing"
        class="input__trailing absolute flex items-center"
      >
        <slot name="trailing" />
      </span>
    </div>

    <p
      v-if="error || hint"
      :id="messageId"
      :class="['input__message', error ? '--error' : '--hint']"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.input {
  @apply w-full gap-1.5;
}

.input__label {
  @apply text-sm font-medium text-foreground;
}

.input__required,
.input__message.--error {
  @apply text-danger;
}

.input__leading {
  @apply pointer-events-none inset-y-0 left-0 pl-[var(--bp-input-padding-x-md)] text-muted;
}

.input__trailing {
  @apply inset-y-0 right-0 pr-[var(--bp-input-padding-x-md)] text-muted;
}

.input__control {
  @apply w-full rounded-md border bg-surface text-foreground shadow-[var(--bp-shadow-control)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:ring-[3px] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted disabled:opacity-70 read-only:bg-surface-subtle;
}

.input__control.--sm {
  @apply h-[var(--bp-input-height-sm)] px-[var(--bp-input-padding-x-sm)] text-xs;
}

.input__control.--md {
  @apply h-[var(--bp-input-height-md)] px-[var(--bp-input-padding-x-md)] text-sm;
}

.input__control.--lg {
  @apply h-[var(--bp-input-height-lg)] px-[var(--bp-input-padding-x-lg)] text-base;
}

.input__control.--default {
  @apply border-border hover:border-border-strong focus:border-focus focus:ring-[var(--bp-color-focus-ring)];
}

.input__control.--error {
  @apply border-danger focus:border-danger focus:ring-[var(--bp-color-red-100)];
}

.input__control.--with-leading {
  @apply pl-10;
}

.input__control.--with-trailing {
  @apply pr-10;
}

.input__message {
  @apply text-xs;
}

.input__message.--hint {
  @apply text-muted;
}
</style>
