<script setup lang="ts">
import HeaderActions from '@/shared/components/HeaderActions.vue'
import MetricRail from '@/shared/components/MetricRail.vue'
import OdsFilter from '@/shared/components/OdsFilter.vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import { useResponsiveGridPagination } from '@/shared/composables/useResponsiveGridPagination'
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
  currentPage,
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
  minItemHeight: 180,
  maxRows: 4,
})

const typeOptions: SelectOption[] = [
  { label: 'Tipo', value: '' },
  { label: 'Prefeitura', value: 'MUNICIPALITY' },
  { label: 'ONG', value: 'NGO' },
  { label: 'Hotel', value: 'HOTEL' },
  { label: 'Empresa', value: 'COMPANY' },
]

const regionOptions: SelectOption[] = [
  { label: 'Regi\u00e3o', value: '' },
  { label: 'Nordeste', value: 'northeast' },
  { label: 'Sudeste', value: 'southeast' },
  { label: 'Sul', value: 'south' },
]

const stateOptions: SelectOption[] = [
  { label: 'Estado', value: '' },
  { label: 'Bahia', value: 'bahia' },
  { label: 'Para\u00edba', value: 'paraiba' },
  { label: 'Pernambuco', value: 'pernambuco' },
]

const cityOptions: SelectOption[] = [
  { label: 'Cidade', value: '' },
  { label: 'Campina Grande', value: 'campina-grande' },
  { label: 'Recife', value: 'recife' },
  { label: 'Salvador', value: 'salvador' },
]
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden" :aria-busy="isLoading">
    <PageHeader>
      <template #title>Agentes</template>
      <template #description>
        Organiza&ccedil;&otilde;es, institui&ccedil;&otilde;es e &oacute;rg&atilde;os que implementam ou participam de
        <RouterLink :to="{ name: 'actions' }" class="text-primary underline">a&ccedil;&otilde;es</RouterLink>
        relacionadas aos
        <RouterLink :to="{ name: 'sdgs' }" class="text-primary underline">
          Objetivos de Desenvolvimento Sustent&aacute;vel (ODS)
        </RouterLink>.
      </template>
      <template #actions>
        <HeaderActions />
      </template>
    </PageHeader>

    <section class="mt-[clamp(0.75rem,3vh,2rem)] grid shrink-0 gap-2.5">
      <div class="flex flex-nowrap items-center gap-4 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex shrink-0 flex-nowrap gap-2.5">
          <Select v-model="type" class="w-[5.25rem]" :options="typeOptions" accessible-label="Filtrar por tipo" />
          <Select v-model="region" class="w-28" :options="regionOptions" accessible-label="Filtrar por regiao" />
          <Select v-model="state" class="w-24" :options="stateOptions" accessible-label="Filtrar por estado" />
          <Select v-model="city" class="w-24" :options="cityOptions" accessible-label="Filtrar por cidade" />
        </div>

        <div class="flex shrink-0 flex-nowrap items-center gap-4">
          <Switch v-model="ownersOnly" size="sm" label="Donos" />
          <Switch v-model="implementationPartnersOnly" size="sm" :label="'Parceiros de implementa\u00e7\u00e3o'" />
          <Switch v-model="contributingPartnersOnly" size="sm" :label="'Parceiros de contribui\u00e7\u00e3o'" />
        </div>

        <div class="w-64 shrink-0 xl:ml-auto xl:w-80">
          <Input v-model="search" placeholder="Pesquisar" aria-label="Pesquisar agentes">
            <template #trailing><Icon name="search" :size="16" /></template>
          </Input>
        </div>
      </div>

      <OdsFilter
        v-model="selectedOdsCodes"
        :options="availableOds"
        :label="'A\u00e7\u00f5es com ODS relacionadas'"
      />
    </section>

    <div class="mt-[clamp(0.75rem,2vh,1.25rem)] grid min-h-0 flex-1 grid-rows-[5.5rem_minmax(0,1fr)] gap-3 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-rows-1 lg:gap-5">
      <MetricRail :items="metrics" class="h-full" />

      <div class="flex min-h-0 flex-col gap-1.5">
        <section ref="containerRef" class="grid min-h-0 flex-1 gap-2.5" :style="gridStyle">
          <AgentCard v-for="agent in visibleItems" :key="agent.id" :agent="agent" />
          <p
            v-if="!isLoading && agents.length === 0"
            class="flex items-center justify-center text-center text-muted"
            style="grid-column: 1 / -1; grid-row: 1 / -1"
          >
            Nenhum agente encontrado.
          </p>
        </section>
        <PaginationControls :current-page="currentPage" :page-count="pageCount" @change="goToPage" />
      </div>
    </div>
  </div>
</template>
