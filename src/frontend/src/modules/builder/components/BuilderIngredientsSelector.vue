<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in items"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :data-transfer="ingredient"
          :draggable="values[ingredient.id] < MAX_INGREDIENT_COUNT"
        >
          <span class="filling" :class="`filling--${ingredient.value}`">
            {{ ingredient.name }}
          </span>
        </AppDrag>

        <AppCounter
          class="ingredients__counter"
          :value="values[ingredient.id]"
          :min="0"
          :max="MAX_INGREDIENT_COUNT"
          @input="inputValue(ingredient.id, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",

  props: {
    values: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      MAX_INGREDIENT_COUNT,
    };
  },

  methods: {
    setValue(ingredient, count) {
      this.$emit("update", {
        ingredientId: ingredient,
        count: Number(count),
      });
    },

    inputValue(ingredient, count) {
      return this.setValue(
        ingredient,
        Math.min(MAX_INGREDIENT_COUNT, Number(count))
      );
    },
  },
};
</script>
