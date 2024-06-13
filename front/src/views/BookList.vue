<template>
  <v-container>
    <v-btn color="primary" @click="goToAdvancedSearch">Advanced Search</v-btn>
    <v-btn color="secondary" @click="resetSearch">{{ $store.state.isSearch === 1 ? 'Reset Search' : 'Refresh' }}</v-btn>
    <v-btn color="info" @click="goToBorrowedBooks">Borrowed Books</v-btn>
    <v-btn v-if="$store.state.userInfo.usergroup=='admin'" color="success" @click="goToCreateBook">Add Book</v-btn> <!-- New button added -->
    <v-btn v-if="$store.state.userInfo.usergroup=='admin'" color="warning" @click="goToLateBooks">Late Books</v-btn> <!-- New button added -->
    <v-btn color="error" @click="logout">Logout</v-btn> <!-- Keycloak logout button -->
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
        { title: 'Title', value: 'title' },
        { title: 'Author', value: 'author' },
        { title: 'Publisher', value: 'publisherr' },
        { title: 'Publication Year', value: 'publicationyear' },
        { title: 'bibnum', value: 'bibnum'}, 
        { title: 'ISBN', value: 'isbn'}, 
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
        this.$store.commit('setSearchActive',0);
      await this.fetchBooks();
    },
    goToBorrowedBooks() {
      this.$router.push('/borrowed-books');
    },
    viewBook(item) {
      this.$router.push(`/book/${item.bibnum}`);
    },
    goToCreateBook() {
      this.$router.push('/new-book'); // Method to redirect to create book page
    },
     goToLateBooks() {
      this.$router.push('/late-books'); // Method to redirect to late books page
    },
    logout() {
      window.location.href = 'https://sso.sexycoders.org/auth/realms/SDP-SRH-2024/protocol/openid-connect/logout?redirect_uri=http://localhost:8080'
    },
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

