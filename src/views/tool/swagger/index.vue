<script setup lang="ts">
defineOptions({
  name: "swagger"
});
</script>

<template>
  <iframe class="frame-iframe" src="/api/swagger/index.html" />
</template>
<style lang="scss" scoped>
.frame-iframe {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
</style>
