<template>
  <div id="content">
    <ul>
      <li v-for="(comments, i) in comments" :key="i">
        <div id="comments">
          <div id="userId">{{ comments.user.username }}</div>
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
export default {
  name: "DisplayComment",
  components: {},
  data: function () {
    return {
      comments: String,
      user: String,
      isOwnerModal: false,
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
li,
ul {
  list-style: none;
}
ul {
  width: 800px;
  margin: 0;
}
#userId {
  font-size: 20px;
  font-weight: bold;
}
#comments {
  border: 1px solid black;
  margin: 10px;
}

#content {
  display: flex;
  justify-content: center;
}
</style>