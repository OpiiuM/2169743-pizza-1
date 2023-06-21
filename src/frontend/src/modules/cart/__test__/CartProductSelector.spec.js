import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import CartProductSelector from "@/modules/cart/components/CartProductSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartProductSelector", () => {
  const propsData = {
    order: {
      dough: {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
      },
      ingredients: [
        {
          name: "Ветчина",
          value: "ham",
          countState: "increase",
          ingredientId: 7,
          price: 42,
          quantity: 2,
        },
        {
          name: "Томаты",
          value: "tomatoes",
          countState: "increase",
          ingredientId: 3,
          price: 35,
          quantity: 1,
        },
      ],
      sauce: {
        id: 1,
        name: "Томатный",
        price: 50,
      },
      size: {
        id: 2,
        name: "32 см",
        multiplier: 2,
      },
      name: "test",
      price: 938,
      id: 1,
      quantity: 1,
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartProductSelector, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Raises the click event on click change builder button", async () => {
    createComponent({ localVue, propsData });
    const buttonChange = wrapper.find("[data-test='changeBuilder']");
    await buttonChange.trigger("click");
    expect(buttonChange.emitted().click).toBeTruthy();
  });
});
