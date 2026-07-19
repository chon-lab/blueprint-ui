<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { OdsSummary } from '@/shared/domain/ods'
import { Icon } from '@/shared/ui'

const props = defineProps<{
  modelValue: number[]
  options: OdsSummary[]
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [codes: number[]]
}>()

const root = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const selectedOptions = computed(() =>
  props.modelValue
    .map((code) => props.options.find((option) => option.code === code))
    .filter((option): option is OdsSummary => Boolean(option)),
)

function toggle(code: number) {
  const nextCodes = props.modelValue.includes(code)
    ? props.modelValue.filter((selectedCode) => selectedCode !== code)
    : [...props.modelValue, code]

  emit('update:modelValue', nextCodes)
}

function closeDropdown() {
  isOpen.value = false

  const activeElement = document.activeElement as HTMLElement | null
  if (root.value?.contains(activeElement)) activeElement?.blur()
}

function closeOnOutsideClick(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) closeDropdown()
}

function closeOnOutsideFocus(event: FocusEvent) {
  if (!root.value?.contains(event.target as Node)) closeDropdown()
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') closeDropdown()
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutsideClick, true)
  document.addEventListener('focusin', closeOnOutsideFocus)
  document.addEventListener('keydown', closeOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeOnOutsideClick, true)
  document.removeEventListener('focusin', closeOnOutsideFocus)
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div ref="root" class="ods-filter relative flex items-center">
    <button
      type="button"
      class="ods-filter__trigger inline-flex items-center"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
    >
      <span>{{ label }}</span>
      <Icon :name="isOpen ? 'chevron-down' : 'plus'" :size="17" :class="isOpen && '--open'" />
    </button>

    <div class="ods-filter__selection flex items-center overflow-x-auto">
      <button
        v-for="ods in selectedOptions"
        :key="ods.code"
        type="button"
        class="ods-filter__chip inline-flex items-center"
        :style="{ backgroundColor: ods.softColor, color: ods.color }"
        :aria-label="`Remover ODS ${ods.code}: ${ods.title}`"
        @click="toggle(ods.code)"
      >
        <span>{{ ods.title }}</span>
        <Icon name="close" :size="13" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="ods-filter__dropdown absolute overflow-hidden"
    >
      <div class="ods-filter__dropdown-header">
        <p class="ods-filter__dropdown-title">Selecionar ODS</p>
        <p class="ods-filter__dropdown-description">Clique para adicionar ou remover da pesquisa.</p>
      </div>
      <div class="ods-filter__options overflow-y-auto" role="listbox" aria-multiselectable="true">
        <button
          v-for="ods in options"
          :key="ods.code"
          type="button"
          role="option"
          :aria-selected="modelValue.includes(ods.code)"
          class="ods-filter__option flex items-center"
          @click="toggle(ods.code)"
        >
          <span
            class="ods-filter__option-code flex items-center justify-center"
            :style="{ backgroundColor: ods.color }"
          >
            {{ ods.code }}
          </span>
          <span class="ods-filter__option-title">{{ ods.title }}</span>
          <Icon v-if="modelValue.includes(ods.code)" name="check" :size="17" class="ods-filter__option-check" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.ods-filter {
  @apply min-w-0 gap-3;
}

.ods-filter__trigger {
  @apply h-[var(--bp-input-height-md)] shrink-0 gap-3 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.ods-filter__trigger .--open {
  @apply rotate-180;
}

.ods-filter__selection {
  @apply min-w-0 flex-1 gap-2 py-1 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;
}

.ods-filter__chip {
  @apply h-9 shrink-0 gap-1.5 rounded-full px-3 text-xs outline-none transition-opacity hover:opacity-75 focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.ods-filter__dropdown {
  @apply left-0 top-[calc(100%+0.5rem)] z-50 w-[min(24rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface shadow-lg;
}

.ods-filter__dropdown-header {
  @apply border-b border-border-muted px-4 py-3;
}

.ods-filter__dropdown-title {
  @apply text-sm font-medium text-foreground;
}

.ods-filter__dropdown-description {
  @apply mt-0.5 text-xs text-muted;
}

.ods-filter__options {
  @apply max-h-[min(22rem,45dvh)] p-2;
}

.ods-filter__option {
  @apply min-h-[var(--bp-layout-touch-target)] w-full gap-3 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-surface-muted focus-visible:bg-primary-50;
}

.ods-filter__option-code {
  @apply size-7 shrink-0 rounded-sm text-xs font-semibold text-white;
}

.ods-filter__option-title {
  @apply min-w-0 flex-1 truncate text-foreground;
}

.ods-filter__option-check {
  @apply shrink-0 text-primary;
}
</style>
