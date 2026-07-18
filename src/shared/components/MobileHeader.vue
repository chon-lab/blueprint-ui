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
  <header class="sticky top-0 z-40 border-b border-border-muted bg-surface/95 backdrop-blur lg:hidden">
    <div class="flex h-16 items-center justify-between px-4">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2.5">
        <img :src="logoUrl" alt="" class="size-6" />
        <span class="text-xl font-semibold text-foreground">Blueprint</span>
      </RouterLink>
      <Button variant="ghost" size="sm" :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'" @click="isOpen = !isOpen">
        <Icon :name="isOpen ? 'close' : 'menu'" />
      </Button>
    </div>

    <nav v-if="isOpen" class="grid gap-1 border-t border-border-muted px-4 py-4" aria-label="Navegacao mobile">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.label"
        :to="{ name: item.routeName }"
        class="rounded-md px-3 py-2 text-muted"
        active-class="bg-primary-50 font-semibold text-primary"
      >
        {{ item.label }}
      </RouterLink>
      <span
        v-for="item in secondaryNavigation"
        :key="item.label"
        class="rounded-md px-3 py-2 text-muted"
      >
        {{ item.label }}
      </span>
    </nav>
  </header>
</template>
