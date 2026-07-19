<script setup lang="ts">
import AppSidebar from '@/shared/components/AppSidebar.vue'
import MobileHeader from '@/shared/components/MobileHeader.vue'
import { isSearchModeActive } from '@/shared/composables/useSearchMode'
</script>

<template>
  <div class="app-layout lg:grid">
    <AppSidebar />
    <div class="app-content flex flex-col">
      <MobileHeader v-if="!isSearchModeActive" />
      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.app-layout {
  @apply h-dvh min-h-0 overflow-hidden bg-background lg:grid-cols-[17.875rem_minmax(0,1fr)] lg:gap-12 lg:p-2.5;
}

.app-content {
  @apply h-full min-h-0 min-w-0;
}

.app-main {
  @apply min-h-0 flex-1 overflow-visible px-[var(--bp-layout-page-inline)] pb-0 pt-[var(--bp-layout-page-top)] lg:overflow-hidden lg:px-0 lg:py-[clamp(1rem,3.8vh,2.5rem)] lg:pr-10;
}
</style>
