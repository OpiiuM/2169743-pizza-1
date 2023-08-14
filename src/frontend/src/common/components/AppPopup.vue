<template>
  <div class="popup-bg">
    <div class="popup">
      <a
        href="#"
        class="close"
        @click.prevent="handleClick"
        data-test="buttonClose"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          href="#"
          class="button"
          data-test="buttonComplete"
          @click.prevent="handleClick"
        >
          Отлично, я жду!
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",

  methods: {
    handleClick() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  &-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
