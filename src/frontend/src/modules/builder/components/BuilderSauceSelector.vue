<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <AppRadio
      v-for="sauce in items"
      :key="sauce.id"
      v-model="modelValue"
      :value="sauce.id"
      :subtitle="sauce.name"
      name="sauce"
      class="ingredients__input"
    />
  </div>
</template>

<script>
import radioMixin from "@/modules/builder/mixins/radioMixin";

export default {
  name: "BuilderSauceSelector",

  mixins: [radioMixin],
};
</script>
