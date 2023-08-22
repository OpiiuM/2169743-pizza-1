<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <AppRadio
          v-for="dough in items"
          :key="dough.id"
          v-model="modelValue"
          :value="dough.id"
          :title="dough.name"
          :subtitle="dough.description"
          name="dough"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          is-image
        />
      </div>
    </div>
  </div>
</template>

<script>
import radioMixin from "@/modules/builder/mixins/radioMixin";

export default {
  name: "BuilderDoughSelector",

  mixins: [radioMixin],
};
</script>
