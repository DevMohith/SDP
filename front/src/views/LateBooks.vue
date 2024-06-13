<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="lateBooks"
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
          <td>{{ item.dueDate }}</td>
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
        { text: 'Publisher', value: 'publisher' },
        { text: 'Publication Year', value: 'publicationyear' },
        { text: 'Bibnum', value: 'bibnum' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Due Date', value: 'dueDate' }
      ],
      lateBooks: []
    };
  },
  methods: {
    async fetchLateBooks() {
      try {
        const response = await axios.get('http://localhost:3000/adminControl/getOverDue');
        this.lateBooks = response.data.data;
        console.log("Late books list updated");
      } catch (error) {
        console.error('Error fetching late books:', error);
      }
    },
    viewBook(item) {
      this.$router.push(`/book/${item.bibnum}`);
    },
  },
  created() {
    this.fetchLateBooks();
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

