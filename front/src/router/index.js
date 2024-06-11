import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import BorrowedBooks from '../views/BorrowedBooks.vue'  // Import BorrowedBooks component
import UploadEvent from '../views/UploadEvent.vue'
import EditBook from '../views/EditBook.vue'
import UploadGallery from '../views/UploadGallery.vue'
import UploadEventImages from '../views/UploadEventImages.vue'
import AdvancedSearch from '../views/AdvancedSearch.vue'
//import keycloak from '../keycloak'

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
    path: '/borrowed-books',  // Add route for BorrowedBooks
    name: 'BorrowedBooks',
    component: BorrowedBooks
  },
  {
    path: '/event/info',
    name: 'UploadEvent',
    component: UploadEvent
  },
  {
    path: '/book/:id',
    name: 'EditBook',
    component: EditBook,
    props: true
  },
  {
    path: '/gallery/upload',
    name: 'UploadGallery',
    component: UploadGallery
  },
  {
    path: '/event/images',
    name: 'UploadEventImages',
    component: UploadEventImages
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

