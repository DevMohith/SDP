const axios = require('axios');

// Keycloak server details
const keycloakServer = 'https://sso.sexycoders.org';
const realm = 'SDP-SRH-2024';
const clientId ="api";
const clientSecret = 'Auk7F58DblIBrqL8ZWcpU5RTwmkbEJK0';
const userId = '9bd8c2b4-8fb8-44b1-b37b-d8d45124b6f4';



// Function to get access token
async function getAccessToken() {
  const tokenUrl = `${keycloakServer}/auth/realms/${realm}/protocol/openid-connect/token`;
  const tokenData = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  console.log(`Requesting access token from ${tokenUrl} with client_id ${clientId}`);

  try {
    const response = await axios.post(tokenUrl, tokenData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Access token response:', response.data);
    return response.data.access_token;
  } catch (error) {
    if (error.response) {
      console.error('Error getting access token:', error.response.data);
    } else {
      console.error('Error getting access token:', error.message);
    }
    throw error;
  }
}

// Function to search for user by ID
async function searchUserById(accessToken) {
  const userUrl = `${keycloakServer}/auth/admin/realms/${realm}/users/${userId}`;

  console.log(`Searching for user by ID at ${userUrl} with access token ${accessToken}`);

  try {
    const response = await axios.get(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('User info response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error searching for user:', error.response.data);
    } else {
      console.error('Error searching for user:', error.message);
    }
    throw error;
  }
}

// Main function to get access token and search for user
async function main() {
  try {
    console.log('Starting the process to get access token and search for user...');
    const accessToken = await getAccessToken();
    console.log('Access token obtained:', accessToken);
    const userInfo = await searchUserById(accessToken);
    console.log('User Info:\n', userInfo);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
