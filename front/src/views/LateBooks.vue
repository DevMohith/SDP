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
          <td>{{ item.bibnum }}</td>
          <td>{{new Date(item.checkintime).toLocaleString()}}</td>
          <td>{{ item.user_id }}</td>
          <td>{{ item.title }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn @click="sendReminders" color="primary">Send Reminders</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        { title: 'Bibnum', value: 'bibnum' },
        { title: 'Due Date', value: 'dueDate' },
        { title: 'User', value: 'user_id' },
        { title: 'Title', value: 'title' },
      ],
      lateBooks: []
    };
  },
  methods: {
    async fetchLateBooks() {
      try {
        const response = await axios.get('http://localhost:3000/adminControl/getOverDue');
        this.lateBooks = response.data.borrowedBooks;
        console.log("Late books list updated");
      } catch (error) {
        console.error('Error fetching late books:', error);
      }
    },
    viewBook(item) {
      this.$router.push(`/book/${item.bibnum}`);
    },
       async sendReminders() {
      const reminders = this.lateBooks.map(book => ({
        user_id: book.user_id,
        bibnum: book.bibnum,
        title: book.title,
        author: book.author
      }));

      try {
        await axios.post('http://localhost:3000/send-reminders', {
          reminders
        });
        console.log('Reminder emails sent successfully');
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
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

