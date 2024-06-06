import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
  url: 'https://sso.sexycoders.org/auth',
  realm: 'SDP-SRH-2024',
  clientId: 'app'
};

const keycloak = new Keycloak(keycloakConfig);  // Ensure 'new' keyword is used

export default keycloak;

