import * as Yup from "yup";

const setYupLocale = () => {
  Yup.setLocale({
    mixed: {
      required: () => "required",
      notOneOf: () => "notOneOf",
    },
    string: {
      url: () => "url",
    },
  });
};

export default setYupLocale;
