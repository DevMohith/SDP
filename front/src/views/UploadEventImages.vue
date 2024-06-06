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
import Swal from 'sweetalert2';

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
        const response = await axios.post('https://api.leggocy.com/uploadEvent', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);


// Create an object with the association between original name and stored name
const fileAssociations = response.data.files.reduce((acc, file) => {
  acc[file.originalname] = file.filename;
  return acc;
}, {});

// Create a human-readable HTML string from the file associations
let fileNames = 'Upload successful - File Names are:<br>';
for (const stored of Object.values(fileAssociations)) {
  // only show stored name as per client request
  fileNames += `${stored}<br>`;        
}
console.log(fileNames);



        const showFileNamesAlert = () => {
          Swal.fire({
            title: 'Upload Successful',
            html: `${fileNames}<br>Please copy and store these file names. They will not be shown again.`,
            icon: 'info',
            confirmButtonText: 'Copy & Continue',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              showConfirmationAlert();
            }
          });
        };

        const showConfirmationAlert = () => {
          Swal.fire({
            title: 'Confirmation',
            text: 'Did you copy and store the file names? They will not be shown again.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I copied them',
            cancelButtonText: 'No, show them again',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((confirmationResult) => {
            if (confirmationResult.isConfirmed) {
              Swal.fire('Great!', 'You can proceed now.', 'success').then(() => {
                this.$router.push('/');
              });
            } else {
              showFileNamesAlert();
            }
          });
        };

        showFileNamesAlert();
      } catch (error) {
        console.error('Error uploading files:', error);
        Swal.fire('Upload Failed', 'Please contact support via info@soft-surge.com', 'error');
      }
    }
  }
};
</script>

<style>
/* Your style code here */
</style>

