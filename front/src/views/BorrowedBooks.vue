<template>
  <v-container>
    <v-btn color="primary" @click="fetchBorrowedBooks">Refresh List</v-btn>
    <v-data-table
      :headers="headers"
      :items="borrowedBooks"
      item-key="isbn"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.isbn }}</td>
          <td>{{ item.borrowedDate }}</td>
          <td>{{ item.returnDate }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Borrowed Date', value: 'borrowedDate' },
        { text: 'Return Date', value: 'returnDate' }
      ],
      borrowedBooks: []
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async fetchBorrowedBooks() {
      try {
        const userId = this.userInfo.sub;  // Access the user ID from Vuex store
        const keycloak = this.$keycloak;

        // Fetch borrowed books using the user ID
        const response = await axios.get('/adminControl/getBorrowedBooks', {
          params: { userid: userId },
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });

        this.borrowedBooks = response.data.data;
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    }
  },
  created() {
    this.fetchBorrowedBooks();
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

