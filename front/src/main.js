import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import keycloak from './keycloak'
import axios from 'axios'
import store from './store'

const app = createApp(App)

keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
  console.log("Keycloak initialized. Authenticated:", authenticated);

  if (authenticated) {
    console.log("authenticated, mounting app...");
    // Set the initial token for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;

    app.use(router);
    app.use(vuetify);
    app.use(store);  // Adding Vuex store to the app
    app.mount('#app');

    // Token refresh interval
    setInterval(() => {
      console.log("updating token...");
      keycloak.updateToken(70).then(() => {
        // Update the Axios default headers with the new token
        console.log("update success, token: " + keycloak.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;
      }).catch((error) => {
        console.error("update failed, logging out...", error);
        keycloak.logout();
      });
    }, 60000);
  } else {
    console.log("not authenticated, redirecting to login...");
    keycloak.login();
  }
}).catch((error) => {
  console.error('Failed to initialize Keycloak', error);
});

