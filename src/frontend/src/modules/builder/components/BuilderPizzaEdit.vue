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

    <BuilderPizzaView
      :dough="builder.dough.size"
      :sauce="builder.sauce.value"
      :ingredients="ingredientsExtended"
      @drop="INCREMENT_INGREDIENT_QUANTITY"
    />

    <div class="content__result">
      <p>Итого: {{ price }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="disableSubmit"
        @click="addToCart"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "BuilderPizzaEdit",

  components: {
    BuilderPizzaView,
  },

  computed: {
    ...mapState("Builder", ["name"]),
    ...mapGetters("Builder", ["builder", "ingredientsExtended", "price"]),

    pizzaName: {
      get() {
        return this.name;
      },
      set(value) {
        this.SET_BUILDER_NAME(value);
      },
    },

    disableSubmit() {
      return this.pizzaName.length === 0 || this.price === 0;
    },
  },

  methods: {
    ...mapMutations("Builder", [
      "CLEAR_STATE",
      "SET_BUILDER_NAME",
      "INCREMENT_INGREDIENT_QUANTITY",
    ]),

    addToCart() {
      console.log("addToCart");
      // await this.$router.push('/cart');
      // this.CLEAR_STATE();
    },
  },
};
</script>
