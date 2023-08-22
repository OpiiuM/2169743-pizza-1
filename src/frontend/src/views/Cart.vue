<template>
  <form class="layout-form" @submit.prevent="handleSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <ul class="cart-list sheet" v-if="builderList.length">
          <CartProductSelector
            v-for="(order, index) in builderList"
            :key="index"
            class="cart-list__item"
            tag="li"
            :id="order.id"
            :order="order"
            :selected="builderList"
            @change="changeCountBuilder"
          />
        </ul>
        <div class="sheet cart__empty" v-else>
          <p>В корзине нет ни одного товара</p>
        </div>

        <div class="cart__additional" v-if="builderList.length">
          <ul class="additional-list">
            <CartAdditionalSelector
              class="additional-list__item sheet"
              v-for="item in misc"
              :key="item.id"
              tag="li"
              :id="item.id"
              :additional="item"
              :selected="miscList"
              @change="changeCountMisc"
            />
          </ul>
        </div>

        <div class="cart__form" v-if="builderList.length">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">{{ form.select.label }}</span>
              <select
                class="select"
                :name="form.select.name"
                :value="receive.value"
                @input="handleSelect($event)"
              >
                <option
                  v-for="(option, index) in selectOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.name }}
                </option>
              </select>
            </label>

            <AppInput
              class="input--big-label"
              :label="form.phone.label"
              :type="form.phone.type"
              :name="form.phone.name"
              :placeholder="form.phone.placeholder"
              v-model.trim="form.phone.value"
            />

            <div class="cart-form__address" v-if="receive.value !== 'customer'">
              <span class="cart-form__label" v-if="form.address.label">
                {{ form.address.label }}
              </span>
              <div class="cart-form__input">
                <AppInput
                  :label="form.address.field.street.label"
                  :type="form.address.field.street.type"
                  :name="form.address.field.street.name"
                  v-model.trim="form.address.field.street.value"
                  :disabled="!isNewAddress"
                  required
                />
              </div>
              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  :label="form.address.field.building.label"
                  :type="form.address.field.building.type"
                  :name="form.address.field.building.name"
                  v-model.trim="form.address.field.building.value"
                  :disabled="!isNewAddress"
                  required
                />
              </div>
              <div class="cart-form__input cart-form__input--small">
                <AppInput
                  :label="form.address.field.flat.label"
                  :type="form.address.field.flat.type"
                  :name="form.address.field.flat.name"
                  v-model.trim="form.address.field.flat.value"
                  :disabled="!isNewAddress"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer" v-if="builderList.length">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ orderPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>

    <transition name="fade">
      <AppPopup v-if="isPopupOpen" @close="closePopup" />
    </transition>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import CartProductSelector from "@/modules/cart/components/CartProductSelector";
import CartAdditionalSelector from "@/modules/cart/components/CartAdditionalSelector";

import validator from "@/common/mixins/validator";

import { pageCart } from "@/common/enums";
import { SETUP_OPTIONS } from "@/common/enums/addressOptions";

