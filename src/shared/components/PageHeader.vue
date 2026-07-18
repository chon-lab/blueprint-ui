<template>
  <header class="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
    <div class="min-w-0">
      <h1 class="text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground md:text-[1.65rem]">
        <slot name="title" />
      </h1>
      <div v-if="$slots.description" class="mt-2 line-clamp-2 max-w-[70rem] text-sm leading-5 text-muted sm:line-clamp-none">
        <slot name="description" />
      </div>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-2.5">
      <slot name="actions" />
    </div>
  </header>
</template>
