<template>
  <div>
    <Hdr />
    <createArticle />
    <ul>
      <li v-for="(article, i) in articles" :key="i">
        <div id="articles">
          <router-link :to="'/article/' + article.id">
            <div id="userId">{{ articles[i].user.username }}</div>
            <div id="articleContent">
              {{ articles[i].text }}
            </div>
            <div><img id="articleImage" :src="articles[i].imageUrl" /></div>
          </router-link>
        </div>
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
  border-radius: 15px;
  border: solid 2px;
  font-weight: bold;
  color: black;
  width: 45%;
  margin: auto;
  margin-bottom: 10px;
}
#userId {
  text-align: left;
  font-size: 50px;
  margin-left: 15px;
  word-wrap: break-word;
}
ul {
  display: flex;
  flex-direction: column-reverse;
}
li {
  list-style: none;
  margin-bottom: 40px;
  margin-left: -40px;
}
a {
  text-decoration: none;
  color: black;
}

#articleImage {
  width: 100%;
}
#articleContent {
  font-size: 35px;
  text-align: justify;
  margin: 30px;
  margin-left: 60px;
  word-wrap: break-word;
}

@media screen and (max-width: 900px) {
  #articles {
    width: 90%;
  }
}
@media screen and (max-width: 450px) {
  #articleContent {
    font-size: 15px;
    max-height: 150px;
    width: 100%;
    margin-left: 0;
  }
  #userId {
    font-size: 25px;
    margin-left: 0;
  }
}
</style>