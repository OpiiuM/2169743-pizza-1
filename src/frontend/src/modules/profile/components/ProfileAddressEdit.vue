<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="handleSubmit"
  >
    <div class="address-form__header">
      <b>Адрес №{{ index || address.id }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          tag="label"
          :label="field.name.label"
          :name="field.name.name"
          :placeholder="field.name.placeholder"
          :required="field.name.required"
          v-model.trim="field.name.value"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          tag="label"
          :label="field.street.label"
          :name="field.street.name"
          :placeholder="field.street.placeholder"
          :required="field.street.required"
          v-model.trim="field.street.value"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          tag="label"
          :label="field.building.label"
          :name="field.building.name"
          :placeholder="field.building.placeholder"
          :required="field.building.required"
          v-model.trim="field.building.value"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          tag="label"
          :label="field.flat.label"
          :name="field.flat.name"
          :placeholder="field.flat.placeholder"
          :required="field.flat.required"
          v-model.trim="field.flat.value"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          tag="label"
          :label="field.comment.label"
          :name="field.comment.name"
          :placeholder="field.comment.placeholder"
          :required="field.comment.required"
          v-model.trim="field.comment.value"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        v-show="buttonShow"
        @click="resetHandler"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import validator from "@/common/mixins/validator";

import { profileAddressEdit } from "@/common/enums";

export default {
  name: "ProfileAddressEdit",

  mixins: [validator],

  props: {
    address: {
      type: Object,
      default: () => {},
    },

    index: {
      type: Number,
    },
  },

  data() {
    return {
      field: {
        ...profileAddressEdit.field,
      },
      validations: {
        building: {
          error: "",
          rules: ["number"],
        },
        flat: {
          error: "",
          rules: ["number"],
        },
      },
    };
  },

  computed: {
    buttonShow() {
      return !!this.address?.id;
    },
  },

  mounted() {
    if (Object.keys(this.address || {}).length) {
      for (const key in this.address) {
        if (this.field.hasOwnProperty(key)) {
          this.field[key].value = this.address[key];
        }
      }
    }
  },

  methods: {
    resetHandler() {
      this.$emit("remove");
    },

    handleSubmit() {
      const { name, street, building, flat, comment } = this.field;

      if (
        !this.$validateFields(
          { building: building.value, flat: flat.value },
          this.validations
        )
      ) {
        this.$showErrors();

        return;
      }

      this.$emit("saveData", {
        ...this.address,
        name: name.value,
        street: street.value,
        building: building.value,
        flat: flat.value,
        comment: comment.value,
      });
    },
  },
};
</script>
