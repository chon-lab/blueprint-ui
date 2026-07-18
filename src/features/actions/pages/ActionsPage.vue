<script setup lang="ts">
import HeaderActions from '@/shared/components/HeaderActions.vue'
import MetricRail from '@/shared/components/MetricRail.vue'
import OdsFilter from '@/shared/components/OdsFilter.vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import { useResponsiveGridPagination } from '@/shared/composables/useResponsiveGridPagination'
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
  currentPage,
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
  minItemHeight: 180,
  maxRows: 4,
})

const typeOptions: SelectOption[] = [
  { label: 'Tipo', value: '' },
  { label: 'Base', value: 'FOUNDATIONAL_ACTION' },
  { label: 'Impacto direto', value: 'DIRECTLY_IMPACTS' },
  { label: 'Impacto indireto', value: 'INDIRECTLY_IMPACTS' },
]

const regionOptions: SelectOption[] = [
  { label: 'Regi\u00e3o', value: '' },
  { label: 'Nordeste', value: 'northeast' },
  { label: 'Sudeste', value: 'southeast' },
  { label: 'Sul', value: 'south' },
]

const stateOptions: SelectOption[] = [
  { label: 'Estado', value: '' },
  { label: 'Para\u00edba', value: 'paraiba' },
]

const cityOptions: SelectOption[] = [
  { label: 'Cidade', value: '' },
  { label: 'Campina Grande', value: 'campina-grande' },
]
</script>

<template>
  <div class="actions-page flex flex-col overflow-hidden" :aria-busy="isLoading">
    <PageHeader>
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
        <HeaderActions />
      </template>
    </PageHeader>

    <section class="actions-page__filters grid">
      <div class="actions-page__filter-row flex flex-nowrap items-center overflow-x-auto">
        <Select v-model="impactType" class="actions-page__filter --type" :options="typeOptions" accessible-label="Filtrar por tipo" />
        <Select v-model="region" class="actions-page__filter --region" :options="regionOptions" accessible-label="Filtrar por regiao" />
        <Select v-model="state" class="actions-page__filter --state" :options="stateOptions" accessible-label="Filtrar por estado" />
        <Select v-model="city" class="actions-page__filter --city" :options="cityOptions" accessible-label="Filtrar por cidade" />
        <div class="actions-page__search">
          <Input v-model="search" placeholder="Pesquisar" aria-label="Pesquisar acoes">
            <template #trailing><Icon name="search" :size="16" /></template>
          </Input>
        </div>
      </div>
      <OdsFilter
        v-model="selectedOdsCodes"
        :options="availableOds"
        label="ODS relacionadas"
      />
    </section>

    <div class="actions-page__content grid">
      <MetricRail :items="metrics" class="actions-page__metrics" />

      <div class="actions-page__results flex flex-col">
        <section ref="containerRef" class="actions-page__grid grid" :style="gridStyle">
          <ActionCard v-for="action in visibleItems" :key="action.id" :action="action" />
          <p
            v-if="!isLoading && actions.length === 0"
            class="actions-page__empty flex items-center justify-center"
            style="grid-column: 1 / -1; grid-row: 1 / -1"
          >
            Nenhuma a&ccedil;&atilde;o encontrada.
          </p>
        </section>
        <PaginationControls :current-page="currentPage" :page-count="pageCount" @change="goToPage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.actions-page {
  @apply h-full min-h-0;
}

.actions-page__context-link {
  @apply text-primary underline;
}

.actions-page__filters {
  @apply mt-[clamp(0.75rem,3vh,2rem)] shrink-0 gap-2.5;
}

.actions-page__filter-row {
  @apply gap-2.5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;
}

.actions-page__filter {
  @apply shrink-0;
}

.actions-page__filter.--type {
  @apply w-[5.25rem];
}

.actions-page__filter.--region {
  @apply w-28;
}

.actions-page__filter.--state {
  @apply w-24;
}

.actions-page__filter.--city {
  @apply w-[10.5rem];
}

.actions-page__search {
  @apply w-64 shrink-0 sm:ml-auto sm:w-80;
}

.actions-page__content {
  @apply mt-[clamp(0.75rem,2vh,1.25rem)] min-h-0 flex-1 grid-rows-[5.5rem_minmax(0,1fr)] gap-3 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5;
}

.actions-page__metrics {
  @apply h-full;
}

.actions-page__results {
  @apply min-h-0 gap-1.5;
}

.actions-page__grid {
  @apply min-h-0 flex-1 gap-2.5;
}

.actions-page__empty {
  @apply text-center text-muted;
}
</style>
