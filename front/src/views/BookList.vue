<template>
  <v-container>
    <v-btn color="primary" @click="goToAdvancedSearch">Advanced Search</v-btn>
    <v-btn color="secondary" @click="resetSearch">Reset Search</v-btn>
    <v-btn color="info" @click="goToBorrowedBooks">Borrowed Books</v-btn>
    <v-data-table
      :headers="headers"
      :items="books"
      item-key="isbn"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr @click="viewBook(item)">
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.isbn }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'ISBN', value: 'isbn' }
      ],
      books: []
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/get_books');
        this.books = response.data.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    goToAdvancedSearch() {
      this.$router.push('/advanced-search');
    },
    resetSearch() {
      // Implement your reset search logic here
    },
    goToBorrowedBooks() {
      this.$router.push('/borrowed-books');
    },
    viewBook(item) {
      this.$router.push(`/book/${item.isbn}`);
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

