<script setup lang="ts">
import HeaderActions from '@/shared/components/HeaderActions.vue'
import MetricCard from '@/shared/components/MetricCard.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import PaginationControls from '@/shared/components/PaginationControls.vue'
import { useResponsiveGridPagination } from '@/shared/composables/useResponsiveGridPagination'
import RankingCard from '../components/RankingCard.vue'
import { useDashboard } from '../composables/useDashboard'

const { indicators, rankings, isLoading } = useDashboard()

const {
  containerRef: indicatorsGridRef,
  currentPage: indicatorsCurrentPage,
  pageCount: indicatorsPageCount,
  visibleItems: visibleIndicators,
  gridStyle: indicatorsGridStyle,
  goToPage: goToIndicatorsPage,
} = useResponsiveGridPagination(indicators, {
  breakpoints: [
    { minWidth: 760, columns: 5 },
    { minWidth: 640, columns: 4 },
    { minWidth: 420, columns: 3 },
    { minWidth: 0, columns: 2 },
  ],
  minItemHeight: 88,
  maxRows: 2,
  gap: 12,
})

const {
  containerRef: rankingsGridRef,
  currentPage: rankingsCurrentPage,
  pageCount: rankingsPageCount,
  visibleItems: visibleRankings,
  gridStyle: rankingsGridStyle,
  goToPage: goToRankingsPage,
} = useResponsiveGridPagination(rankings, {
  breakpoints: [
    { minWidth: 780, columns: 3 },
    { minWidth: 520, columns: 2 },
    { minWidth: 0, columns: 1 },
  ],
  minItemHeight: 180,
  maxRows: 1,
  gap: 12,
})
</script>

<template>
  <div class="dashboard-page flex flex-col overflow-hidden" :aria-busy="isLoading">
    <PageHeader>
      <template #title>In&iacute;cio</template>
      <template #actions>
        <HeaderActions />
      </template>
    </PageHeader>

    <div class="dashboard-page__content grid">
      <section class="dashboard-page__overview flex flex-col">
        <h2 class="dashboard-page__section-title">Indicadores</h2>
        <div
          ref="indicatorsGridRef"
          data-testid="indicators-grid"
          class="dashboard-page__indicators grid overflow-hidden"
          :style="indicatorsGridStyle"
        >
          <MetricCard
            v-for="indicator in visibleIndicators"
            :key="indicator.label"
            v-bind="indicator"
          />
        </div>

        <PaginationControls
          class="dashboard-page__indicator-pagination"
          :current-page="indicatorsCurrentPage"
          :page-count="indicatorsPageCount"
          :show-arrows="false"
          aria-label="Paginacao dos indicadores"
          @change="goToIndicatorsPage"
        />

        <div
          ref="rankingsGridRef"
          data-testid="rankings-grid"
          class="dashboard-page__rankings grid overflow-hidden"
          :style="rankingsGridStyle"
        >
          <RankingCard v-for="ranking in visibleRankings" :key="ranking.id" :ranking="ranking" />
        </div>

        <PaginationControls
          class="dashboard-page__ranking-pagination"
          :current-page="rankingsCurrentPage"
          :page-count="rankingsPageCount"
          :show-arrows="false"
          aria-label="Paginacao dos rankings"
          @change="goToRankingsPage"
        />
      </section>

      <section class="dashboard-page__map-section hidden flex-col 2xl:flex">
        <h2 class="dashboard-page__section-title">Distribui&ccedil;&atilde;o das a&ccedil;&otilde;es pelo territ&oacute;rio</h2>
        <div
          class="dashboard-page__map"
          aria-label="Area reservada para o mapa de distribuicao territorial"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.dashboard-page {
  @apply h-full min-h-0;
}

.dashboard-page__content {
  @apply mt-[var(--bp-layout-section-gap)] min-h-0 flex-1 gap-5 lg:mt-[clamp(0.75rem,4vh,2.5rem)] 2xl:grid-cols-[minmax(0,1fr)_minmax(22rem,36%)];
}

.dashboard-page__overview,
.dashboard-page__map-section {
  @apply min-h-0 min-w-0;
}

.dashboard-page__section-title {
  @apply mb-3 shrink-0 text-base font-medium text-foreground;
}

.dashboard-page__indicators {
  @apply min-h-0 flex-[1.05] gap-3;
}

.dashboard-page__indicator-pagination {
  @apply my-0.5;
}

.dashboard-page__rankings {
  @apply min-h-0 flex-1 gap-3;
}

.dashboard-page__ranking-pagination {
  @apply mt-0.5;
}

.dashboard-page__map {
  @apply min-h-0 flex-1 rounded-lg border border-border bg-[linear-gradient(145deg,var(--bp-color-neutral-0),var(--bp-color-neutral-50))];
}
</style>
