require('dotenv').config()

process.env.DEBUG = 'nuxt:*'

export default {
  /*
   ** Headers of the page
   */
  debug: true,
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  head: {
    title: 'Spell Glossar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      { rel: 'stylesheet', href: '/vuesax.css' },
      { rel: 'stylesheet', href: '/vuexy.css' },
      { rel: 'stylesheet', href: '/metro-icons.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#df1020' },
  /*
   ** Global CSS
   */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/parchment.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/helperFunctions.js',
    '~/plugins/axios',
    '~/plugins/vuesax.js',
    '~/plugins/globalComponents.js',
    '~/plugins/filters.js',
    { src: '~/plugins/window.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/autosuggest.js', ssr: false },
    { src: '~/plugins/fontawesome.js', ssr: false },
    { src: '~/plugins/vue2-editor.js', mode: 'client' },
    { src: '~/plugins/expandableImage.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/moment', 'faker-nuxt'],

  moment: {
    defaultLocale: 'de',
    locales: ['de']
  },
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/, /plyr*/, /icon*/, /label*/]
  },
  faker: {
    locale: 'de'
  },
  pwa: {
    icon: {
      disabled: true
    }
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      '@dansmaculotte/nuxt-security',
      {
        additionalHeaders: true
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  // auth: {
  //   redirect: {
  //     login: '/login',
  //     logout: '/login',
  //     callback: '/login',
  //     home: '/'
  //   },
  //   watchLoggedIn: true,
  //   rewriteRedirects: true,
  //   plugins: [],
  //   strategies: {
  //     // TODO: Need new Auth
  //   }
  // },
  router: {
    // middleware: ['auth']
  }
}
