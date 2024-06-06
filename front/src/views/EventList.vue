<template>
  <v-container>
    <v-btn color="primary" @click="goToUploadPage">New Event</v-btn>
    <v-btn color="primary" @click="goToGalleryUploadPage">Upload Gallery Images</v-btn>
    <v-btn color="primary" @click="goToEventUploadPage">Upload Event Images</v-btn>
    <v-data-table
      :headers="headers"
      :items="events"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr @click="editEvent(item)">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.bookingLink }}</td>
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
      events: [],
      headers: [
        { title: 'ID', value: '_id' },
        { title: 'Title', value: 'title' },
        { title: 'Description', value: 'description' },
        { title: 'Date', value: 'date' },
        { title: 'Location', value: 'location' },
        { title: 'Booking Link', value: 'bookingLink', sortable: false }
      ]
    };
  },
  methods: {
    fetchEvents() {
      axios.get('https://api.leggocy.com/events_db')
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the events:', error);
        });
    },
    goToUploadPage() {
      this.$router.push('event/info');
    },
    goToGalleryUploadPage() {
      this.$router.push('/gallery/upload');
    },
    goToEventUploadPage() {
      this.$router.push('/event/images');
    },
    editEvent(item) {
      console.log(item); // This will now definitely log the correct event object
      this.$router.push(`/edit/${item._id}`);
    }
  },
  created() {
    this.fetchEvents();
  }
}
</script>

