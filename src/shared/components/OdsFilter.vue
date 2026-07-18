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

function closeOnOutsideClick(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) isOpen.value = false
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutsideClick)
  document.addEventListener('keydown', closeOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeOnOutsideClick)
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div ref="root" class="relative flex min-w-0 items-center gap-2.5">
    <button
      type="button"
      class="inline-flex h-[var(--bp-input-height-md)] shrink-0 items-center gap-3 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-border-strong focus-visible:border-focus focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
    >
      <span>{{ label }}</span>
      <Icon :name="isOpen ? 'chevron-down' : 'plus'" :size="17" :class="isOpen && 'rotate-180'" />
    </button>

    <div class="flex min-w-0 items-center gap-2 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        v-for="ods in selectedOptions"
        :key="ods.code"
        type="button"
        class="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs outline-none transition-opacity hover:opacity-75 focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)]"
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
      class="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
    >
      <div class="border-b border-border-muted px-4 py-3">
        <p class="text-sm font-medium text-foreground">Selecionar ODS</p>
        <p class="mt-0.5 text-xs text-muted">Clique para adicionar ou remover da pesquisa.</p>
      </div>
      <div class="max-h-[min(22rem,45dvh)] overflow-y-auto p-2" role="listbox" aria-multiselectable="true">
        <button
          v-for="ods in options"
          :key="ods.code"
          type="button"
          role="option"
          :aria-selected="modelValue.includes(ods.code)"
          class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-surface-muted focus-visible:bg-primary-50"
          @click="toggle(ods.code)"
        >
          <span
            class="flex size-7 shrink-0 items-center justify-center rounded-sm text-xs font-semibold text-white"
            :style="{ backgroundColor: ods.color }"
          >
            {{ ods.code }}
          </span>
          <span class="min-w-0 flex-1 truncate text-foreground">{{ ods.title }}</span>
          <Icon v-if="modelValue.includes(ods.code)" name="check" :size="17" class="shrink-0 text-primary" />
        </button>
      </div>
    </div>
  </div>
</template>
