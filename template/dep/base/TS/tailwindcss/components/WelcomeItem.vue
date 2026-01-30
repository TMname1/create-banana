<template>
  <div
    class="relative mt-8 flex lg:before:absolute lg:before:-top-6.25 lg:before:left-0 lg:before:h-[calc(50%)] lg:before:border-l lg:before:border-(--color-border) lg:before:content-[''] lg:after:absolute lg:after:top-[calc(50%+25px)] lg:after:left-0 lg:after:h-[calc(50%-25px)] lg:after:border-l lg:after:border-(--color-border) lg:after:content-[''] lg:first:before:hidden lg:last:after:hidden"
  >
    <i
      class="flex h-8 w-8 items-center justify-center text-(--color-text) lg:absolute lg:top-[calc(50%-25px)] lg:-left-6 lg:h-12 lg:w-12 lg:rounded-lg lg:border lg:border-(--color-border) lg:bg-(--color-background)"
    >
      <slot name="icon"></slot>
    </i>
    <div class="flex-1 py-4 pl-22">
      <h3 class="pb-[0.4rem] text-[1.2rem] font-extrabold text-(--color-heading)">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
