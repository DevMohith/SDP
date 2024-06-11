<template>
  <v-app-bar app>
    <v-toolbar-title>Book Library</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text :to="{ name: 'AdvancedSearch' }">Advanced Search</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavigationComp'
};
</script>
