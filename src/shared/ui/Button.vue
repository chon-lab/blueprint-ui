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
  primary: '--primary',
  secondary: '--secondary',
  tertiary: '--tertiary',
  ghost: '--ghost',
  danger: '--danger',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: '--sm',
  md: '--md',
  lg: '--lg',
}

const classes = computed(() => [
  'button',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? '--block' : '--fit',
])
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="button__loading flex items-center justify-center">
      <span class="button__spinner" aria-hidden="true" />
      <span class="button__loading-label">Carregando</span>
    </span>

    <span :class="['button__content inline-flex items-center justify-center', loading && '--loading']">
      <slot name="leading" />
      <slot />
      <slot name="trailing" />
    </span>
  </button>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.button {
  @apply relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)] disabled:pointer-events-none disabled:opacity-50;
}

.button.--primary {
  @apply border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover active:border-primary-active active:bg-primary-active;
}

.button.--secondary {
  @apply border-primary bg-surface text-primary hover:bg-primary-50 active:bg-primary-100;
}

.button.--tertiary {
  @apply border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-subtle active:bg-surface-muted;
}

.button.--ghost {
  @apply border-transparent bg-transparent text-foreground hover:bg-surface-muted active:bg-neutral-200;
}

.button.--danger {
  @apply border-danger bg-danger text-white hover:border-danger-hover hover:bg-danger-hover active:border-danger-hover active:bg-danger-hover;
}

.button.--sm {
  @apply h-[var(--bp-button-height-sm)] px-[var(--bp-button-padding-x-sm)] text-xs;
}

.button.--md {
  @apply h-[var(--bp-button-height-md)] px-[var(--bp-button-padding-x-md)] text-sm;
}

.button.--lg {
  @apply h-[var(--bp-button-height-lg)] px-[var(--bp-button-padding-x-lg)] text-base;
}

.button.--block {
  @apply w-full;
}

.button.--fit {
  @apply w-fit;
}

.button__loading {
  @apply absolute inset-0;
}

.button__spinner {
  @apply size-4 animate-spin rounded-full border-2 border-current border-r-transparent;
}

.button__loading-label {
  @apply sr-only;
}

.button__content {
  @apply gap-2;
}

.button__content.--loading {
  @apply invisible;
}
</style>
