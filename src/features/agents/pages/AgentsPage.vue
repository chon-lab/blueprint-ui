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
  createBooleanQueryBinding,
  createNumberArrayQueryBinding,
  createStringQueryBinding,
  useUrlQuerySync,
} from '@/shared/composables/useUrlQuerySync'
import { locationCatalog, regionCatalog } from '@/shared/domain/geography'
import { Icon, Input, Select, Switch } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import AgentCard from '../components/AgentCard.vue'
import { useAgents } from '../composables/useAgents'

const {
  agents,
  metrics,
  search,
  type,
  region,
  state,
  city,
  ownersOnly,
  implementationPartnersOnly,
  contributingPartnersOnly,
  selectedOdsCodes,
  availableOds,
  isLoading,
} = useAgents()

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
} = useResponsiveGridPagination(agents, {
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

const typeOptions: SelectOption[] = [
  { label: 'Tipo de agente', value: '' },
  { label: 'Prefeitura', value: 'MUNICIPALITY' },
  { label: 'ONG', value: 'NGO' },
  { label: 'Hotel', value: 'HOTEL' },
  { label: 'Empresa', value: 'COMPANY' },
  { label: 'Ag\u00eancia', value: 'AGENCY' },
  { label: 'Outros', value: 'OTHER' },
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

const typeValues = new Set(typeOptions.map(({ value }) => value).filter(Boolean))
const regionValues = new Set(regionOptions.map(({ value }) => value).filter(Boolean))
const stateValues = new Set(stateOptions.map(({ value }) => value).filter(Boolean))
const cityValues = new Set(cityOptions.map(({ value }) => value).filter(Boolean))
const activeFilterCount = computed(
  () =>
    [
      Boolean(search.value.trim()),
      Boolean(type.value),
      Boolean(region.value),
      Boolean(state.value),
      Boolean(city.value),
      ownersOnly.value,
      implementationPartnersOnly.value,
      contributingPartnersOnly.value,
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
    createStringQueryBinding('tipo', type, { isValid: (value) => typeValues.has(value) }),
    createStringQueryBinding('regiao', region, { isValid: (value) => regionValues.has(value) }),
    createStringQueryBinding('estado', state, { isValid: (value) => stateValues.has(value) }),
    createStringQueryBinding('cidade', city, { isValid: (value) => cityValues.has(value) }),
    createBooleanQueryBinding('responsaveis', ownersOnly),
    createBooleanQueryBinding('implementacao', implementationPartnersOnly),
    createBooleanQueryBinding('contribuicao', contributingPartnersOnly),
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
  <div class="agents-page flex flex-col" :aria-busy="isLoading">
    <PageHeader v-if="!isSearchMode" class="agents-page__header">
      <template #title>Agentes</template>
      <template #description>
        Organiza&ccedil;&otilde;es, institui&ccedil;&otilde;es e &oacute;rg&atilde;os que implementam ou participam de
        <RouterLink :to="{ name: 'actions' }" class="agents-page__context-link">a&ccedil;&otilde;es</RouterLink>
        relacionadas aos
        <RouterLink :to="{ name: 'sdgs' }" class="agents-page__context-link">
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
      class="agents-page__search-panel grid"
      aria-label="Pesquisa e filtros de agentes"
    >
      <SearchModeBackButton @close="closeSearchMode" />
      <div class="agents-page__search-input">
        <Input
          v-model="search"
          type="search"
          placeholder="Pesquisar agentes"
          aria-label="Pesquisar agentes"
        >
          <template #trailing><Icon name="search" :size="16" /></template>
        </Input>
      </div>

      <div class="agents-page__search-filters">
        <div class="agents-page__search-type">
          <Select v-model="type" :options="typeOptions" accessible-label="Filtrar por tipo de agente" />
        </div>
        <div class="agents-page__location-filters flex flex-nowrap items-center overflow-x-auto">
          <div class="agents-page__location-filter">
            <Select v-model="region" :options="regionOptions" accessible-label="Filtrar por região" />
          </div>
          <div class="agents-page__location-filter">
            <Select v-model="state" :options="stateOptions" accessible-label="Filtrar por estado" />
          </div>
          <div class="agents-page__location-filter">
            <Select v-model="city" :options="cityOptions" accessible-label="Filtrar por cidade" />
          </div>
        </div>
      </div>

      <div class="agents-page__search-switches flex flex-nowrap items-center overflow-x-auto">
        <Switch v-model="ownersOnly" size="sm" label="Donos" />
        <Switch v-model="implementationPartnersOnly" size="sm" :label="'Parceiros de implementação'" />
        <Switch v-model="contributingPartnersOnly" size="sm" :label="'Parceiros de contribuição'" />
      </div>

      <OdsFilter
        v-model="selectedOdsCodes"
        class="agents-page__ods-filter"
        :options="availableOds"
        :label="'Ações com ODS relacionadas'"
      />
    </section>

    <div class="agents-page__content grid">
      <section class="agents-page__overview flex flex-col">
        <MetricRail
          :items="metrics"
          variant="preview"
          :preview-count="5"
          popup-title="Todos os indicadores"
          class="agents-page__metrics"
        />
      </section>

      <section class="agents-page__results flex flex-col">
        <div
          ref="containerRef"
          :class="['agents-page__viewport', { '--feed': isInfiniteScroll }]"
        >
          <section class="agents-page__grid grid" :style="gridStyle">
            <AgentCard
              v-for="agent in visibleItems"
              :key="agent.id"
              :agent="agent"
              :selected-ods-codes="selectedOdsCodes"
            />
            <p
              v-if="!isLoading && agents.length === 0"
              class="agents-page__empty flex items-center justify-center"
              style="grid-column: 1 / -1; grid-row: 1 / -1"
            >
              Nenhum agente encontrado.
            </p>
          </section>
          <div
            v-if="hasMoreItems"
            ref="sentinelRef"
            class="agents-page__feed-sentinel"
            aria-hidden="true"
          />
        </div>
        <PaginationControls
          v-if="isMeasured && !isInfiniteScroll"
          class="agents-page__pagination"
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

.agents-page {
  @apply h-full min-h-0 overflow-visible pb-0 lg:overflow-hidden lg:p-1.5;
}

.agents-page__context-link {
  @apply text-primary underline;
}

.agents-page__search-panel {
  @apply shrink-0 gap-3;
}

.agents-page__search-input {
  @apply w-full;
}

.agents-page__search-filters {
  @apply flex flex-nowrap items-center gap-3 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pr-0;
}

.agents-page__search-type {
  @apply w-[8rem] shrink-0;
}

.agents-page__location-filters {
  @apply contents lg:flex lg:min-w-0 lg:gap-3 lg:overflow-visible;
}

.agents-page__location-filter {
  @apply w-[8rem] shrink-0;
}

@media (width < 1024px) {
  .agents-page__search-filters,
  .agents-page__search-switches,
  .agents-page__ods-filter {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

@media (width < 640px) {
  .agents-page__header :deep(.page-header__description) {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

.agents-page__search-switches {
  @apply gap-3 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pr-0;
}

.agents-page__search-switches :deep(.switch) {
  @apply shrink-0;
}

.agents-page__content {
  @apply mt-[var(--bp-layout-section-gap)] min-h-0 flex-1 grid-rows-[6rem_minmax(0,1fr)] gap-4 lg:mt-[clamp(0.75rem,2vh,1.25rem)] lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5;
}

.agents-page__overview {
  @apply min-h-0 min-w-0;
}

.agents-page__metrics {
  @apply min-h-0 flex-1;
}

@media (width < 1024px) {
  .agents-page__metrics {
    @apply -mr-[var(--bp-layout-page-inline)] w-[calc(100%+var(--bp-layout-page-inline))];
  }
}

.agents-page__results {
  @apply min-h-0;
}

.agents-page__viewport {
  @apply min-h-0 flex-1;
}

.agents-page__viewport.--feed {
  @apply overflow-y-auto overscroll-contain pb-4 pr-1 [scrollbar-gutter:stable];
}

.agents-page__grid {
  @apply h-full min-h-0 gap-3;
}

.agents-page__viewport.--feed .agents-page__grid {
  @apply h-auto min-h-full auto-rows-[minmax(10.625rem,auto)];
}

.agents-page__feed-sentinel {
  @apply h-px w-full;
}

.agents-page__pagination {
  @apply mt-1.5;
}

.agents-page__empty {
  @apply text-center text-muted;
}
</style>
