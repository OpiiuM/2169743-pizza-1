import {
  CLEAR_STATE,
  SET_INGREDIENT_QUANTITY,
  ADD_INGREDIENT,
  INCREMENT_INGREDIENT_QUANTITY,
} from "@/store/mutations-types";
import { builderStore } from "@/common/helpers";

const { addIngredient, ingredientsQuantity, pizzaPrice } = builderStore;

const setupState = () => ({
  dough: null,
  ingredients: [],
  sauce: null,
  size: null,
  name: "",
});

const state = () => setupState();

const getters = {
  builder(state, getters, rootState) {
    return {
      ...state,
      dough: state.dough ?? rootState.dough[0],
      sauce: state.sauce ?? rootState.sauces[0],
      size: state.size ?? rootState.sizes[0],
    };
  },

  // TODO: check
  ingredientQuantities(state, getters, rootState) {
    return ingredientsQuantity(rootState, state);

    // return rootState.ingredients?.reduce((acc, val) => {
    //   acc[val.id] =
    //     state.ingredients.find((item) => item.ingredientId === val.id)
    //       ?.quantity ?? 0;

    //   return acc;
    // }, {});
  },

  ingredientsExtended(state, getters, rootState) {
    const pizzaIngredientsIds = state.ingredients.map((i) => i.ingredientId);

    return rootState.ingredients
      .filter((i) => pizzaIngredientsIds.includes(i.id))
      .map((i, idx) => {
        return {
          ...i,
          quantity: state.ingredients[idx]?.quantity ?? 0,
        };
      });
  },

  price: (state, getters, rootState) => pizzaPrice(rootState, state),
};

const mutations = {
  [CLEAR_STATE](state) {
    Object.assign(state, setupState());
  },

  [ADD_INGREDIENT]: (state, { ingredientId }) => addIngredient(state, ingredientId),

  [SET_INGREDIENT_QUANTITY](state, { ingredientId, count }) {
    const ingredientIdx = state.ingredients.findIndex(
      (item) => item.ingredientId === ingredientId
    );

    if (ingredientIdx === -1 && count > 0) {
      addIngredient(state, ingredientId);
      return;
    } else if (ingredientIdx === -1) {
      return;
    }

    if (count === 0) {
      state.ingredients.splice(ingredientIdx, 1);
      return;
    }

    state.ingredients[ingredientIdx].quantity = count;
  },

  [INCREMENT_INGREDIENT_QUANTITY](state, { ingredientId }) {
    const ingredientIdx = state.ingredients.findIndex(
      (item) => item.ingredientId === ingredientId
    );

    if (ingredientIdx === -1) {
      addIngredient(ingredientId);
      return;
    }

    state.ingredients[ingredientIdx].quantity++;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
