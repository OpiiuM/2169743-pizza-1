import { shallowMount } from "@vue/test-utils";

import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

import { dough, sauces, sizes } from "@/static/pizza.json";
import { ingredientsFormatArr } from "@/common/helpers";

describe("BuilderPizzaView", () => {
  let propsData = {
    dough: dough[0],
    sauce: sauces[0],
    size: sizes[0],
    ingredients: ingredientsFormatArr(0, 2),
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Computed dough & sauce values", () => {
    const localThis = {
      dough: {
        id: 1,
      },
      sauce: {
        id: 1,
      },
    };

    expect(BuilderPizzaView.computed.doughValue.call(localThis)).toBe("small");
    expect(BuilderPizzaView.computed.sauceValue.call(localThis)).toBe("tomato");
    expect(
      BuilderPizzaView.computed.foundationClass.call({
        ...localThis,
        doughValue: "small",
        sauceValue: "tomato",
      })
    ).toBe("pizza--foundation--small-tomato");
  });

  it("Renders ingredients if there are selected ingredients", () => {
    createComponent({ propsData });
    const ingredient = wrapper.find(".pizza__filling");

    expect(ingredient.exists()).toBeTruthy();
  });

  it("Renders specific classes if there are ingredients with quantity equal 2", () => {
    propsData = {
      dough: dough[0],
      sauce: sauces[0],
      size: sizes[0],
      ingredients: ingredientsFormatArr(1, 2),
    };

    createComponent({ propsData });
    const secondIngredient = wrapper.find(".pizza__filling--second");

    expect(secondIngredient.exists())?.toBeTruthy();
  });

  it("Renders specific classes if there are ingredients with quantity equal 3", () => {
    propsData = {
      dough: dough[0],
      sauce: sauces[0],
      size: sizes[0],
      ingredients: ingredientsFormatArr(2, 3),
    };

    createComponent({ propsData });
    const thirdIngredient = wrapper.find(".pizza__filling--third");

    expect(thirdIngredient.exists())?.toBeTruthy();
  });
});
