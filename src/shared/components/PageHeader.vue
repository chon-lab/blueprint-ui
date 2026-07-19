<template>
  <header class="page-header flex flex-col xl:flex-row xl:items-start xl:justify-between">
    <div class="page-header__content">
      <h1 class="page-header__title">
        <slot name="title" />
      </h1>
      <div v-if="$slots.description" class="page-header__description">
        <div class="page-header__description-content">
          <slot name="description" />
        </div>
      </div>
    </div>
    <div v-if="$slots.actions" class="page-header__actions flex flex-wrap items-center">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
@reference "@/assets/styles/main.css";

.page-header {
  @apply gap-5;
}

.page-header__content {
  @apply min-w-0;
}

.page-header__title {
  @apply text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground md:text-[1.65rem];
}

.page-header__description {
  @apply mt-2 max-w-[70rem] text-sm leading-5 text-muted;
}

@media (width < 640px) {
  .page-header__description {
    @apply min-h-10 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;
  }

  .page-header__description-content {
    @apply min-h-10 w-[42rem] whitespace-normal;
  }
}

.page-header__actions {
  @apply shrink-0 gap-2.5;
}
</style>
