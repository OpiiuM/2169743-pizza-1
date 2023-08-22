<template>
  <div class="content__constructor">
    <AppDrop @drop="$emit('drop', $event.id)">
      <div class="pizza" :class="`pizza--foundation--${dough}-${sauce}`">
        <div class="pizza__wrapper">
          <transition-group name="scale">
            <div
              v-for="item in ingredients"
              :key="item.id"
              class="pizza__filling"
              :class="fillingClass(item)"
            />
          </transition-group>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

export default {
  name: "BuilderPizzaView",

  props: {
    dough: {
      type: String,
      default: "",
    },
    sauce: {
      type: String,
      default: "",
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    fillingClass({ value, quantity }) {
      return [
        `pizza__filling--${value}`,
        quantity === TWO_INGREDIENTS && "pizza__filling--second",
        quantity === THREE_INGREDIENTS && "pizza__filling--third",
      ];
    },
  },
};
</script>
