const appSelectorItem = {
  field: {
    name: "pizza_name",
    placeholder: "Введите название пиццы",
    required: true,
    autocomplete: "off",
    tag: "label",
    label: "Название пиццы",
    hiddenLabel: true,
  },
};

const profileAddressEdit = {
  field: {
    name: {
      label: "Название адреса*",
      name: "addr-name",
      placeholder: "Введите название адреса",
      required: true,
      value: "",
    },
    street: {
      label: "Улица*",
      name: "addr-street",
      placeholder: "Введите название улицы",
      required: true,
      value: "",
    },
    building: {
      label: "Дом*",
      name: "addr-house",
      placeholder: "Введите название дома",
      required: true,
      value: "",
    },
    flat: {
      label: "Квартира",
      name: "addr-apartment",
      placeholder: "Введите № квартиры",
      required: true,
      value: "",
    },
    comment: {
      label: "Комментарий",
      name: "addr-comment",
      placeholder: "Введите комментарий",
      required: true,
      value: "",
    },
  },
};

const pageCart = {
  phone: {
    label: "Контактный телефон:",
    type: "text",
    name: "tel",
    placeholder: "+7 999-999-99-99",
    value: "",
  },
  address: {
    street: {
      label: "Улица*",
      type: "text",
      name: "street",
      value: "",
    },
    building: {
      class: "small",
      label: "Дом*",
      type: "text",
      name: "building",
      value: "",
    },
    flat: {
      class: "small",
      label: "Квартира",
      type: "text",
      name: "flat",
      value: "",
    },
  },
};

const pageLogin = {
  email: {
    tag: "label",
    label: "E-mail",
    type: "email",
    name: "email",
    placeholder: "example@mail.ru",
  },
  password: {
    tag: "label",
    label: "Пароль",
    type: "password",
    name: "pass",
    placeholder: "***********",
  },
};

export default {
  appSelectorItem,
  profileAddressEdit,
  pageCart,
  pageLogin,
};
