<template>
  <div>
    <Hdr />
    <div id="articleContent">
      <Article />
      <DeleteButton />
    </div>
  </div>
</template>


<script>
import Article from "@/components/Article.vue";
import DeleteButton from "@/components/DeleteArticle.vue";
import Hdr from "../components/Header.vue";
export default {
  name: "ArticleV",
  components: {
    Article,
    Hdr,
    DeleteButton,
  },
};
</script>

<style scoped lang="scss">
#articleContent {
  margin-top: 40px;
}
</style>


