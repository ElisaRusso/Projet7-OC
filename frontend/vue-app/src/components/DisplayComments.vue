<template>
  <div>
    <ul>
      <li v-for="(comments, i) in comments" :key="i">
        <div id="comments">
          <div id="userId">Utilisateur: {{ comments.user.username }}</div>
          <div id="commentContent">
            {{ comments.text }}
            <!-- <deleteCommentButton /> -->
          </div>

          <button
            class="deleteButton"
            @click="deleteComment(comments.id)"
            type="button"
          >
            Supprimer
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// import deleteCommentButton from "../components/DeleteComment";
export default {
  name: "DisplayComment",
  components: {
    // deleteCommentButton,
  },
  data: function () {
    return {
      comments: String,
      user: String,
    };
  },
  mounted() {
    const urlId = this.$route.params.id;
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "GET",
      url: "http://localhost:3000/api/comments/" + urlId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => (this.comments = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    deleteComment(commentId) {
      const user = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "DELETE",
        url: "http://localhost:3000/api/comments/" + commentId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>


<style scoped lang="scss">
#commentContent {
  margin-bottom: 15px;
}
li {
  list-style: none;
}

#comments {
  border: 1px solid black;
}
</style>