<template>
  <button class="deleteButton" @click="deleteArticle" type="button">X</button>
</template>


<script>
import axios from "axios";
export default {
  name: "deleteButton",

  methods: {
    deleteArticle() {
      const urlId = this.$route.params.id;
      axios
        .delete("http://localhost:3000/api/articles/" + urlId)
        .then(() => {
          console.log("Post supprimé!");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>