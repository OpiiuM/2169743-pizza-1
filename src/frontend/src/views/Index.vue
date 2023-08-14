<template>
  <div class="page">
    <main class="content">
      <form data-test="form" @submit.prevent="handleSubmit">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector v-model="doughId" :items="pizza.doughes" />
          <BuilderSizeSelector v-model="sizeId" :items="pizza.sizes" />

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <BuilderSauceSelector v-model="sauceId" :items="pizza.sauces" />
                <BuilderIngredientsSelector
                  :values="ingredientQuantities"
                  :items="pizza.ingredients"
                  @update="SET_INGREDIENT_QUANTITY"
                />
              </div>
            </div>
          </div>

          <BuilderPizzaView />

          <ul>
            <li>dough: {{ doughId }}</li>
            <li>size: {{ sizeId }}</li>
            <li>sauce: {{ sauceId }}</li>
            <li>ingredients: {{ ingredients }}</li>
          </ul>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  data() {
    return {
      doughId: 1,
      sizeId: 1,
      sauceId: 1,
      ingredientsId: [],
      ingredientValues: {},
      // ingredients: [],
    };
  },

  computed: {
    ...mapGetters(["pizza"]),
    ...mapState("Builder", ["ingredients"]),
    ...mapGetters("Builder", ["ingredientQuantities"]),

    // doughId: { get(), set() },
    // sauceId: { get(), set() },
    // sizeId: {  get(), set() },
  },

  mounted() {
    // console.log("this.ingredients", [
    //   this.ingredients,
    //   this.getEntity("ingredients"),
    // ]);
  },

  methods: {
    ...mapMutations("Builder", ["SET_INGREDIENT_QUANTITY"]),
  },
};
</script>
