import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3000, // default: 3000
    // host: '0.0.0.0'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Llud',
    title: 'Llud',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/vuetify.scss', '~/assets/style/main.scss'],
  router: {
    middleware: ['check-auth']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/auth',
    '@/plugins/deferedStylesheets',
    '@/plugins/alertsHelper',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-env',
      {
        keys: [
          {
            key: 'API_URL',
            default: 'https://cloudy-galoshes-fish.cyclic.app/',
            name: 'API_URL'
          },
        ]
      }
    ],
    [
      '@nuxtjs/dotenv',
      {
        systemvars: true
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://cloudy-galoshes-fish.cyclic.app/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake:true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#2B3E50',
          accent: '#7B6C9D',
          secondary: "#6E7E56",
          smokeGray: "#F5F5F5",
          teaGreen: "#d3e1c8",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
