import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import Index from "@/views/Index";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppSelectorItem from "@/common/components/AppSelectorItem";
import AppInput from "@/common/components/AppInput";

import { generateMockStore } from "@/store/mocks";
import { createPizza, createBuilder } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppRadioButton", AppRadioButton);
localVue.component("AppItemCounter", AppItemCounter);
localVue.component("AppSelectorItem", AppSelectorItem);
localVue.component("AppInput", AppInput);

describe("Index", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    store = generateMockStore();
    createPizza(store);
    createBuilder(store);
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, store, mocks });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check form submit", async () => {
    createComponent({ localVue, store, mocks });
    const spyHandleSubmit = jest.spyOn(wrapper.vm, "handleSubmit");
    await wrapper.find("[data-test='form']").trigger("submit");

    expect(spyHandleSubmit).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
  });
});

// Протестировать
/*
  + @submit.prevent="handleSubmit">
*/

// Данные из тест хранилища
/*
  ...mapGetters(["pizza"]),
  ...mapGetters("Builder", ["builder"]),
  ...mapGetters("Cart", ["builderList"]),
*/
