<template>
  <span>
    <div>
      <p>Utilisateur: {{ articles.userId }}</p>
      <p>{{ articles.text }}</p>
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
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/articles/1")
      .then(
        (response) => (
          (this.articles = response.data[0]), console.log(response.data)
        )
      )
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="scss">
div {
  border: solid 3px;
  width: 100px;
  text-align: center;
}

span {
  display: flex;
  justify-content: center;
}
</style>
