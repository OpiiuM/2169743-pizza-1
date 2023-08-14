<template>
  <div class="content__pizza">
    <AppInput
      v-model="pizzaName"
      tag="label"
      label="Название пиццы"
      hidden-label
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
    />

    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ price }} ₽</p>
      <button type="submit" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderPizzaView",

  computed: {
    ...mapState("Builder", ["name", "price"]),

    pizzaName: {
      get() {
        return this.name;
      },
      set(value) {
        this.SET_BUILDER_NAME(value);
      },
    },
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER_NAME"]),
  },
};
</script>
