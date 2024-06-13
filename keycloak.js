const session = require('express-session');
const Keycloak = require('keycloak-connect');

const keycloakConfig = {
  clientId: 'api', 
  bearerOnly: true,
  serverUrl: 'https://sso.sexycoders.org/auth',
  realm: 'SDP-SRH-2024',  
  credentials: {
    secret: 'Auk7F58DblIBrqL8ZWcpU5RTwmkbEJK0'
  }
};

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = { keycloak, memoryStore };

