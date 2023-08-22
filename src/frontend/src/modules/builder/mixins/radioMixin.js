export default {
  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (typeof val !== "object") {
          this.$emit("input", Number(val));
        }
      },
    },
  },
};
