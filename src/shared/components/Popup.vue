<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { Icon } from '@/shared/ui'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    closeOnBackdrop?: boolean
  }>(),
  {
    closeOnBackdrop: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const titleId = `popup-title-${useId()}`
const dialog = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

function close() {
  emit('update:modelValue', false)
}

function closeFromBackdrop() {
  if (props.closeOnBackdrop) close()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab' || !dialog.value) return

  const focusableElements = Array.from(
    dialog.value.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )

  if (focusableElements.length === 0) {
    event.preventDefault()
    dialog.value.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements.at(-1)

  if (event.shiftKey && (document.activeElement === firstElement || document.activeElement === dialog.value)) {
    event.preventDefault()
    lastElement?.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement?.focus()
  }
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previouslyFocusedElement = document.activeElement as HTMLElement | null
      await nextTick()
      dialog.value?.focus()
      return
    }

    previouslyFocusedElement?.focus()
    previouslyFocusedElement = null
  },
)

onBeforeUnmount(() => {
  previouslyFocusedElement?.focus()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="modelValue"
        class="popup__backdrop flex items-center justify-center"
        @click.self="closeFromBackdrop"
      >
        <section
          :ref="(element) => (dialog = element as HTMLElement | null)"
          class="popup flex flex-col"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          @keydown="handleKeydown"
        >
          <header class="popup__header flex items-center justify-between">
            <h2 :id="titleId" class="popup__title">{{ title }}</h2>
            <button
              type="button"
              class="popup__close grid place-items-center"
              aria-label="Fechar popup"
              @click="close"
            >
              <Icon name="close" :size="20" />
            </button>
          </header>

          <div class="popup__content">
            <slot />
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.popup__backdrop {
  @apply fixed inset-0 z-50 bg-neutral-950/45 p-4 backdrop-blur-[2px];
}

.popup {
  @apply max-h-[min(42rem,calc(100dvh-2rem))] w-full max-w-4xl overflow-hidden rounded-2xl border border-border-muted bg-surface shadow-2xl outline-none;
}

.popup__header {
  @apply shrink-0 border-b border-border-muted p-4 sm:px-6;
}

.popup__title {
  @apply text-xl font-medium text-foreground;
}

.popup__close {
  @apply size-11 rounded-full text-muted outline-none transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.popup__content {
  @apply min-h-0 overflow-y-auto p-4 sm:p-6;
}

.popup-enter-active,
.popup-leave-active {
  @apply transition-opacity duration-150;
}

.popup-enter-active .popup,
.popup-leave-active .popup {
  @apply transition-transform duration-150;
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0;
}

.popup-enter-from .popup,
.popup-leave-to .popup {
  @apply translate-y-2 scale-[0.98];
}
</style>
