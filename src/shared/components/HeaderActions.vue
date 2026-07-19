<script setup lang="ts">
import { Button, Icon } from '@/shared/ui'

withDefaults(
  defineProps<{
    showCustomize?: boolean
    showRegister?: boolean
  }>(),
  {
    showCustomize: true,
    showRegister: true,
  },
)
</script>

<template>
  <Button variant="secondary">Feedback</Button>
  <Button v-if="showCustomize" variant="secondary">Customizar</Button>
  <slot name="before-create" />
  <Button
    v-if="showRegister"
    icon-only
    aria-label="Criar novo cadastro"
    title="Criar novo cadastro"
  >
    <Icon name="plus" :size="18" />
  </Button>
</template>
