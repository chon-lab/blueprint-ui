<script setup lang="ts">
import { Button, Icon } from '@/shared/ui'

withDefaults(
  defineProps<{
    showCustomize?: boolean
    showRegister?: boolean
    registerMenu?: boolean
  }>(),
  {
    showCustomize: true,
    showRegister: true,
    registerMenu: false,
  },
)
</script>

<template>
  <Button variant="secondary" size="sm">Feedback</Button>
  <Button v-if="showCustomize" variant="secondary" size="sm">Customizar</Button>
  <Button v-if="showRegister" size="sm">
    Registrar
    <template v-if="registerMenu" #trailing>
      <Icon name="chevron-down" :size="15" />
    </template>
  </Button>
</template>
