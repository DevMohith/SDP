<template>
  <v-container>
    <v-form @submit.prevent="searchBooks">
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="searchField"
            :items="searchFields"
            label="Search by"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Search query"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Search</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchField: null,
      searchQuery: '',
      searchFields: ['ISBN', 'Title', 'Author', 'Publisher']
    };
  },
  methods: {
    async searchBooks() {
      try {
        // Create the correct query parameter for the API endpoint
        const response = await axios.get(`http://localhost:3000/books/search`, {
          params: {
            search: this.searchQuery,
            type: this.searchField
          }
        });
        this.$store.commit('setSearchResults', response.data);
        this.$store.commit('setSearchActive',1);
        this.$router.push('/');
      } catch (error) {
        console.error("Error searching books:", error);
      }
    }
  }
};
</script>

