<template>
  <div>
    <Hdr />
    <div v-if="this.articleUserId == null" id="noArticle">
      <h1>L'article recherché n'existe pas</h1>
    </div>
    <div v-if="this.articleUserId != null" id="articleContent">
      <DeleteButton v-show="isOwnerModal" />
      <ModifyButton v-show="isOwnerModal" />
      <Article />
      <div id="comment">
        <DisplayComment />
      </div>
      <CreateComment />
    </div>
  </div>
</template>


<script>
import Article from "@/components/Article.vue";
import DeleteButton from "@/components/DeleteArticle.vue";
import ModifyButton from "@/components/ModifyArticle.vue";
import Hdr from "../components/Header.vue";
import DisplayComment from "../components/DisplayComments";
import axios from "axios";
import CreateComment from "../components/CreateComment.vue";
export default {
  name: "ArticleV",
  components: {
    Article,
    Hdr,
    DeleteButton,
    ModifyButton,
    CreateComment,
    DisplayComment,
  },
  data: function () {
    return { isOwnerModal: false, articleUserId: null };
  },
  mounted() {
    this.isOwner();
  },

  methods: {
    isOwner() {
      const urlId = this.$route.params.id;
      axios
        .get("http://localhost:3000/api/articles/" + urlId)
        .then(
          (response) => (
            (this.articleUserId = response.data.userId),
            this.isOwnerCheck(this.articleUserId)
          )
        )
        .catch((error) => console.log(error));
    },

    isOwnerCheck() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.userId = user;

      if (
        this.userId.userId == this.articleUserId ||
        this.userId.isAdmin == true
      ) {
        this.isOwnerModal = true;
      } else {
        this.isOwnerModal = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#articleContent {
  margin-top: 40px;
}
#comment {
  margin-top: 10px;
}
#noArticle {
  text-align: center;
}
</style>


