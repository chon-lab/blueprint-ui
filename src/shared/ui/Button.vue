<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonSize, ButtonVariant } from './types'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover active:border-primary-active active:bg-primary-active',
  secondary:
    'border-primary bg-surface text-primary hover:bg-primary-50 active:bg-primary-100',
  tertiary:
    'border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-subtle active:bg-surface-muted',
  ghost:
    'border-transparent bg-transparent text-foreground hover:bg-surface-muted active:bg-neutral-200',
  danger:
    'border-danger bg-danger text-white hover:border-danger-hover hover:bg-danger-hover active:border-danger-hover active:bg-danger-hover',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--bp-button-height-sm)] px-[var(--bp-button-padding-x-sm)] text-xs',
  md: 'h-[var(--bp-button-height-md)] px-[var(--bp-button-padding-x-md)] text-sm',
  lg: 'h-[var(--bp-button-height-lg)] px-[var(--bp-button-padding-x-lg)] text-base',
}

const classes = computed(() => [
  'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] disabled:pointer-events-none disabled:opacity-50',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : 'w-fit',
])
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <span
        class="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        aria-hidden="true"
      />
      <span class="sr-only">Carregando</span>
    </span>

    <span :class="['inline-flex items-center justify-center gap-2', loading && 'invisible']">
      <slot name="leading" />
      <slot />
      <slot name="trailing" />
    </span>
  </button>
</template>
