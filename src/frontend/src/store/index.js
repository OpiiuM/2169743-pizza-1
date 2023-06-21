import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";

import { uniqueId } from "lodash";

import {
  SET_ENTITY,
  ADD_ENTITY,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutations-types";

import { MESSAGE_LIVE_TIME } from "@/common/constants";
import DOUGH from "@/common/enums/dough";
import SIDEBAR_MENU from "@/common/enums/sidebarMenu";

Vue.use(Vuex);

export const state = () => ({
  notifications: [],
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
  misc: [],
  sidebarMenu: SIDEBAR_MENU,
});

export const getters = {
  pizza(state) {
    return {
      doughes: state.dough,
      ingredients: state.ingredients,
      sauces: state.sauces,
      sizes: state.sizes,
    };
  },

  misc(state) {
    return state.misc;
  },

  getItemEntity: (state) => (entity, id) => {
    if (state.hasOwnProperty(entity)) {
      return state[entity].find((element) => element.id === id);
    }
  },

  getAttrItemEntity: (state, getters) => (entity, id, attr) => {
    const element = getters.getItemEntity(entity, id);

    return element && element[attr];
  },

  doughText: (state, getters) => (sizeId, doughId) => {
    const sizeLabel = getters.getAttrItemEntity("sizes", sizeId, "name");
    const doughLabel = doughId === DOUGH.small ? "тонком" : "толстом";

    return `${sizeLabel}, на ${doughLabel} тексте`;
  },

  sauceText: (state, getters) => (id) => {
    const sauce = getters.getAttrItemEntity("sauces", id, "name");

    return `Соус: ${sauce.toLowerCase()}`;
  },

  ingredientsText: (state, getters) => (ingredients) => {
    const tmpIngredients = [];
    // TODO: убрать "name", "price", "value"
    // TODO: разные ключи (id | ingredientId) -> поправить
    ingredients.forEach(({ ingredientId }) => {
      const label = getters.getAttrItemEntity(
        "ingredients",
        ingredientId,
        "name"
      );
      tmpIngredients.push(label.toLowerCase());
    });

    return `Начинка: ${tmpIngredients.join(", ")}`;
  },
};

export const actions = {
  async init({ dispatch }) {
    dispatch("fetchDough");
    dispatch("fetchSizes");
    dispatch("fetchSauces");
    dispatch("fetchIngredients");
    dispatch("fetchMisc");
  },

  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };

    commit(ADD_NOTIFICATION, uniqueNotification);

    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },

  async fetchDough({ commit }) {
    try {
      const dough = await this.$api.dough.query();
      commit(SET_ENTITY, { module: null, entity: "dough", value: dough });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSizes({ commit }) {
    try {
      const sizes = await this.$api.sizes.query();
      commit(SET_ENTITY, { module: null, entity: "sizes", value: sizes });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSauces({ commit }) {
    try {
      const sauces = await this.$api.sauces.query();
      commit(SET_ENTITY, { module: null, entity: "sauces", value: sauces });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchIngredients({ commit }) {
    try {
      const ingredients = await this.$api.ingredients.query();
      commit(SET_ENTITY, {
        module: null,
        entity: "ingredients",
        value: ingredients,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchMisc({ commit }) {
    try {
      const misc = await this.$api.misc.query();
      commit(SET_ENTITY, { module: null, entity: "misc", value: misc });
    } catch (error) {
      console.error(error);
    }
  },
};

export const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = value;
    } else {
      state[entity] = value;
    }
  },

  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },

  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});
