<script setup lang="ts">
import HeaderActions from '@/shared/components/HeaderActions.vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import { useResponsiveGridPagination } from '@/shared/composables/useResponsiveGridPagination'
import SdgCard from '../components/SdgCard.vue'
import { useSdgs } from '../composables/useSdgs'

const { sdgs, isLoading } = useSdgs()

const {
  containerRef,
  currentPage,
  pageCount,
  visibleItems,
  gridStyle,
  goToPage,
} = useResponsiveGridPagination(sdgs, {
  breakpoints: [
    { minWidth: 1200, columns: 6 },
    { minWidth: 880, columns: 4 },
    { minWidth: 600, columns: 3 },
    { minWidth: 360, columns: 2 },
    { minWidth: 0, columns: 1 },
  ],
  minItemHeight: 150,
  maxRows: 3,
})
</script>

<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden" :aria-busy="isLoading">
    <PageHeader>
      <template #title>Objetivos de Desenvolvimento Nacional (ODS)</template>
      <template #description>
        S&atilde;o um conjunto de 17 objetivos globais definidos pela ONU para orientar a&ccedil;&otilde;es voltadas ao desenvolvimento sustent&aacute;vel, integrando dimens&otilde;es sociais, econ&ocirc;micas e ambientais.
      </template>
      <template #actions>
        <HeaderActions :show-customize="false" :show-register="false" />
      </template>
    </PageHeader>

    <section ref="containerRef" class="mt-[clamp(0.75rem,4vh,2.5rem)] grid min-h-0 flex-1 gap-2.5" :style="gridStyle">
      <SdgCard v-for="sdg in visibleItems" :key="sdg.id" :sdg="sdg" />
    </section>
    <PaginationControls :current-page="currentPage" :page-count="pageCount" @change="goToPage" />
  </div>
</template>
