import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Home from '../views/Home'
import ArticleV from '../views/Article'
import createArticle from '../views/CreateArticle'




Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Groupomania - Accueil' }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Groupomania - Login' }

  },
  {
    path: '/signup',
    component: Signup,
    name: 'Signup',
    meta: { title: 'Groupomania - Signup' }
  },
  {
    path: '/article/:id',
    component: ArticleV,
    name: 'ArticleV',
    meta: { title: 'Groupomania - Article' }
  },
  {
    path: '/createArticle',
    component: createArticle,
    name: 'createArticle',
    meta: { title: 'Groupomania - Ecrire un post' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

export default router
