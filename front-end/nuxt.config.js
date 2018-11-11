const pkg = require('./package')
const webpack = require('webpack')
module.exports = {
  mode: 'spa',
  router: {
    middleware: ['valid_client_id']
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {"http-equiv": 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      // { rel: 'stylesheet', href: "https://use.fontawesome.com/releases/v5.1.0/css/all.css" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070',height :'5px'},

  /*
  ** Global CSS
  */
  css: [
    '@assets/scss/vendor.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/nuxt-client-init.js', ssr: false},
    {src: '~/plugins/beforeEnter.js', ssr: false},
    // { src: '~/plugins/bootstrap.js', ssr: false },
    {src: '~/plugins/i18n.js', ssr: false},
    {src: '~/plugins/localStorage.js', ssr: false},
    // {src: '~/plugins/api.js', ssr: false},
    {src: '~/plugins/vee-validate.js', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [],
  env: {
    baseUrl: 'https://7golgodswe.execute-api.ap-northeast-1.amazonaws.com/dev',
    clientUrl: 'http://localhost:3000',
    baseS3Url: "https://s3-ap-northeast-1.amazonaws.com/ticket-data-dev"
  }

  ,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    vendor: [
      'jquery',
      'babel-es6-polyfill',
      'bootstrap',
      '@fortawesome/fontawesome',
      '@fortawesome/fontawesome-free-solid',
      '@fortawesome/fontawesome-free-brands'
    ]

  }
}
