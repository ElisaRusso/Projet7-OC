<template>
  <div id="article">
    <div>
      <p id="username">{{ user.username }}</p>
      <p id="articleContent">{{ articles.text }}</p>
      <img :src="articles.imageUrl" />
    </div>
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
  border: solid 3px;
  max-width: 60%;
  min-width: 40%;
}

#article {
  display: flex;
  justify-content: center;
}
img {
  width: 100%;
}
#username {
  font-size: 25px;
  font-weight: bold;
  margin-left: 15px;
}
#articleContent {
  font-size: 20px;
  margin-left: 30px;
}
</style>
