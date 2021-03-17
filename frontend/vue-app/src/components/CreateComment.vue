<template>
  <form id="content" @submit.prevent="createComment">
    <div id="articleContent">
      <input
        type="article"
        id="article"
        name="article"
        placeholder="Ecrivez votre commentaire"
        v-model="text"
        @input="checkLength"
        accept="image/*"
      />
    </div>
    <div id="form-validate-button">
      <button type="submit" :disabled="isDisabled">Commenter</button>
    </div>
  </form>
</template>


<script>
import axios from "axios";
export default {
  name: "CreateComment",
  data: function () {
    return {
      text: "",
      isDisabled: true,
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
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    checkLength() {
      if (this.text.length >= 1) {
        this.isDisabled = false;
      }
      if (this.text.length < 1) {
        this.isDisabled = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#article {
  height: 40px;
  width: 60%;
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
button {
  background-color: #e77d88;
}
#form-validate-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
#form-validate-button > button {
  height: 40px;
  width: 90px;
  text-align: center;
}
@media screen and (max-width: 810px) {
  #article {
    width: 80%;
  }
}
</style>