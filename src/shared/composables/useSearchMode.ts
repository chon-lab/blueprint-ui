import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type SearchModeTrigger from '@/shared/components/SearchModeTrigger.vue'

export const isSearchModeActive = ref(false)

export function useSearchMode() {
  const isSearchMode = isSearchModeActive
  const searchPanelRef = ref<HTMLElement | null>(null)
  const searchTriggerRef = ref<InstanceType<typeof SearchModeTrigger> | null>(null)

  async function openSearchMode() {
    isSearchMode.value = true
    await nextTick()
    searchPanelRef.value?.querySelector<HTMLInputElement>('input')?.focus()
  }

  async function closeSearchMode(restoreTriggerFocus = false) {
    if (!isSearchMode.value) return

    isSearchMode.value = false
    if (restoreTriggerFocus) {
      await nextTick()
      searchTriggerRef.value?.focus()
    }
  }

  function closeFromOutside(target: EventTarget | null) {
    if (
      isSearchMode.value &&
      target instanceof Node &&
      !searchPanelRef.value?.contains(target)
    ) {
      void closeSearchMode()
    }
  }

  function handlePointerDown(event: PointerEvent) {
    closeFromOutside(event.target)
  }

  function handleFocusIn(event: FocusEvent) {
    closeFromOutside(event.target)
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !isSearchMode.value) return

    event.preventDefault()
    void closeSearchMode(true)
  }

  onMounted(() => {
    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handlePointerDown, true)
    document.removeEventListener('focusin', handleFocusIn)
    document.removeEventListener('keydown', handleKeydown)
    isSearchMode.value = false
  })

  return {
    isSearchMode,
    searchPanelRef,
    searchTriggerRef,
    openSearchMode,
    closeSearchMode,
  }
}
