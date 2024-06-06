<template>
  <v-container>
    <v-form>
      <v-text-field label="Title" v-model="event.title" required></v-text-field>
      <v-textarea label="Description" v-model="event.description" required></v-textarea>

      <!--[> Direct Date and Time Picker <]-->
      <!--<v-row>-->
        <!--<v-col cols="12" sm="6">-->
          <!--<v-date-picker v-model="event.date" label="Select Date" :min="minDate" @input="updateDateTime"></v-date-picker>-->
        <!--</v-col>-->
        <!--<v-col cols="12" sm="6">-->
          <!--<v-time-picker v-model="event.time" label="Select Time" @input="updateDateTime"></v-time-picker>-->
        <!--</v-col>-->
      <!--</v-row>-->

      <v-text-field label="Event Date" v-model="event.date" required></v-text-field>
      <v-text-field label="Location" v-model="event.location" required></v-text-field>
      <v-text-field label="Image Name" v-model="event.image" required></v-text-field>
      <v-text-field label="Booking Link" v-model="event.bookingLink" required></v-text-field>
      <v-btn color="primary" @click="uploadEvent">Submit</v-btn>
      <v-btn color="error" @click="cancel">Cancel</v-btn>
    </v-form>
  </v-container>
</template>


<script>
import axios from 'axios';

// Reset default post Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  data() {
    return {
      event: {
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        bookingLink: '',
        image: ''
      },
      minDate: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    updateDateTime() {
      this.event.date = `${this.event.date}T${this.event.time}`;
    },
    async uploadEvent() {
      const formData = {
        title: this.event.title,
        description: this.event.description,
        date: this.event.date,
        location: this.event.location,
        image: this.event.image,
        bookingLink: this.event.bookingLink
      };

      try {
        const response = await axios.post('https://api.leggocy.com/events', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.$router.push('/');
        console.log(response);
      } catch (error) {
        console.error('There was an error uploading the event:', error);
      }
    },
    cancel() {
      this.$router.push('/');
    }
  }
}
</script>


