<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="books"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr @click="viewBook(item)">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.publishedDate }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  computed: {
    books() {
      return this.$store.state.books;
    }
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Title', value: 'title' },
        { text: 'Author', value: 'author' },
        { text: 'Genre', value: 'genre' },
        { text: 'Published Date', value: 'publishedDate' }
      ]
    };
  },
  methods: {
    viewBook(item) {
      this.$router.push(`/book/${item._id}`);
    }
  },
  created() {
    this.$store.dispatch('fetchBooks');
  }
}
</script>

