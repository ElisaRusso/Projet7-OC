<template>
  <span>
    <div>
      <p>Utilisateur: {{ user.username }}</p>
      <p>{{ articles.text }}</p>
      <img :src="articles.imageUrl" />
    </div>
  </span>
</template>

<script>
import axios from "axios";
export default {
  name: "Article",
  data: function () {
    return {
      articles: String,
      user: String,
    };
  },

  mounted() {
    const urlId = this.$route.params.id;
    axios
      .get("http://localhost:3000/api/articles/" + urlId)
      .then(
        (response) => (
          (this.articles = response.data),
          (this.user = JSON.stringify(response.data.userId)),
          this.displayUsername(this.user)
        )
      )
      .catch((error) => console.log(error));
  },
  methods: {
    displayUsername(userID) {
      axios
        .get("http://localhost:3000/api/auth/users/" + userID)
        .then((response) => (this.user = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="scss">
div {
  border: solid 3px;
  max-width: 60%;
  text-align: center;
}

span {
  display: flex;
  justify-content: center;
}
img {
  width: 100%;
}
</style>
