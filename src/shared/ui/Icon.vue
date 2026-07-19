<script setup lang="ts">
import { computed } from 'vue'
import checkSvg from '@/assets/img/icons/check.svg?raw'
import chevronDownSvg from '@/assets/img/icons/chevron-down.svg?raw'
import closeSvg from '@/assets/img/icons/close.svg?raw'
import expandSvg from '@/assets/img/icons/expand.svg?raw'
import menuSvg from '@/assets/img/icons/menu.svg?raw'
import plusSvg from '@/assets/img/icons/plus.svg?raw'
import searchSvg from '@/assets/img/icons/search.svg?raw'

export type IconName = 'check' | 'chevron-down' | 'close' | 'expand' | 'menu' | 'plus' | 'search'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 18,
    strokeWidth: 1.8,
  },
)

const icons: Record<IconName, string> = {
  check: checkSvg,
  'chevron-down': chevronDownSvg,
  close: closeSvg,
  expand: expandSvg,
  menu: menuSvg,
  plus: plusSvg,
  search: searchSvg,
}

const svgMarkup = computed(() => icons[props.name])
const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  '--icon-stroke-width': props.strokeWidth,
}))
</script>

<template>
  <span class="icon" :style="iconStyle" aria-hidden="true" v-html="svgMarkup" />
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.icon {
  @apply inline-flex shrink-0;
}

.icon :deep(svg) {
  @apply size-full;
  stroke-width: var(--icon-stroke-width);
}
</style>
