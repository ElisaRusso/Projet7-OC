<template>
  <div>
    <Hdr />
    <div id="articleContent">
      <label for="password">Votre post: </label>
      <input
        type="article"
        id="article"
        name="user_article"
        placeholder="Ecrivez votre post"
        v-model="text"
      />
    </div>
    <div id="form-validate-button">
      <input @click="createArticle" type="submit" value="Valider" />
    </div>
  </div>
</template>


<script>
// import axios from "axios";
import Hdr from "../components/Header.vue";
import axios from "axios";
export default {
  name: "createArticle",
  components: {
    Hdr,
  },
  data: function () {
    return {
      userId: 1,
      text: "",
    };
  },

  methods: {
    createArticle() {
      let myForm = { userId: this.userId, text: this.text };
      axios({
        method: "POST",
        url: "http://localhost:3000/api/articles",
        data: myForm,
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          console.log(this.myForm);
          console.log("Post créé!");
          this.$router.push("/");
        })
        .catch((error) => console.log(error, this.myForm));
    },
  },
};
</script>

<style scoped lang="scss">
#article {
  width: 40%;
}

#articleContent {
  margin-top: 40px;
  text-align: center;
}
#form-validate-button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>