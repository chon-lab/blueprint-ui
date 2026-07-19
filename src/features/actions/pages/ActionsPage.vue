<script setup lang="ts">
import { computed } from 'vue'
import HeaderActions from '@/shared/components/HeaderActions.vue'
import MetricRail from '@/shared/components/MetricRail.vue'
import OdsFilter from '@/shared/components/OdsFilter.vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import SearchModeBackButton from '@/shared/components/SearchModeBackButton.vue'
import SearchModeTrigger from '@/shared/components/SearchModeTrigger.vue'
import { useResponsiveGridPagination } from '@/shared/composables/useResponsiveGridPagination'
import { useSearchMode } from '@/shared/composables/useSearchMode'
import {
  createNumberArrayQueryBinding,
  createStringQueryBinding,
  useUrlQuerySync,
} from '@/shared/composables/useUrlQuerySync'
import { locationCatalog, regionCatalog } from '@/shared/domain/geography'
import { Icon, Input, Select } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import ActionCard from '../components/ActionCard.vue'
import { useActions } from '../composables/useActions'

const {
  actions,
  metrics,
  search,
  impactType,
  region,
  state,
  city,
  selectedOdsCodes,
  availableOds,
  isLoading,
} = useActions()

const {
  containerRef,
  sentinelRef,
  currentPage,
  hasMoreItems,
  isInfiniteScroll,
  isMeasured,
  pageCount,
  visibleItems,
  gridStyle,
  goToPage,
} = useResponsiveGridPagination(actions, {
  breakpoints: [
    { minWidth: 1000, columns: 4 },
    { minWidth: 680, columns: 3 },
    { minWidth: 440, columns: 2 },
    { minWidth: 0, columns: 1 },
  ],
  minItemHeight: 170,
  maxRows: 3,
  infiniteScrollMaxWidth: 679,
})

const impactOptions: SelectOption[] = [
  { label: 'Impacto', value: '' },
  { label: 'Base', value: 'FOUNDATIONAL_ACTION' },
  { label: 'Impacto direto', value: 'DIRECTLY_IMPACTS' },
  { label: 'Impacto indireto', value: 'INDIRECTLY_IMPACTS' },
]

const regionOptions: SelectOption[] = [
  { label: 'Regi\u00e3o', value: '' },
  ...regionCatalog.map(({ label, value }) => ({ label, value })),
]

const stateOptions: SelectOption[] = [
  { label: 'Estado', value: '' },
  ...locationCatalog.map(({ stateLabel: label, state: value }) => ({ label, value })),
]

const cityOptions: SelectOption[] = [
  { label: 'Cidade', value: '' },
  ...locationCatalog.map(({ cityLabel: label, city: value }) => ({ label, value })),
]

const impactValues = new Set(impactOptions.map(({ value }) => value).filter(Boolean))
const regionValues = new Set(regionOptions.map(({ value }) => value).filter(Boolean))
const stateValues = new Set(stateOptions.map(({ value }) => value).filter(Boolean))
const cityValues = new Set(cityOptions.map(({ value }) => value).filter(Boolean))
const activeFilterCount = computed(
  () =>
    [
      Boolean(search.value.trim()),
      Boolean(impactType.value),
      Boolean(region.value),
      Boolean(state.value),
      Boolean(city.value),
    ].filter(Boolean).length + selectedOdsCodes.value.length,
)
const {
  isSearchMode,
  searchPanelRef,
  searchTriggerRef,
  openSearchMode,
  closeSearchMode,
} = useSearchMode()

useUrlQuerySync({
  bindings: [
    createStringQueryBinding('busca', search),
    createStringQueryBinding('impacto', impactType, { isValid: (value) => impactValues.has(value) }),
    createStringQueryBinding('regiao', region, { isValid: (value) => regionValues.has(value) }),
    createStringQueryBinding('estado', state, { isValid: (value) => stateValues.has(value) }),
    createStringQueryBinding('cidade', city, { isValid: (value) => cityValues.has(value) }),
    createNumberArrayQueryBinding('ods', selectedOdsCodes, (value) => value >= 1 && value <= 17),
  ],
  pagination: {
    currentPage,
    pageCount,
    goToPage,
    isReady: computed(() => !isLoading.value && isMeasured.value),
  },
})
</script>

