/**
 * Register plugin for multi language
 *
 * @version 1.0
 * @author Rikkei.TriHNM
 * @date 2018-09-26
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/locale/index';

Vue.use(VueI18n);

export default ({ app, store }) => {
  let lang = null;

  if (!!localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else {
    // Setting default language if not have value in localstorage
    lang = 'ja';
    localStorage.setItem('lang', 'ja');
  }

  app.i18n = new VueI18n({
    locale: lang,

    //always displays Japan if other translation is not available
    fallbackLocale: 'ja',
    silentTranslationWarn: true,
    messages
  })
}
