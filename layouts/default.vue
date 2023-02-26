<template>
  <v-app>
    <v-main>
        <PrettyAlert/>
        <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import PrettyAlert from "~/components/custom/PrettyAlert";
export default {
  components:{
    PrettyAlert
  }, 
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
