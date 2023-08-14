<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <AppRadio
          v-for="size in items"
          :key="size.id"
          v-model="modelValue"
          :value="size.id"
          :subtitle="size.name"
          name="diameter"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
          is-image
        />
      </div>
    </div>
  </div>
</template>

<script>
import radioMixin from "@/modules/builder/mixins/radioMixin";

export default {
  name: "BuilderSizeSelector",

  mixins: [radioMixin],
};
</script>
