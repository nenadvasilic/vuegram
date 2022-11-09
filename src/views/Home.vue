<template>
  <div class="row">
    <div class="col-8">
      <img
        v-if="loading"
        class="loading"
        :src="require('@/assets/loading.gif')"
      />

      <form
        v-if="!loading"
        @submit.prevent="postNewImage"
        class="form-inline mb-5"
      >
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
          <!-- <croppa :width="400" :height="400" placeholder="Učitaj sliku..." v-model="imageReference"></croppa> -->
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2 mt-1">
          Post image
        </button>
      </form>

      <instagram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <!-- <div class="col-4">Sidebar {{ hello }} {{ lista }}</div> -->
    <div class="col-4">
      Sidebar
      <!-- <p v-for="card in cards" :key="card">Ovo je tekst... {{ card }}</p> -->
      <!-- {{ store.searchTerm }} -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db, storage } from "@/firebase";

// let hello = "world";
// let cards = [];

// API/Firebase --> sve kartice --> cards

/*
cards = [
  {
    url: "https://picsum.photos/id/1/400/400",
    description: "laptop",
    time: "few minutes ago...",
  },
  {
    url: "https://picsum.photos/id/2/400/400",
    description: "laptop #2",
    time: "hour ago...",
  },
  {
    url: "https://picsum.photos/id/3/400/400",
    description: "laptop #3",
    time: "few hours ago...",
  },
];
*/

export default {
  name: "home",
  data: function () {
    return {
      // ključ: vrednost
      // hello: hello,
      // hello: "world",
      // lista: [1, 2, 3, "lj"],
      // cards: cards,
      // store: store a može i skraćeno samo store
      store,
      cards: [],
      newImageDescription: "",
      newImageUrl: "",
      // imageReference: null,
      loading: false,
    };
  },
  mounted() {
    // console.log("MOUNTED");
    // dohvat iz firebase-a
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("firebase dohvat...");
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            // console.log("ID:", doc.id);
            // console.log("Podaci:", doc.data());
            const data = doc.data();
            console.log(data);

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        });
      this.loading = false;
    },
    /*
    getImage() {
      return new Promise((resolveFn, errorFn) => {
        this.imageReference.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
    */
    /*
    async postNewImage() {
      try {
        let blobData = await this.getImage();
      } catch (e) {
        console.error("Greška", e);
      }
    },
    */
    postNewImage() {
      this.loading = true;

      // console.log("OK");
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      /*
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);

        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";
        console.log(imageName);

        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            console.log(result);
            result.ref
              .getDownloadURL()
              .then((url) => {
                console.log("Javni link", url);
              })
              .catch((e) => console.error(e));
          })
          .catch((e) => {
            console.error(e);
          });
      });
      */

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";
          this.getPosts();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  computed: {
    filteredCards() {
      // logika koja filtrira cards
      // console.log(termin);
      // return cards;
      /*
      let newCards = [];
      for (let card of this.cards) {
        // console.log(card.description);
        if (card.description.indexOf(termin) >= 0) {
          newCards.push(card);
        }
        // console.log(newCards);
      }
      return newCards;
      */
      let termin = this.store.searchTerm;
      // return this.cards.filter((card) => card.description.indexOf(termin) >= 0);
      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    InstagramCard,
  },
};
</script>

<style scoped>
/* scoped - ovi stilovi će važiti samo za ovu komponentu */
.loading {
  width: 400px;
}
</style>
