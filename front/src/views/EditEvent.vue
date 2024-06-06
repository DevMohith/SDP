<template>
  <v-container>
    <v-form>
      <v-text-field label="Title" v-model="event.title" required></v-text-field>
      <v-textarea label="Description" v-model="event.description" required></v-textarea>
      <v-text-field label="Date and Time" v-model="event.date" required></v-text-field>
      <v-text-field label="Location" v-model="event.location" required></v-text-field>
      <v-text-field label="Booking Link" v-model="event.bookingLink" required></v-text-field>
      <v-text-field label="Image Name" v-model="event.image" required></v-text-field> <!-- New Image Name Field -->
      <v-text-field label="Status" v-model="event.status" disabled></v-text-field>
      <v-btn color="primary" @click="updateEvent">Update</v-btn>
      <v-btn color="red" @click="confirmDelete">Delete</v-btn>
      <v-btn color="error" @click="cancel">Cancel</v-btn>
      <v-btn v-if="event.status !== 'past'" color="blue" @click="markPast">Mark Past</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

export default {
  data() {
    return {
      event: {
        title: '',
        description: '',
        date: '',
        location: '',
        bookingLink: '',
        image: '', // Add image name field to the data model
        status: ''
      }
    };
  },
  methods: {
    fetchEvent() {
      const id = this.$route.params.id;  // Get the ID from URL parameter
      axios.get(`https://api.leggocy.com/events_db/${id}`)
        .then(response => {
          this.event = response.data;  // Assuming the API returns the event directly
        })
        .catch(error => {
          console.error('There was an error fetching the event details:', error);
        });
    },
    updateEvent() {
      const id = this.$route.params.id;
      axios.put(`https://api.leggocy.com/events_db/${id}`, this.event)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('There was an error updating the event:', error);
        });
    },
    confirmDelete() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent();
        }
      });
    },
    deleteEvent() {
      const id = this.$route.params.id;
      axios.delete(`https://api.leggocy.com/events_db/${id}`)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('There was an error deleting the event:', error);
        });
    },
    cancel() {
      this.$router.push('/');
    },
    markPast() {  // New method
      const id = this.$route.params.id;
      axios.patch(`https://api.leggocy.com/events_db/${id}/mark-past`)
        .then(() => {
          this.fetchEvent(); // Refresh the event data after marking it as past
        })
        .catch(error => {
          console.error('There was an error marking the event as past:', error);
        });
    }
  },
  created() {
    this.fetchEvent();  // Fetch the event when component is created
  }
}
</script>

