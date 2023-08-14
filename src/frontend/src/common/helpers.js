import {
  doughValues,
  sizeValues,
  sauceValues,
  ingredientValues,
  resources,
} from "@/common/enums";

import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutations-types";

import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

// import INGREDIENT from "@/common/enums/ingredient";

export const normalizeData = {
  normalizeDough(dough) {
    return {
      ...dough,
      value: doughValues[dough.id],
    };
  },
  normalizeSize(size) {
    return {
      ...size,
      value: sizeValues[size.id],
    };
  },
  normalizeSauce(sauce) {
    return {
      ...sauce,
      value: sauceValues[sauce.id],
    };
  },
  normalizeIngredient(idt) {
    return {
      ...idt,
      value: ingredientValues[idt.id],
    };
  },
};

// TODO: вынести
export const addIngredient = (state, ingredientId) => {
  state.ingredients.push({
    ingredientId,
    quantity: 1,
  });
};

export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
  };
};

export const authenticateUser = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "user",
      value: user,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    },
    { root: true }
  );
};

// export const ingredientVal = (label) => {
//   let value = "";

//   for (const key in INGREDIENT) {
//     if (label === INGREDIENT[key]) {
//       value = key;
//     }
//   }

//   return value;
// };

// export const ingredientsFormatArr = (start = 0, end = 1) => {
//   return pizza.ingredients.slice(start, end).map((el) => {
//     el.quantity = el.id >= 3 ? 3 : el.id;
//     el.value = ingredientVal(el.name);

//     return el;
//   });
// };

export const createPizza = (store) => {
  store.commit(
    SET_ENTITY,
    {
      entity: "dough",
      value: pizza.dough,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      entity: "sizes",
      value: pizza.sizes,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      entity: "sauces",
      value: pizza.sauces,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      entity: "ingredients",
      value: pizza.ingredients,
    },
    { root: true }
  );
};

export const createMisc = (store) => {
  store.commit(
    SET_ENTITY,
    {
      entity: "misc",
      value: misc,
    },
    { root: true }
  );
};

// const builder = {
//   dough: pizza.dough[0],
//   ingredients: ingredientsFormatArr(0, 2),
//   sauce: pizza.sauces[0],
//   size: pizza.sizes[0],
//   name: "testBuilder",
//   price: 766,
// };

// export const createBuilder = (store) => {
//   store.commit(
//     SET_ENTITY,
//     {
//       module: "Builder",
//       entity: "builder",
//       value: builder,
//     },
//     { root: true }
//   );
// };
