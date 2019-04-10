<template lang="html">
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="$store.state.drawer = !$store.state.drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Application</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
