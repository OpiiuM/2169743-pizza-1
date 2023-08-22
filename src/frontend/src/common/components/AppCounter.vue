<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      data-test="buttonMinus"
      :disabled="value <= min"
      @click="$emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': accent }"
      :disabled="value >= max"
      data-test="buttonPlus"
      @click="$emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppCounter",

  props: {
    value: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 99,
    },

    accent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
