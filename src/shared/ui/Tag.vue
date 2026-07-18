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
  primary: '--primary',
  neutral: '--neutral',
  outline: '--outline',
  danger: '--danger',
}
</script>

<template>
  <span
    :class="[
      'tag inline-flex items-center justify-center',
      compact ? '--compact' : '--regular',
      toneClasses[tone],
    ]"
  >
    <slot />
  </span>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.tag {
  @apply w-fit whitespace-nowrap rounded-full border font-medium leading-none;
}

.tag.--compact {
  @apply min-h-6 px-2 text-xs;
}

.tag.--regular {
  @apply min-h-7 px-3 text-sm;
}

.tag.--primary {
  @apply border-primary bg-primary text-white;
}

.tag.--neutral {
  @apply border-border-muted bg-surface-muted text-neutral-700;
}

.tag.--outline {
  @apply border-border-strong bg-surface text-foreground;
}

.tag.--danger {
  @apply border-transparent bg-[var(--bp-color-red-50)] text-danger;
}
</style>
