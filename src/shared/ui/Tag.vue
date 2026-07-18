<script setup lang="ts">
export type TagTone = 'primary' | 'neutral' | 'outline' | 'danger'

withDefaults(
  defineProps<{
    tone?: TagTone
    compact?: boolean
  }>(),
  {
    tone: 'primary',
    compact: false,
  },
)

const toneClasses: Record<TagTone, string> = {
  primary: 'border-primary bg-primary text-white',
  neutral: 'border-border-muted bg-surface-muted text-neutral-700',
  outline: 'border-border-strong bg-surface text-foreground',
  danger: 'border-transparent bg-[var(--bp-color-red-50)] text-danger',
}
</script>

<template>
  <span
    :class="[
      'inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full border font-medium leading-none',
      compact ? 'min-h-6 px-2 text-xs' : 'min-h-7 px-3 text-sm',
      toneClasses[tone],
    ]"
  >
    <slot />
  </span>
</template>
