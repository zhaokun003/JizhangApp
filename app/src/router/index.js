import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Forget from '../views/Forget.vue'
import User from '../views/User.vue'
import Change from '../views/Change.vue'
import Mingxi from '../views/Mingxi.vue'
import Chaobiao from '../views/Chaobiao.vue'
import Jizhang from '../views/Jizhang.vue'
import Bangdan from '../views/Bangdan.vue'
import Changepwd from '../views/Changepwd.vue'
import Changephone from '../views/Changephone.vue'
import Addmoney from '../views/Addmoney.vue'
import Addcategory from '../views/Addcategory.vue'
import Setup from '../views/Setup.vue'
import Editcategory from '../views/Editcategory.vue'
import Editmingxi from '../views/Editmingxi.vue'
import Addaccount from '../views/Addaccount.vue'
import Editaccount from '../views/Editaccount.vue'
import Book from '../views/Book.vue'
import Addbook from '../views/Addbook.vue'
import Bookdetail from '../views/Bookdetail.vue'
import Nickname from '../views/Nickname.vue'
import Icon from '../views/Icon.vue'

// 404
import Errorinfo from '@/components/error404.vue'










Vue.use(VueRouter)


// App.vue 作为首页
const routes = [
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forget',
    component: Forget
  },
  {
    path: '/',
    component: User
  },
  {
    path: '/change',
    component: Change
  },
  {
    path: '/mingxi',
    component: Mingxi
  },
  {
    path: '/chaobiao',
    component: Chaobiao
  }, {
    path: '/jizhang',
    component: Jizhang
  }, {
    path: '/bangdan',
    component: Bangdan
  }, {
    path: '/changepwd',
    component: Changepwd
  },
  {
    path: '/changephone',
    component: Changephone
  },
  {
    path: '/addmoney',
    component: Addmoney
  },
  {
    path: '/addcategory',
    component: Addcategory
  },
  {
    path: '/setup',
    component: Setup
  },
  {
    path: '/editcategory',
    component: Editcategory
  },
  {
    path: '/editmingxi',
    component: Editmingxi
  },
  {
    path: '/addaccount',
    component: Addaccount
  },
  {
    path: '/editaccount',
    component: Editaccount
  },
  {
    path: '/book',
    component: Book
  },
  {
    path: '/addbook',
    component: Addbook
  },
  {
    path: '/bookdetail',
    component: Bookdetail
  },
  {
    path: '/Nickname',
    component: Nickname
  },
  {
    path: '/Icon',
    component: Icon
  },
  // 404page
  {
    path: '/errorinfo',
    component: Errorinfo
  }

]

const router = new VueRouter({
  routes
})

// 404
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/errorinfo');
  } else {
    next(); //如果匹配到正确跳转
  }
});

export default router
