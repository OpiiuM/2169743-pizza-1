<template>
  <label :class="wrapClass">
    <input
      v-bind="$attrs"
      v-on="$listeners"
      type="radio"
      :value="value"
      :checked="modelValue === value"
      :class="computedClass"
      @input="$emit('input', $event.target.value)"
    />
    <b v-if="title">{{ title }}</b>
    <span v-if="subtitle">{{ subtitle }}</span>
  </label>
</template>

<script>
export default {
  name: "AppRadio",

  inheritAttrs: false,

  model: {
    prop: "modelValue",
    event: "input",
  },

  props: {
    modelValue: {
      default: null,
    },

    value: {
      type: [String, Number, Boolean],
      required: true,
      validator(val) {
        if (typeof val === "string") {
          return !!val.trim();
        }

        return true;
      },
    },

    title: {
      type: String,
      validator: (val) => !!val.trim(),
    },

    subtitle: {
      type: String,
      validator: (val) => !!val.trim(),
    },

    isImage: {
      type: Boolean,
    },
  },

  computed: {
    wrapClass() {
      return {
        radio: !this.isImage,
      };
    },

    computedClass() {
      return {
        "visually-hidden": this.isImage,
      };
    },
  },
};
</script>
