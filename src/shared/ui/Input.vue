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
  sm: 'h-[var(--bp-input-height-sm)] px-[var(--bp-input-padding-x-sm)] text-xs',
  md: 'h-[var(--bp-input-height-md)] px-[var(--bp-input-padding-x-md)] text-sm',
  lg: 'h-[var(--bp-input-height-lg)] px-[var(--bp-input-padding-x-lg)] text-base',
}

const stateClasses = computed(() =>
  props.error
    ? 'border-danger focus:border-danger focus:ring-[var(--bp-color-red-100)]'
    : 'border-border hover:border-border-strong focus:border-focus focus:ring-[var(--bp-color-focus-ring)]',
)

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  const value = props.type === 'number' && input.value !== '' ? input.valueAsNumber : input.value

  emit('update:modelValue', value)
}
</script>

<template>
  <div class="grid w-full gap-1.5">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-foreground">
      {{ label }}
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <span
        v-if="$slots.leading"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[var(--bp-input-padding-x-md)] text-muted"
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
          'w-full rounded-md border bg-surface text-foreground shadow-[var(--bp-shadow-control)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:ring-[3px] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted disabled:opacity-70 read-only:bg-surface-subtle',
          sizeClasses[size],
          stateClasses,
          $slots.leading && 'pl-10',
          $slots.trailing && 'pr-10',
        ]"
        @input="updateValue"
      />

      <span
        v-if="$slots.trailing"
        class="absolute inset-y-0 right-0 flex items-center pr-[var(--bp-input-padding-x-md)] text-muted"
      >
        <slot name="trailing" />
      </span>
    </div>

    <p
      v-if="error || hint"
      :id="messageId"
      :class="['text-xs', error ? 'text-danger' : 'text-muted']"
    >
      {{ error || hint }}
    </p>
  </div>
</template>
