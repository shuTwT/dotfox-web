<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "formDesign"
});

const starfishRef = ref();

const menu = ref({
  left: [],
  right: [],
  column: false
});

const panel = ref(["form", "json", "global"]);

const onSave = (res: any[]) => {};

const goSave = () => {};

const goPreview = () => {};

const setJson = () => {};
</script>

<template>
  <div class="starfish-editor-wrapper">
    <starfish-editor
      ref="starfishRef"
      class="starfish-editor"
      :menu="menu"
      :panel="panel"
      @save="onSave"
    />
  </div>
</template>

<style lang="scss" scoped>
.starfish-editor-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}

.starfish-editor {
  width: 100%;
  height: 100%;
}
</style>
