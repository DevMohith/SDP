<template>
  <v-container>
    <v-form ref="form">
      <v-text-field v-model="book.title" label="Title" :readonly="!$store.isAdmin"></v-text-field>
      <v-text-field v-model="book.author" label="Author" :readonly="!$store.isAdmin"></v-text-field>
      <v-text-field v-model="book.genre" label="Genre" :readonly="!$store.isAdmin"></v-text-field>
      <v-text-field v-model="book.publishedDate" label="Published Date" :readonly="!$store.isAdmin"></v-text-field>
      <v-textarea v-model="book.description" label="Description" :readonly="!$store.isAdmin"></v-textarea>
      <v-btn color="primary" @click="checkoutBook">Checkout Book</v-btn>
      <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      <v-btn v-if="$store.isAdmin" color="success" @click="saveBook">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    fetchBook() {
      const id = this.$route.params.id;
      const book = this.$store.dispatch('fetchBook', id);
      if (book) {
        this.book = book;
      } else {
        console.error('Book not found');
      }
    },
    saveBook() {
      this.$store.dispatch('saveBook', this.book);
      this.$router.push('/');
    },
    checkoutBook() {
      // Replace this with an actual API call
      // axios.post(`https://api.library.com/books/${this.book._id}/checkout`)
      //   .then(() => {
      //     this.$router.push('/');
      //   })
      //   .catch(error => {
      //     console.error('There was an error checking out the book:', error);
      //   });
      this.$router.push('/');
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

