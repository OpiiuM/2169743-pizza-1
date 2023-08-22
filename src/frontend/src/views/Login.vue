<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="sign-form__input">
        <AppInput
          ref="email"
          v-model="email"
          :tag="pageLogin.email.tag"
          :label="pageLogin.email.label"
          :type="pageLogin.email.type"
          :name="pageLogin.email.name"
          :placeholder="pageLogin.email.placeholder"
          data-test="email"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          ref="password"
          v-model="password"
          :tag="pageLogin.password.tag"
          :label="pageLogin.password.label"
          :type="pageLogin.password.type"
          :name="pageLogin.password.name"
          :placeholder="pageLogin.password.placeholder"
          data-test="password"
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import validator from "@/common/mixins/validator";

import { inputConfig } from "@/common/enums";

const { pageLogin } = inputConfig;

export default {
  name: "Login",

  mixins: [validator],

  data() {
    return {
      pageLogin,
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  mounted() {
    this.$refs.email?.$refs.input.focus();
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async handleSubmit() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        this.$showErrors();

        return;
      }

      await this.login({
        email: this.email,
        password: this.password,
      });

      await this.$router.push("/");
    },
  },
};
</script>
