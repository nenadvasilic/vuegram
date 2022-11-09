<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        <router-link to="/" class="nav-link"
          ><img
            src="@/assets/logo.png"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />Vuegram</router-link
        >
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex ms-auto" role="search">
          <input
            v-model="store.searchTerm"
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/signup" class="nav-link">Sign up</router-link>
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <a href="#" @click.prevent="logout()" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <!-- {{ searchText }} -->
  <!-- {{ store.searchTerm }} -->

  <div class="container">
    <router-view />
    <!-- tu router dinamički ubaci screen -->
  </div>
</template>

<script>
import store from "@/store"; // @ znači src folder!
import { firebase } from "@/firebase";
import router from "@/router";

// console.log(router);

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  console.log("PROVERA STANJA LOGINA!");

  if (user) {
    // User is signed in.
    console.log("***", user.email);
    store.currentUser = user.email;

    /*
    if (!currentRoute.meta.needsUser) {
      router.push({ name: "home" });
    }
    */
  } else {
    // User is not signed in.
    console.log("*** No user");
    store.currentUser = null;

    /*
    if (currentRoute.meta.needsUser) {
      router.push({ name: "login" });
    }
    */
  }
});

export default {
  name: "app",
  data() {
    return {
      // searchText: "",
      // store: store,
      store,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
