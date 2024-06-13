<template>
  <v-container>
    <v-btn color="primary" @click="goToAdvancedSearch">Advanced Search</v-btn>
    <v-btn color="secondary" @click="resetSearch">{{ $store.state.isSearch === 1 ? 'Reset Search' : 'Refresh' }}</v-btn>
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
          <td>{{ item.publisher }}</td>
          <td>{{ item.publicationyear }}</td>
          <td>{{ item.bibnum }}</td>
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
        { title: 'Title', value: 'title' },
        { title: 'Author', value: 'author' },
        { title: 'Publisher', value: 'publisherr' },
        { title: 'Publication Year', value: 'publicationyear' },
        { title: 'bibnum', value: 'bibnum'} // Add the bibnum field and mark it as hidden
      ],
      books: []
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/get_books');
        this.books = response.data.data;
        console.log("book list updated");
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    goToAdvancedSearch() {
      this.$router.push('/advanced-search');
    },
    async resetSearch() {
      console.log("called");
      // Implement your reset search logic here
      await this.fetchBooks();
    },
    goToBorrowedBooks() {
      this.$router.push('/borrowed-books');
    },
    viewBook(item) {
      this.$router.push(`/book/${item.bibnum}`);
    }
  },
  created() {
    console.log(this.$store.state.isSearch);
    if(!this.$store.state.isSearch)
      this.fetchBooks();
    else
      this.books=this.$store.state.searchResults.data;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

