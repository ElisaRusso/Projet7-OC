<template>
  <button
    class="deleteButton"
    @click="deleteComment(comments.id)"
    type="button"
  >
    Del
  </button>
</template>


<script>
import axios from "axios";
export default {
  name: "deleteCommentButton",
  data: function () {
    return {};
  },

  methods: {
    deleteComment(commentId) {
      const user = JSON.parse(localStorage.getItem("user"));
      //   const urlId = this.$route.params.id;
      axios({
        method: "DELETE",
        url: "http://localhost:3000/api/comments/" + commentId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then(() => {
          console.log("Commentaire supprimé!");
          //   location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>