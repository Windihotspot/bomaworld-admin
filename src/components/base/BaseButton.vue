<template>
  <button
    class="text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false
}
</script>
