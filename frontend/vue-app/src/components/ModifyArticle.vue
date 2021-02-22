<template>
  <div>
    <button class="modifyButton" @click="modifyingContent = true" type="button">
      Modifier
    </button>
    <div v-show="modifyingContent" id="articleContent">
      <label for="password">Modifiez votre post: </label>
      <input
        type="article"
        id="article"
        name="user_article"
        placeholder="Ecrivez votre post"
        v-model="text"
      />

      <input
        ref="fileInput"
        style="display: none"
        type="file"
        name="image"
        @change="onFileSelected"
      />
      <button id="addFileButton" @click="$refs.fileInput.click()">
        Ajouter une image
      </button>
      {{ selectedFile.name }}
    </div>

    <div v-show="modifyingContent" id="form-validate-button">
      <input @click="modifyArticle" type="submit" value="Valider" />
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "ModifyButton",
  data: function () {
    return {
      text: "",
      modifyingContent: false,
      selectedFile: "",
    };
  },
  methods: {
    modifyArticle() {
      const user = JSON.parse(localStorage.getItem("user"));
      const urlId = this.$route.params.id;
      axios({
        method: "PUT",
        data: { text: this.text },
        url: "http://localhost:3000/api/articles/" + urlId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then(() => {
          console.log("Post modifié!");
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>