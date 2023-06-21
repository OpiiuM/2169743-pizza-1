import { createLocalVue, mount } from "@vue/test-utils";

import CartAdditionalSelector from "@/modules/cart/components/CartAdditionalSelector";

import misc from "@/static/misc.json";

const localVue = createLocalVue();

describe("CartAdditionalSelector", () => {
  const propsData = {
    additional: misc[0],
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalSelector, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });
});
