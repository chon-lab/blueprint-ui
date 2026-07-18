<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '@/assets/img/logo.svg'
import { primaryNavigation, secondaryNavigation } from '@/shared/navigation/navigation'
import { Button, Icon } from '@/shared/ui'

const isOpen = ref(false)
const router = useRouter()

router.afterEach(() => {
  isOpen.value = false
})
</script>

<template>
  <header class="mobile-header sticky lg:hidden">
    <div class="mobile-header__bar flex items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="mobile-header__brand flex items-center">
        <img :src="logoUrl" alt="" class="mobile-header__logo" />
        <span class="mobile-header__name">Blueprint</span>
      </RouterLink>
      <Button variant="ghost" size="sm" :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'" @click="isOpen = !isOpen">
        <Icon :name="isOpen ? 'close' : 'menu'" />
      </Button>
    </div>

    <nav v-if="isOpen" class="mobile-header__navigation grid" aria-label="Navegacao mobile">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.label"
        :to="{ name: item.routeName }"
        class="mobile-header__link"
        active-class="--active"
      >
        {{ item.label }}
      </RouterLink>
      <span
        v-for="item in secondaryNavigation"
        :key="item.label"
        class="mobile-header__link"
      >
        {{ item.label }}
      </span>
    </nav>
  </header>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.mobile-header {
  @apply top-0 z-40 border-b border-border-muted bg-surface/95 backdrop-blur;
}

.mobile-header__bar {
  @apply h-16 px-4;
}

.mobile-header__brand {
  @apply gap-2.5;
}

.mobile-header__logo {
  @apply size-6;
}

.mobile-header__name {
  @apply text-xl font-semibold text-foreground;
}

.mobile-header__navigation {
  @apply gap-1 border-t border-border-muted px-4 py-4;
}

.mobile-header__link {
  @apply rounded-md px-3 py-2 text-muted;
}

.mobile-header__link.--active {
  @apply bg-primary-50 font-semibold text-primary;
}
</style>
