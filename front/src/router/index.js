import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import UploadEvent from '../views/UploadEvent.vue'
import EditBook from '../views/EditBook.vue'
import UploadGallery from '../views/UploadGallery.vue'
import UploadEventImages from '../views/UploadEventImages.vue'
//import keycloak from '../keycloak'

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList
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
  history: createWebHistory(),
  routes
})

//// Protect all routes
//router.beforeEach((to, from, next) => {
  //if (keycloak.authenticated) {
    //next()
  //} else {
    //keycloak.login()
  //}
//})

export default router

