import Vue from 'vue';
import VeeValidate, { Validator }  from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import customeRule from './custome-validator';

const config = {
  // aria: true,
  // classNames: {},
  // classes: false,
  // delay: 0,

  // Change if property conflicts
  // errorBagName: 'errors',
  events: 'change',
  dictionary: {
    ja: {
      messages: ja.messages
    }
  },
  // fieldsBagName: 'fields',

  // The vue-i18n plugin instance
  // i18n: null,

  // The nested key under which the validation messages will be located
  // i18nRootKey: 'validations',
  // inject: true,
  locale: localStorage.getItem('lang'),
  // strict: true,
  // validity: false,
};

Vue.use(VeeValidate, config);
Validator.localize(localStorage.getItem('lang'));

for (let rule in customeRule) {
  Validator.extend(rule, customeRule[rule]);
}
