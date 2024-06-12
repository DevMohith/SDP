<template>
  <v-container>
    <v-form ref="form">
      <v-text-field v-model="book.title" label="Title" :readonly="!$store.state.userInfo.usergroup=='admin'"></v-text-field>
      <v-text-field v-model="book.author" label="Author" :readonly="!$store.state.userInfo.usergroup=='admin'"></v-text-field>
      <v-text-field v-model="book.publisher" label="Publisher" :readonly="!$store.state.userInfo.usergroup=='admin'"></v-text-field>
      <v-text-field v-model="book.publicationyear" label="Published Date" :readonly="!$store.state.userInfo.usergroup=='admin'"></v-text-field>
      <v-textarea v-model="book.subjects" label="Description" :readonly="!$store.state.userInfo.usergroup=='admin'"></v-textarea>
      <v-btn color="primary" @click="checkoutBook">Checkout Book</v-btn>
      <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      <v-btn v-if="$store.state.userInfo.usergroup=='admin'" color="success" @click="updateBook">Save</v-btn>
      <v-btn v-if="$store.state.userInfo.usergroup=='admin'" color="error" @click="deleteBook">Delete</v-btn>
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
    fetchBook() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:3000/get_books/${id}`)
        .then(response => {
          this.book = response.data.data[0];
          console.log(this.book);
        })
        .catch(error => {
          console.error('There was an error fetching the book:', error);
        });
    },
    updateBook() {
      const id = this.$route.params.id;
      console.log(this.book);
      axios.post(`http://localhost:3000/adminControl/updateBook/${id}`, this.book)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('There was an error updating the book:', error);
        });
    },
    deleteBook() {
  const { bibnum } = this.book;
  axios.delete(`http://localhost:3000/adminControl/removeBook/${bibnum}`)
    .then(() => {
      this.$router.push('/');
    })
    .catch(error => {
      console.error('There was an error deleting the book:', error);
    });
},

    checkoutBook() {
      axios.post('http://localhost:3000/borrowBook', {
        bibnum: this.book.bibnum,
        user_id: this.$store.state.userInfo.sub
      })
      .then(() => {
        this.$router.push('/');
      })
      .catch(error => {
        console.error('There was an error checking out the book:', error);
      });
    },
    cancel() {
      this.$router.push('/');
    }
  },
  created() {
    this.fetchBook();
  }
}
</script>

