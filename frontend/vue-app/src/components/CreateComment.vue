<template>
  <div id="content">
    <div id="articleContent">
      <input
        type="article"
        id="article"
        name="article"
        placeholder="Ecrivez votre commentaire"
        v-model="text"
      />
    </div>
    <div id="form-validate-button">
      <input @click="createComment" type="submit" value="Valider" />
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "CreateComment",
  data: function () {
    return {
      text: "",
    };
  },
  methods: {
    createComment() {
      const user = JSON.parse(localStorage.getItem("user"));
      const urlId = this.$route.params.id;
      axios({
        method: "POST",
        url: "http://localhost:3000/api/comments",
        data: { text: this.text, userId: user.userId, articleId: urlId },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then(() => {
          console.log("Commentaire créé!");
          location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="scss">
#article {
  height: 40px;
  width: 50%;
}
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#articleContent {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>