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
  <div class="flex h-full min-h-0 flex-col overflow-hidden" :aria-busy="isLoading">
    <PageHeader>
      <template #title>A&ccedil;&otilde;es</template>
      <template #description>
        Iniciativas, projetos ou atividades realizadas por
        <RouterLink :to="{ name: 'agents' }" class="text-primary underline">agentes</RouterLink>
        do ecossistema tur&iacute;stico, relacionadas aos
        <RouterLink :to="{ name: 'sdgs' }" class="text-primary underline">
          Objetivos de Desenvolvimento Sustent&aacute;vel (ODS)
        </RouterLink>.
      </template>
      <template #actions>
        <HeaderActions />
      </template>
    </PageHeader>

    <section class="mt-[clamp(0.75rem,3vh,2rem)] grid shrink-0 gap-2.5">
      <div class="flex flex-nowrap items-center gap-2.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Select v-model="impactType" class="w-[5.25rem]" :options="typeOptions" accessible-label="Filtrar por tipo" />
        <Select v-model="region" class="w-28" :options="regionOptions" accessible-label="Filtrar por regiao" />
        <Select v-model="state" class="w-24" :options="stateOptions" accessible-label="Filtrar por estado" />
        <Select v-model="city" class="w-[10.5rem]" :options="cityOptions" accessible-label="Filtrar por cidade" />
        <div class="w-64 shrink-0 sm:ml-auto sm:w-80">
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

    <div class="mt-[clamp(0.75rem,2vh,1.25rem)] grid min-h-0 flex-1 grid-rows-[5.5rem_minmax(0,1fr)] gap-3 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5">
      <MetricRail :items="metrics" class="h-full" />

      <div class="flex min-h-0 flex-col gap-1.5">
        <section ref="containerRef" class="grid min-h-0 flex-1 gap-2.5" :style="gridStyle">
          <ActionCard v-for="action in visibleItems" :key="action.id" :action="action" />
          <p
            v-if="!isLoading && actions.length === 0"
            class="flex items-center justify-center text-center text-muted"
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
