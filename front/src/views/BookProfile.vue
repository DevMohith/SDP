<template>
  <v-container>
    <v-form ref="form">
      <v-text-field v-model="book.title" label="Title" readonly></v-text-field>
      <v-text-field v-model="book.creator" label="Author" readonly></v-text-field>
      <v-text-field v-model="book.usageclass" label="Usage Class" readonly></v-text-field>
      <v-text-field v-model="book.materialtype" label="Material Type" readonly></v-text-field>
      <v-text-field v-model="book.subjects" label="Subjects" readonly></v-text-field>
      <v-text-field v-model="book.publisher" label="Publisher" readonly></v-text-field>
      <v-text-field v-model="book.publicationyear" label="Publication Year" readonly></v-text-field>
      <v-text-field v-model="book.checkouttime" label="Checkout Time" readonly></v-text-field>
      <v-text-field v-model="book.checkintime" label="Checkin Time" readonly></v-text-field>
      <v-btn color="primary" @click="returnBook">Return Book</v-btn>
      <v-btn color="secondary" @click="extendBook">Extend Borrowing</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    async returnBook() {
      try {
        const keycloak = this.$keycloak;
        const response = await axios.post('http://localhost:3000/user/returnBook', { book_id: this.book.bibnum }, {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        console.log('Book returned successfully:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Error returning book:', error);
      }
    },
    async extendBook() {
      try {
        const keycloak = this.$keycloak;
        const response = await axios.post('http://localhost:3000/user/extendBook', { book_id: this.book.bibnum }, {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        console.log('Book extended successfully:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Error extending book:', error);
      }
    },
    cancel() {
      this.$router.push('/');
    }
  },
  created() {
    const bookQuery = this.$route.query.book;
    if (bookQuery) {
      this.book = JSON.parse(decodeURIComponent(bookQuery));
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

