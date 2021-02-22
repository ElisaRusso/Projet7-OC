<template>
  <div>
    <Hdr />
    <createArticle />
    <ul>
      <li v-for="(article, i) in articles" :key="i">
        <router-link :to="'/article/' + article.id">
          <div id="articles">
            <div id="userId">{{ articles[i].user.username }}</div>
            <div id="articleContent">
              {{ articles[i].text }}
            </div>
            <div><img id="articleImage" :src="articles[i].imageUrl" /></div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
import Hdr from "../components/Header.vue";
import createArticle from "../components/CreateArticle";
export default {
  name: "Home",
  components: {
    Hdr,
    createArticle,
  },
  data: function () {
    return {
      articles: String,
      user: String,
      commentsLength: null,
    };
  },

  methods: {
    displayArticles() {
      const user = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "GET",
        url: "http://localhost:3000/api/articles",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then((response) => (this.articles = response.data))
        .catch((error) => console.log(error));
    },
    checkIfToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.token) {
        this.displayArticles();
      }
    },
  },
  mounted() {
    this.checkIfToken();
  },
};
</script>


<style scoped lang="scss">
#articles {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: solid 2px;
  font-weight: bold;
  color: black;
  width: 30%;
  margin: auto;
  margin-bottom: 10px;
}
#userId {
  width: 100px;
  font-size: 25px;
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

#articleImage {
  width: 100%;
}
#articleContent {
  font-size: 20px;
  text-align: left;
}
</style>