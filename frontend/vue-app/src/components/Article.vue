<template>
  <span>
    <div>
      <p id="username">{{ user.username }}</p>
      <p id="articleContent">{{ articles.text }}</p>
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
div {
  border: solid 3px;
  max-width: 60%;
  // text-align: center;
  min-width: 40%;
}

span {
  display: flex;
  justify-content: center;
}
img {
  width: 100%;
}
#username {
  font-size: 25px;
  font-weight: bold;
}
#articleContent {
  font-size: 20px;
  margin-left: 20px;
}
</style>
