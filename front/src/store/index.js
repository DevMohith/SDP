import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    books: [],
    searchResults: [],
    isSearch: 0,
    userInfo: "",
    borrowedBooks: []
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    setSearchResults(state, books) {
      state.searchResults = books;
    },
    setBook(state, updatedBook) {
      const index = state.books.findIndex(book => book._id === updatedBook._id);
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook);
      }
    },
    setSearchActive(state) {
      state.isSearch = 1;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setBorrowedBooks(state, borrowedBooks) {
      state.borrowedBooks = borrowedBooks;
    }
  },
  actions: {
    fetchBooks() {
      // This is where you'd make an API call to fetch books
      // Example:
      // axios.get('https://api.library.com/books')
      //   .then(response => {
      //     commit('setBooks', response.data);
      //   })
      //   .catch(error => {
      //     console.error('There was an error fetching the books:', error);
      //   });
    },
    fetchBook({ state }, id) {
      return state.books.find(book => book._id === id);
    },
    async fetchBorrowedBooks({ commit, state }) {
      if (!state.userInfo) {
        console.error('User info not available');
        return;
      }

      const userId = state.userInfo.sub;
      const keycloak = window.keycloak; // Assuming keycloak is made globally available

      try {
        // Fetch borrowed books using the user ID
        const response = await axios.get('/adminControl/getBorrowedBooks', {
          params: { userid: userId },
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        commit('setBorrowedBooks', response.data.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    borrowedBooks: state => state.borrowedBooks
  }
});

export default store;

