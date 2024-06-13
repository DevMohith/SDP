<template>
  <v-container>
    <v-form ref="form">
      <v-text-field v-model="book.title" label="Title"></v-text-field>
      <v-text-field v-model="book.author" label="Author"></v-text-field>
      <v-text-field v-model="book.publisher" label="Publisher"></v-text-field>
      <v-text-field v-model="book.publicationyear" label="Published Date"></v-text-field>
      <v-text-field v-model="book.isbn" label="ISBN"></v-text-field>
      <v-text-field v-model="book.bibnum" label="Bibnum" :readonly="true"></v-text-field>
      <v-textarea v-model="book.subjects" label="Description"></v-textarea>
      <v-btn color="primary" @click="createBook">Create Book</v-btn>
      <v-btn color="secondary" @click="cancel">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      book: {
        bibnum: this.generateBibnum(),
        title: '',
        author: '',
        isbn: '',
        publicationyear: '',
        publisher: '',
        subjects: '',
        floatingitem: 'NAN',
        reportdate: new Date().toISOString(),
      }
    };
  },
  methods: {
    generateBibnum() {
      // Generate a random 10-digit number
      return Math.floor(Math.random() * 2147483647);
    },
    createBook() {
      axios.post('http://localhost:3000/adminControl/addBook', this.book)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('There was an error creating the book:', error);
        });
    },
    cancel() {
      this.$router.push('/');
    }
  }
}
</script>

