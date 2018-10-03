import Vue from 'vue';
import VeeValidate from 'vee-validate';
// import { Validator } from 'vee-validate';

const dictionary = {
  ja: {
    messages:{
      email: () => 'Khongdundinhdangeamil'
    }
  },
};

// Override and merge the dictionaries
// VeeValidate.Validator.updateDictionary(dictionary);

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'ja',
  strict: true,
  validity: false,
};

console.log(localStorage.getItem('lang'));

Vue.use(VeeValidate, config);
