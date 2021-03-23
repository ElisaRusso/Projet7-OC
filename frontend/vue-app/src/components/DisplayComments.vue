<template>
  <div id="content">
    <ul>
      <li v-for="(comments, i) in comments" :key="i">
        <div id="comments">
          <div id="userId">{{ comments.user.username }}</div>
          <div id="commentContent">
            {{ comments.text }}
          </div>
          <div id="delete">
            <button
              v-if="comments.user.id == user.userId || user.isAdmin == true"
              class="deleteButton"
              @click="deleteComment(comments.id)"
              type="button"
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DisplayComment",
  data: function () {
    return {
      comments: String,
      isOwnerModal: false,
      user: null,
    };
  },
  mounted() {
    //Récupération des commentaires liés à un post
    const urlId = this.$route.params.id;
    this.user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "GET",
      url: "http://localhost:3000/api/comments/" + urlId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
    })
      .then((response) => (this.comments = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    deleteComment(commentId) {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/api/comments/" + commentId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.user.token,
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
  margin-left: 15px;
}
li,
ul {
  list-style: none;
}
ul {
  width: 800px;
  margin: auto;
  padding: 0;
}
#userId {
  font-size: 20px;
  margin-left: 10px;
  font-weight: bold;
}
#comments {
  border: 1px solid black;
  margin-bottom: 10px;
}

#content {
  display: flex;
  justify-content: center;
}
#delete {
  text-align: right;
}

@media screen and (max-width: 810px) {
  ul {
    width: 100%;
    margin-top: 10px;
  }
}
</style>