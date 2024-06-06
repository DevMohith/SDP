<template>
  <v-container>
    <v-form @submit.prevent="uploadPhotos">
      <v-file-input
        v-model="files"
        label="Select Photos"
        multiple
        accept="image/*"
        show-size
        clearable
      ></v-file-input>
      <v-btn :disabled="!files.length" color="primary" type="submit">Upload</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    async uploadPhotos() {
      if (!this.files.length) {
        alert("No files selected.");
        return;
      }

      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("photos", file);
      });

      try {
        const response = await axios.post('https://api.leggocy.com/uploadGallery', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        alert('Upload successful');
        this.$router.push('/');
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Upload failed - please contact support via info@soft-surge.com');
      }
    }
  }
};
</script>

