<template>
  <main class="form-signin w-100 m-auto">
    <form class="w-50 m-auto">
      <img
        class="mb-4"
        src="../../src/assets/logo.png"
        alt=""
        width="72"
        height="57"
      />
      <h1 class="h3 mb-3 fw-normal">This is an login page</h1>

      <div class="form-floating">
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary"
        type="button"
        @click="login()"
      >
        Submit
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022 - Nenad Vasilić</p>
    </form>
  </main>
</template>

<script>
import { firebase } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login..." + this.email);
      // console.log(this.$router);
      // let that = this;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // .then(function (result) {
        //  console.log("Uspešna prijava", result);
        //  console.log(that.$router);
        // }
        .then((result) => {
          console.log("Uspešna prijava", result);
          // console.log(this.$router);
          // this.$router.push({ name: "home" });
          // Nakon logovanja da ne bi mogli na back da se
          // vratimo ponovo na logovanje jer smo već logovani
          this.$router.replace({ name: "home" });
        })
        .catch(function (e) {
          console.error("Greška", e);
        });
    },
  },
};
</script>
