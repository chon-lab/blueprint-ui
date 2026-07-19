<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@/shared/ui'
import MetricCard from './MetricCard.vue'
import PaginationControls from './PaginationControls.vue'
import Popup from './Popup.vue'

export interface MetricItem {
  value: string | number
  totalValue?: string | number
  label: string
}

const props = withDefaults(
  defineProps<{
    items: MetricItem[]
    itemsPerPage?: number
    maxPages?: number
    popupTitle?: string
    variant?: 'paginated' | 'preview'
    previewCount?: number
  }>(),
  {
    itemsPerPage: 4,
    maxPages: 3,
    popupTitle: 'Vis\u00e3o geral das m\u00e9tricas',
    variant: 'paginated',
    previewCount: 5,
  },
)

const currentPage = ref(1)
const isPopupOpen = ref(false)

const pageSize = computed(() => Math.max(1, Math.floor(props.itemsPerPage)))
const pageLimit = computed(() => Math.max(1, Math.floor(props.maxPages)))
const previewSize = computed(() => Math.max(1, Math.floor(props.previewCount)))
const isPreview = computed(() => props.variant === 'preview')
const pageCount = computed(() =>
  Math.max(1, Math.min(pageLimit.value, Math.ceil(props.items.length / pageSize.value))),
)
const isLastPage = computed(() => currentPage.value === pageCount.value)
const showsExpandCard = computed(
  () =>
    isPreview.value
      ? props.items.length > previewSize.value
      : isLastPage.value && props.items.length > pageLimit.value * pageSize.value,
)
const visibleItems = computed(() => {
  if (isPreview.value) return props.items.slice(0, previewSize.value)

  const start = (currentPage.value - 1) * pageSize.value
  const visibleLimit = showsExpandCard.value ? pageSize.value - 1 : pageSize.value

  return props.items.slice(start, start + visibleLimit)
})

watch(pageCount, (count) => {
  currentPage.value = Math.min(currentPage.value, count)
})

function goToPage(page: number) {
  currentPage.value = page
}
</script>

<template>
  <section class="metric-rail flex flex-col">
    <aside
      :class="[
        'metric-rail__items grid grid-flow-col overflow-x-auto lg:grid-flow-row lg:overflow-hidden',
        !isPreview && showsExpandCard && '--with-expand-card',
        isPreview && '--preview',
      ]"
    >
      <MetricCard
        v-for="item in visibleItems"
        :key="`${item.value}-${item.totalValue ?? ''}-${item.label}`"
        v-bind="item"
      />
      <button
        v-if="showsExpandCard"
        type="button"
        :class="['metric-rail__expand-card flex flex-col items-center justify-center', { '--preview': isPreview }]"
        :aria-label="isPreview ? 'Ver mais indicadores' : 'Mostrar todas as métricas'"
        @click="isPopupOpen = true"
      >
        <Icon v-if="!isPreview" name="expand" :size="20" />
        <span>{{ isPreview ? 'Ver mais indicadores' : 'Ver todas as métricas' }}</span>
      </button>
    </aside>

    <footer v-if="!isPreview" class="metric-rail__footer flex items-center justify-between">
      <PaginationControls
        :current-page="currentPage"
        :page-count="pageCount"
        :show-arrows="false"
        aria-label="Paginação das métricas"
        @change="goToPage"
      />
      <button
        type="button"
        class="metric-rail__expand grid place-items-center"
        title="Mostrar todas as métricas"
        aria-label="Mostrar todas as métricas"
        @click="isPopupOpen = true"
      >
        <Icon name="expand" :size="18" />
      </button>
    </footer>

    <Popup v-model="isPopupOpen" :title="popupTitle">
      <div class="metric-rail__popup-grid grid">
        <MetricCard
          v-for="item in items"
          :key="`popup-${item.value}-${item.totalValue ?? ''}-${item.label}`"
          v-bind="item"
        />
      </div>
    </Popup>
  </section>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.metric-rail {
  @apply min-h-0 gap-1;
}

.metric-rail__items {
  @apply min-h-0 flex-1 auto-cols-[minmax(8rem,1fr)] grid-rows-1 gap-2.5 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:auto-cols-auto lg:grid-cols-1 lg:grid-rows-4 lg:pr-0;
}

.metric-rail__items.--with-expand-card {
  @apply lg:grid-rows-5;
}

.metric-rail__items.--preview {
  @apply flex-none auto-cols-[7rem] grid-rows-[6rem] lg:min-h-0 lg:flex-1 lg:auto-cols-auto lg:grid-rows-[repeat(5,minmax(0,1fr))_auto];
}

.metric-rail__footer {
  @apply min-h-10 shrink-0;
}

.metric-rail__expand {
  @apply mr-1 size-9 shrink-0 rounded-full bg-surface text-primary outline-none transition-colors hover:bg-surface-muted hover:text-primary-hover focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.metric-rail__expand-card {
  @apply min-h-0 gap-1 rounded-lg bg-primary-50 px-3 py-2 text-center text-xs font-medium leading-tight text-primary outline-none transition-colors hover:bg-primary-100 hover:text-primary-hover focus-visible:ring-[3px] focus-visible:ring-[var(--bp-color-focus-ring)];
}

.metric-rail__expand-card.--preview {
  @apply min-h-9 lg:self-center;
}

.metric-rail__popup-grid {
  @apply auto-rows-[7rem] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3;
}
</style>
