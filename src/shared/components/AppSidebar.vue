<script setup lang="ts">
import logoUrl from '@/assets/img/logo.svg'
import { primaryNavigation, secondaryNavigation } from '@/shared/navigation/navigation'
</script>

<template>
  <aside
    class="sidebar hidden flex-col lg:flex"
  >
    <RouterLink :to="{ name: 'home' }" class="sidebar__brand flex items-center" aria-label="Blueprint - Inicio">
      <img :src="logoUrl" alt="" class="sidebar__logo" />
      <span class="sidebar__name">Blueprint</span>
    </RouterLink>

    <nav class="sidebar__navigation --primary grid" aria-label="Navegacao principal">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.label"
        :to="{ name: item.routeName }"
        class="sidebar__link"
        active-class="--active"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <nav class="sidebar__navigation --secondary grid" aria-label="Navegacao administrativa">
      <span v-for="item in secondaryNavigation" :key="item.label" class="sidebar__secondary-link">
        {{ item.label }}
      </span>
    </nav>

    <div class="sidebar__user flex items-center">
      <span class="sidebar__avatar flex items-center justify-center">G</span>
      <span>Gabriel Lima</span>
    </div>
  </aside>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.sidebar {
  @apply h-full min-h-0 rounded-lg border border-border bg-surface px-10 py-[clamp(1.25rem,4vh,2.5rem)];
}

.sidebar__brand {
  @apply gap-3;
}

.sidebar__logo {
  @apply size-6;
}

.sidebar__name {
  @apply text-2xl font-semibold tracking-[-0.02em] text-neutral-800;
}

.sidebar__navigation {
  @apply gap-[clamp(0.5rem,1.6vh,1rem)];
}

.sidebar__navigation.--primary {
  @apply mt-[clamp(1.5rem,5vh,3rem)];
}

.sidebar__navigation.--secondary {
  @apply mt-[clamp(1rem,3vh,2rem)];
}

.sidebar__link,
.sidebar__secondary-link {
  @apply text-base text-muted;
}

.sidebar__link {
  @apply transition-colors hover:text-foreground;
}

.sidebar__link.--active {
  @apply font-semibold text-foreground;
}

.sidebar__user {
  @apply mt-auto gap-3 text-sm text-foreground;
}

.sidebar__avatar {
  @apply size-8 rounded-full bg-neutral-100 text-neutral-500;
}
</style>
