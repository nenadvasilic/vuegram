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
      <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

      <div class="form-floating">
        <input
          type="text"
          v-model="firstName"
          class="form-control"
          id="floatingFirstName"
          placeholder="Nenad"
        />
        <label for="floatingInput">First name</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          v-model="lastName"
          class="form-control"
          id="floatingLastName"
          placeholder="Vasilić"
        />
        <label for="floatingInput">Last name</label>
      </div>

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
      <div class="form-floating">
        <input
          type="password"
          v-model="confirmPassword"
          class="form-control"
          id="floatingPasswordConfirm"
          placeholder="Password"
        />
        <label for="floatingPassword">Confirm Password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary mt-3"
        type="button"
        @click="signup"
      >
        Submit
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022 - Nenad Vasilić</p>
    </form>
  </main>
</template>

<script>
// import firebase from "@/firebase";
import { firebase } from "@/firebase";

export default {
  name: "Signup",
  // data je funkcija
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  // methods je objekt
  methods: {
    signup() {
      // alert(this.firstName);
      // console.log(firebase);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function () {
          console.log("Uspešna registracija!");
        })
        .catch(function (error) {
          console.error("Došlo je do greške", error);
        });
      console.log("Nastavak...");
    },
  },
};
</script>
