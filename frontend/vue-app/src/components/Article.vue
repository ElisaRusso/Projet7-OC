<template>
  <div id="article">
    <p id="username">{{ user.username }}</p>
    <p id="articleContent">{{ articles.text }}</p>
    <img :src="articles.imageUrl" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Article",
  data: function () {
    return {
      articles: String,
      user: String,
      showModal: true,
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
#article {
  border: solid 3px black;
}

img {
  width: 100%;
}
#username {
  font-size: 25px;
  font-weight: bold;
  margin-left: 15px;
  word-break: break-all;
}
#articleContent {
  max-width: 100%;
  font-size: 20px;
  margin-left: 30px;
  word-break: break-all;
}
</style>
