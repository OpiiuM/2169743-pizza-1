<template>
  <div id="app" class="app">
    <AppNotifications />

    <component :is="layout" class="app__layout">
      <transition
        name="view"
        mode="out-in"
        enter-active-class="animate__animated animate__slideInRight"
        leave-to-class="animate__animated animate__slideOutLeft"
      >
        <router-view />
      </transition>
    </component>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";

export default {
  name: "App",

  computed: {
    layout() {
      const layout = (this.$route.meta.layout ?? "Default") + "Layout";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },

  created() {
    window.onerror = function (msg, url, line, col, err) {
      console.error(err);
    };

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.app {
  position: relative;

  width: 100vw;
  min-height: 100vh;

  &__layout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
  }
}

.animate__animated {
  transition-duration: 0.25s !important;
  animation-duration: 0.25s !important;
}
</style>
