import { createStore } from 'vuex';

const store = createStore({
  state: {
    books: [
      {
        _id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        publishedDate: '1925-04-10',
        description: 'A novel set in the Roaring Twenties.'
      },
      {
        _id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        publishedDate: '1960-07-11',
        description: 'A novel about racial injustice in the Deep South.'
      },
      {
        _id: '3',
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        publishedDate: '1949-06-08',
        description: 'A novel depicting a totalitarian future society.'
      },
      {
        _id: '4',
        title: 'Moby Dick',
        author: 'Herman Melville',
        genre: 'Adventure',
        publishedDate: '1851-10-18',
        description: 'A novel about the voyage of the whaling ship Pequod.'
      },
      {
        _id: '5',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        publishedDate: '1813-01-28',
        description: 'A novel about manners and matrimonial machinations.'
      }
    ]
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    setBook(state, updatedBook) {
      const index = state.books.findIndex(book => book._id === updatedBook._id);
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook);
      }
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
    saveBook({ commit }, book) {
      // This is where you'd make an API call to save a book
      // Example:
      // axios.put(`https://api.library.com/books/${book._id}`, book)
      //   .then(() => {
      //     commit('setBook', book);
      //   })
      //   .catch(error => {
      //     console.error('There was an error updating the book:', error);
      //   });
      commit('setBook', book);
    }
  }
});

export default store;

