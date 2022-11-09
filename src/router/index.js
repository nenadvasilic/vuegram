import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
// import VueRouter from "vue-router";
// import Vue from "vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      needsUser: true,
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/*
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
*/

router.beforeEach((to, from, next) => {
  console.log(
    "Stara ruta -->",
    from.name,
    "nova ruta -->",
    to.name,
    "korisnik -->",
    store.currentUser
  );

  const noUser = store.currentUser === null;

  if (noUser && to.meta.needsUser) {
    // console.error("NE DOPUŠTAM");
    next("login");
  } else {
    next();
  }
});

export default router;
