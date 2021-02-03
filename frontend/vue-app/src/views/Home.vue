<template>
  <div>
    <Hdr />
    <router-link to="/createArticle/">
      <div id="newArticleButton">Rédiger un article</div>
    </router-link>
    <ul>
      <li v-for="(article, i) in articles" :key="i">
        <router-link :to="'/article/' + article.id">
          <div id="articles">
            <div id="userId">Utilisateur: {{ articles[i].userId }}</div>
            <div id="articleContent">
              {{ articles[i].text }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
import Hdr from "../components/Header.vue";
export default {
  name: "Home",
  components: {
    Hdr,
  },
  data: function () {
    return {
      articles: String,
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/articles")
      .then(
        (response) => (
          (this.articles = response.data), console.log(response.data)
        )
      )
      .catch((error) => console.log(error));
  },
};
</script>


<style scoped lang="scss">
#articles {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 40px;
  border: solid 2px;
  font-weight: bold;
}
#userId {
  color: red;
  border: solid 1px;
  width: 100px;
}
ul {
  display: flex;
  flex-direction: column-reverse;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}

#newArticleButton {
  font-size: 30px;
  border: solid 3px;
  width: 220px;
  text-align: center;
  margin-top: 10px;
}
</style>