<template>
  <div class="actions-page flex flex-col" :aria-busy="isLoading">
    <PageHeader v-if="!isSearchMode" class="actions-page__header">
      <template #title>A&ccedil;&otilde;es</template>
      <template #description>
        Iniciativas, projetos ou atividades realizadas por
        <RouterLink :to="{ name: 'agents' }" class="actions-page__context-link">agentes</RouterLink>
        do ecossistema tur&iacute;stico, relacionadas aos
        <RouterLink :to="{ name: 'sdgs' }" class="actions-page__context-link">
          Objetivos de Desenvolvimento Sustent&aacute;vel (ODS)
        </RouterLink>.
      </template>
      <template #actions>
        <HeaderActions>
          <template #before-create>
            <SearchModeTrigger
              ref="searchTriggerRef"
              :count="activeFilterCount"
              @activate="openSearchMode"
            />
          </template>
        </HeaderActions>
      </template>
    </PageHeader>

    <section
      v-else
      ref="searchPanelRef"
      class="actions-page__search-panel grid"
      aria-label="Pesquisa e filtros de ações"
    >
      <SearchModeBackButton @close="closeSearchMode" />
      <div class="actions-page__search-input">
        <Input
          v-model="search"
          type="search"
          placeholder="Pesquisar ações"
          aria-label="Pesquisar ações"
        >
          <template #trailing><Icon name="search" :size="16" /></template>
        </Input>
      </div>

      <div class="actions-page__search-filters">
        <div class="actions-page__search-impact">
          <Select v-model="impactType" :options="impactOptions" accessible-label="Filtrar por impacto" />
        </div>
        <div class="actions-page__location-filters flex flex-nowrap items-center overflow-x-auto">
          <div class="actions-page__location-filter">
            <Select v-model="region" :options="regionOptions" accessible-label="Filtrar por região" />
          </div>
          <div class="actions-page__location-filter">
            <Select v-model="state" :options="stateOptions" accessible-label="Filtrar por estado" />
          </div>
          <div class="actions-page__location-filter">
            <Select v-model="city" :options="cityOptions" accessible-label="Filtrar por cidade" />
          </div>
        </div>
      </div>

      <OdsFilter
        v-model="selectedOdsCodes"
        class="actions-page__ods-filter"
        :options="availableOds"
        label="ODS relacionadas"
      />
    </section>

    <div class="actions-page__content grid">
      <section class="actions-page__overview flex flex-col">
        <MetricRail
          :items="metrics"
          variant="preview"
          :preview-count="5"
          popup-title="Todos os indicadores"
          class="actions-page__metrics"
        />
      </section>

      <section class="actions-page__results flex flex-col">
        <div
          ref="containerRef"
          :class="['actions-page__viewport', { '--feed': isInfiniteScroll }]"
        >
          <section class="actions-page__grid grid" :style="gridStyle">
            <ActionCard
              v-for="action in visibleItems"
              :key="action.id"
              :action="action"
              :selected-ods-codes="selectedOdsCodes"
            />
            <p
              v-if="!isLoading && actions.length === 0"
              class="actions-page__empty flex items-center justify-center"
              style="grid-column: 1 / -1; grid-row: 1 / -1"
            >
              Nenhuma a&ccedil;&atilde;o encontrada.
            </p>
          </section>
          <div
            v-if="hasMoreItems"
            ref="sentinelRef"
            class="actions-page__feed-sentinel"
            aria-hidden="true"
          />
        </div>
        <PaginationControls
          v-if="isMeasured && !isInfiniteScroll"
          class="actions-page__pagination"
          :current-page="currentPage"
          :page-count="pageCount"
          @change="goToPage"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.actions-page {
  @apply h-full min-h-0 overflow-visible pb-0 lg:overflow-hidden lg:p-1.5;
}

.actions-page__context-link {
  @apply text-primary underline;
}

.actions-page__search-panel {
  @apply shrink-0 gap-3;
}

.actions-page__search-input {
  @apply w-full;
}

.actions-page__search-filters {
  @apply flex flex-nowrap items-center gap-3 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pr-0;
}

.actions-page__search-impact {
  @apply w-[8rem] shrink-0;
}

.actions-page__location-filters {
  @apply contents lg:flex lg:min-w-0 lg:gap-3 lg:overflow-visible;
}

.actions-page__location-filter {
  @apply w-[8rem] shrink-0;
}

@media (width < 1024px) {
  .actions-page__search-filters,
  .actions-page__ods-filter {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

@media (width < 640px) {
  .actions-page__header :deep(.page-header__description) {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

.actions-page__content {
  @apply mt-[var(--bp-layout-section-gap)] min-h-0 flex-1 grid-rows-[6rem_minmax(0,1fr)] gap-4 lg:mt-[clamp(0.75rem,2vh,1.25rem)] lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5;
}

.actions-page__overview {
  @apply min-h-0 min-w-0;
}

.actions-page__metrics {
  @apply min-h-0 flex-1;
}

@media (width < 1024px) {
  .actions-page__metrics {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

.actions-page__results {
  @apply min-h-0;
}

.actions-page__viewport {
  @apply min-h-0 flex-1;
}

.actions-page__viewport.--feed {
  @apply overflow-y-auto overscroll-contain pb-4 pr-1 [scrollbar-gutter:stable];
}

.actions-page__grid {
  @apply h-full min-h-0 gap-3;
}

.actions-page__viewport.--feed .actions-page__grid {
  @apply h-auto min-h-full auto-rows-[minmax(10.625rem,auto)];
}

.actions-page__feed-sentinel {
  @apply h-px w-full;
}

.actions-page__pagination {
  @apply mt-1.5;
}

.actions-page__empty {
  @apply text-center text-muted;
}
</style>
