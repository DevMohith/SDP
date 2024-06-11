<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  async created() {
    const keycloak = this.$keycloak;

    try {
      // Make a request to the userinfo endpoint
      const userInfoResponse = await axios.get('https://sso.sexycoders.org/auth/realms/SDP-SRH-2024/protocol/openid-connect/userinfo', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });

      // Store user info in Vuex
      this.$store.commit('setUserInfo', userInfoResponse.data);
      console.log("User is:",this.$store.state.userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
};
</script>

<style>
/* Add any global styles here */
</style>

