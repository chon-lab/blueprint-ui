<script setup lang="ts">
import AppSidebar from '@/shared/components/AppSidebar.vue'
import MobileHeader from '@/shared/components/MobileHeader.vue'
</script>

<template>
  <div class="h-dvh min-h-0 overflow-hidden bg-background lg:grid lg:grid-cols-[17.875rem_minmax(0,1fr)] lg:gap-12 lg:p-2.5">
    <AppSidebar />
    <div class="flex h-full min-h-0 min-w-0 flex-col">
      <MobileHeader />
      <main class="min-h-0 flex-1 overflow-hidden px-4 py-[clamp(1rem,3.8vh,2.5rem)] sm:px-6 lg:px-0 lg:pr-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
