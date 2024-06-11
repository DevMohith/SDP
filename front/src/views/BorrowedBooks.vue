<template>
  <v-container>
    <v-btn color="primary" @click="fetchBorrowedBooks">Refresh List</v-btn>
    <v-data-table
      :headers="headers"
      :items="borrowedBooks"
      item-key="isbn"
      class="elevation-1"
      @click:row="viewBookDetails"
    >
      <template v-slot:item="{ item }">
        <tr @click="viewBookDetails(item)">
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
//import { mapGetters } from 'vuex';

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
//  computed: {
//    ...mapGetters(['userInfo'])
//  },
  methods: {
     async fetchBorrowedBooks() {
//      console.log(this.$store.state.userInfo);
      const userId = this.$store.state.userInfo.sub;
      const keycloak = this.$keycloak;

      axios.post('http://localhost:3000/adminControl/getBorrowedBooks', { userId }, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      })
      .then(response => {
        this.borrowedBooks = response.data.borrowedBooks;
        console.log("Borrowed Books are:", this.borrowedBooks);
      })
      .catch(error => {
        console.error('Error fetching borrowed books:', error);
      });
    },
    viewBookDetails(book) {
      console.log("Viewing book details:", book);
      const bookQuery = encodeURIComponent(JSON.stringify(book));
      this.$router.push({ path: `/book-profile/${book._id}`, query: { book: bookQuery } });
    }
  },
  mounted() {
    this.fetchBorrowedBooks();
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

