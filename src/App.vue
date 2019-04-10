<template>
  <v-app id="inspire" dark>

    <Navigation></Navigation>
    <Toolbar></Toolbar>

    <v-content>
      <v-container fluid fill-height d-block>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    Navigation,
    Toolbar,
  }

}
</script>
<style>
* {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
