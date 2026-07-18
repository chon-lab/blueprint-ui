<script setup lang="ts">
import logoUrl from '@/assets/img/logo.svg'
import { primaryNavigation, secondaryNavigation } from '@/shared/navigation/navigation'
</script>

<template>
  <aside
    class="hidden h-full min-h-0 flex-col rounded-lg border border-border bg-surface px-10 py-[clamp(1.25rem,4vh,2.5rem)] lg:flex"
  >
    <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3" aria-label="Blueprint - Inicio">
      <img :src="logoUrl" alt="" class="size-6" />
      <span class="text-2xl font-semibold tracking-[-0.02em] text-neutral-800">Blueprint</span>
    </RouterLink>

    <nav class="mt-[clamp(1.5rem,5vh,3rem)] grid gap-[clamp(0.5rem,1.6vh,1rem)]" aria-label="Navegacao principal">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.label"
        :to="{ name: item.routeName }"
        class="text-base text-muted transition-colors hover:text-foreground"
        active-class="font-semibold text-foreground"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <nav class="mt-[clamp(1rem,3vh,2rem)] grid gap-[clamp(0.5rem,1.6vh,1rem)]" aria-label="Navegacao administrativa">
      <span v-for="item in secondaryNavigation" :key="item.label" class="text-base text-muted">
        {{ item.label }}
      </span>
    </nav>

    <div class="mt-auto flex items-center gap-3 text-sm text-foreground">
      <span class="flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">G</span>
      <span>Gabriel Lima</span>
    </div>
  </aside>
</template>
