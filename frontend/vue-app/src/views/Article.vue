<template>
  <div>
    <Hdr />
    <div v-if="this.articleUserId == null" id="noArticle">
      <h1>L'article recherché n'existe pas</h1>
    </div>
    <div v-if="this.articleUserId != null" id="articleContent">
      <div id="modify">
        <DeleteButton v-show="isOwnerModal" />

        <ModifyButton v-show="isOwnerModal" />
      </div>
      <div id="content">
        <Article id="article" />
        <div id="commentsList">
          <div id="comment">
            <DisplayComment />
          </div>
          <CreateComment />
        </div>
      </div>
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
#noArticle {
  text-align: center;
}
#modify {
  text-align: right;
  margin-bottom: 10px;
}
#content {
  display: flex;
}
#commentsList {
  width: 50%;
}

#article {
  margin: auto;
  min-width: 300px;
  max-width: 700px;
}

@media screen and (max-width: 810px) {
  #content {
    flex-direction: column;
  }
  #commentsList {
    width: 100%;
  }
  #article {
    max-width: 100%;
    min-width: none;
  }
}
</style>


