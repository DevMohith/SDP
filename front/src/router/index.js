import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import BorrowedBooks from '../views/BorrowedBooks.vue'  // Import BorrowedBooks component
import EditBook from '../views/EditBook.vue'
import AdvancedSearch from '../views/AdvancedSearch.vue'
import BookProfile from '../views/BookProfile.vue'  // Import BookProfile component
import CreateBook from '../views/CreateBook.vue'  // Import CreateBook component
import LateBooks from '../views/LateBooks.vue'  // Import LateBooks component

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/advanced-search',
    name: 'AdvancedSearch',
    component: AdvancedSearch
  },
  {
    path: '/borrowed-books',
    name: 'BorrowedBooks',
    component: BorrowedBooks
  },
  {
    path: '/new-book',
    name: 'CreateBook',
    component: CreateBook
  },
  {
    path: '/book/:id',
    name: 'EditBook',
    component: EditBook,
    props: true
  },
  {
    path: '/book-profile/:id',
    name: 'BookProfile',
    component: BookProfile,
    props: route => ({ book: route.params.book })
  },
  {
    path: '/late-books',
    name: 'LateBooks',
    component: LateBooks,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

