<template>
  <div>
    <Hdr />
    <ul>
      <li v-for="(article, i) in articles" :key="i">
        <!-- <a :href="'/article/' + article.id"> -->
        <router-link to="/article">
          <div id="articles">
            <div id="userId">Utilisateur: {{ articles[i].userId }}</div>
            <div id="articleContent">
              {{ articles[i].text }}
            </div>
          </div>
        </router-link>
        <!-- </a> -->
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
</style>