export default {
  name: "Cart",

  components: {
    CartProductSelector,
    CartAdditionalSelector,
  },

  mixins: [validator],

  data() {
    return {
      isPopupOpen: false,

      form: {
        select: {
          label: "Получение заказа:",
          name: "test",
        },
        phone: {
          ...pageCart.phone,
        },
        address: {
          label: "Новый адрес:",
          field: {
            street: {
              ...pageCart.address.street,
            },
            building: {
              ...pageCart.address.building,
            },
            flat: {
              ...pageCart.address.flat,
            },
          },
        },
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
    ...mapState("Auth", ["isAuthenticated"]),
    ...mapGetters(["misc"]),
    ...mapGetters("Auth", ["getUserAttribute", "addresses"]),
    ...mapGetters("Cart", ["receive", "builderList", "miscList", "orderPrice"]),

    selectOptions() {
      let options = [...SETUP_OPTIONS];

      if (this.isAuthenticated) {
        options = options.concat(
          this.addresses.map((address) =>
            Object.assign(address, { value: address.id })
          )
        );
      }

      return options;
    },

    isNewAddress() {
      return this.receive.value === "new address";
    },

    isCustomerGet() {
      return this.receive.value === "customer";
    },

    userId() {
      return this.isAuthenticated ? this.getUserAttribute("id") : null;
    },

    addressData() {
      if (this.isNewAddress) {
        const { street, building, flat } = this.form.address.field;

        return {
          street: street.value,
          building: building.value,
          flat: flat.value,
          comment: "",
        };
      } else if (!this.isCustomerGet) {
        return { id: this.receive.id };
      }

      return null;
    },
  },

  mounted() {
    if (this.isAuthenticated) {
      this.form.phone.value = this.getUserAttribute("phone");
      this.setAddress();
    }
  },

  methods: {
    ...mapMutations("Cart", [
      "SET_RECEIVE",
      "SET_RECEIVE_VALUE",
      "PUSH_MISC",
      "SET_MISC_COUNT",
      "SET_ORDER_COUNT",
    ]),
    ...mapActions("Orders", ["createOrder"]),

    setAddress() {
      const { flat, building, street } = this.receive;

      if (flat && building && street) {
        for (const key in this.form.address.field) {
          if (this.receive.hasOwnProperty(key)) {
            this.form.address.field[key].value = this.receive[key];
          }
        }
      } else {
        for (const key in this.form.address.field) {
          this.form.address.field[key].value = "";
        }
      }
    },

    handleSubmit() {
      const { building, flat } = this.form.address.field;

      if (this.isAuthenticated) {
        if (
          !this.$validateFields(
            { building: building.value, flat: flat.value },
            this.validations
          )
        ) {
          this.$showErrors();

          return;
        }

        const order = {};
        order.userId = this.userId;
        order.phone = this.form.phone.value;
        order.address = this.addressData;
        order.pizzas = this.pizzaData(this.builderList);
        order.misc = this.miscData(this.miscList);

        this.createOrder(order);
      }

      this.isPopupOpen = true;
    },

    handleSelect(e) {
      let value = e.target.value;

      if (Number.isInteger(+value)) {
        const selectAddress = this.addresses.find(
          (address) => address.id === +value
        );

        this.SET_RECEIVE(selectAddress);
      } else {
        this.SET_RECEIVE({ value });
      }

      this.setAddress();
    },

    closePopup() {
      this.isPopupOpen = false;

      setTimeout(() => {
        if (this.isAuthenticated) {
          this.$router.push("/orders");
        } else {
          this.$router.push("/");
        }

        this.$store.commit("Builder/CLEAR_STATE");
        this.$store.commit("Cart/CLEAR_STATE");
      }, 500);
    },

    changeCountBuilder(currentBuilder) {
      if (this.builderList.length) {
        const isMatch = this.builderList.some(
          (builder) => builder.id === currentBuilder.id
        );

        if (isMatch) {
          const index = this.builderList.findIndex(
            (builder) => builder.id === currentBuilder.id
          );

          this.builderList[index].countState = currentBuilder.countState;

          const hasState = currentBuilder.hasOwnProperty("countState");
          const isDecrease = this.builderList[index].countState === "decrease";

          this.SET_ORDER_COUNT({ index, hasState, isDecrease });
        }
      }
    },

    changeCountMisc(currentMisc) {
      if (this.miscList.length) {
        const isMatch = this.miscList.some(
          (misc) => misc.id === currentMisc.id
        );

        if (isMatch) {
          const index = this.miscList.findIndex(
            (misc) => misc.id === currentMisc.id
          );

          this.miscList[index].countState = currentMisc.countState;

          const hasState = currentMisc.hasOwnProperty("countState");
          const isDecrease = this.miscList[index].countState === "decrease";

          this.SET_MISC_COUNT({ index, hasState, isDecrease });
        } else {
          this.addMisc(currentMisc);
        }
      } else {
        this.addMisc(currentMisc);
      }
    },

    addMisc(misc) {
      if (!misc.hasOwnProperty("count")) {
        misc.quantity = 1;
      }

      this.PUSH_MISC(misc);
    },

    pizzaData(pizzas) {
      return pizzas.map(
        ({ name, dough, sauce, size, quantity, ingredients }) => {
          return {
            name,
            sauceId: sauce.id,
            doughId: dough.id,
            sizeId: size.id,
            quantity,
            ingredients: this.ingredientData(ingredients),
          };
        }
      );
    },

    ingredientData(ingredients) {
      return ingredients.map(({ ingredientId, quantity }) => {
        return {
          ingredientId,
          quantity,
        };
      });
    },

    miscData(miscs) {
      return miscs.map(({ id, quantity }) => {
        return { miscId: id, quantity };
      });
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
