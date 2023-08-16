import {
  CLEAR_STATE,
  SET_DOUGH,
  SET_INGREDIENTS,
  SET_SAUCE,
  SET_SIZE,
  SET_BUILDER,
  SET_INGREDIENT_QUANTITY,
  SET_BUILDER_NAME,
  SET_BUILDER_PRICE,
  ADD_INGREDIENT,
  INCREMENT_INGREDIENT_QUANTITY,
} from "@/store/mutations-types";
import { addIngredient } from "@/common/helpers";

const setupState = () => ({
  dough: null,
  ingredients: [],
  sauce: null,
  size: null,
  name: "",
  price: 0,
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

  ingredientQuantities(state, getters, rootState) {
    return rootState.ingredients?.reduce((acc, val) => {
      acc[val.id] =
        state.ingredients.find((item) => item.ingredientId === val.id)
          ?.quantity ?? 0;

      return acc;
    }, {});
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
};

// TODO: убрать "builder"
const mutations = {
  [CLEAR_STATE](state) {
    Object.assign(state, setupState());
  },

  [SET_BUILDER](state, payload) {
    state.builder = payload;
  },

  [SET_DOUGH](state, payload) {
    state.builder.dough = payload;
  },

  [SET_INGREDIENTS](state, payload) {
    state.builder.ingredients = [...state.builder.ingredients, payload];
  },

  [ADD_INGREDIENT](state, { ingredientId }) {
    addIngredient(state, ingredientId);
  },

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

  // [SET_INGREDIENT_QUANTITY](state, { index, hasState, isDecrease }) {
  //   if (hasState && isDecrease) {
  //     state.builder.ingredients[index].quantity -= 1;

  //     if (state.builder.ingredients[index].quantity === 0) {
  //       state.builder.ingredients.splice(index, 1);
  //     }
  //   } else {
  //     if (state.builder.ingredients[index].quantity < 3) {
  //       state.builder.ingredients[index].quantity += 1;
  //     }
  //   }
  // },

  [SET_SAUCE](state, payload) {
    state.sauce = payload;
  },

  [SET_SIZE](state, payload) {
    state.size = payload;
  },

  [SET_BUILDER_NAME](state, payload) {
    console.log("SET_BUILDER_NAME");
    state.name = payload;
  },

  [SET_BUILDER_PRICE](state, payload) {
    state.price = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
