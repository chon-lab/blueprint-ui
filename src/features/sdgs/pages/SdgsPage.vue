<script setup lang="ts">
import HeaderActions from '@/shared/components/HeaderActions.vue'
import PageHeader from '@/shared/components/PageHeader.vue'
import SdgCard from '../components/SdgCard.vue'
import { useSdgs } from '../composables/useSdgs'

const { sdgs, isLoading } = useSdgs()
</script>

<template>
  <div class="sdgs-page flex flex-col" :aria-busy="isLoading">
    <PageHeader class="sdgs-page__header">
      <template #title>Objetivos de Desenvolvimento Nacional (ODS)</template>
      <template #description>
        S&atilde;o um conjunto de 17 objetivos globais definidos pela ONU para orientar a&ccedil;&otilde;es voltadas ao desenvolvimento sustent&aacute;vel, integrando dimens&otilde;es sociais, econ&ocirc;micas e ambientais.
      </template>
      <template #actions>
        <HeaderActions :show-customize="false" :show-register="false" />
      </template>
    </PageHeader>

    <section class="sdgs-page__grid grid">
      <SdgCard v-for="sdg in sdgs" :key="sdg.id" :sdg="sdg" />
    </section>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.sdgs-page {
  @apply h-full min-h-0 overflow-visible lg:overflow-hidden;
}

.sdgs-page__grid {
  @apply mt-[clamp(0.75rem,3vh,2rem)] min-h-0 flex-1 auto-cols-[minmax(15rem,78vw)] grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto pb-4 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;
}

@media (width < 640px) {
  .sdgs-page__grid {
    @apply -mr-4 w-[calc(100%+1rem)];
  }

  .sdgs-page__header :deep(.page-header__description) {
    @apply -mr-4 w-[calc(100%+1rem)];
  }
}

@media (width >= 640px) {
  .sdgs-page__grid {
    @apply auto-cols-auto grid-flow-row grid-cols-4 grid-rows-5 overflow-hidden pb-0 pr-0;
  }
}

@media (width >= 900px) {
  .sdgs-page__grid {
    @apply gap-2.5;

    @apply grid-cols-6 grid-rows-3;
  }
}
</style>
