<template>
  <div>
    <button class="modifyButton" @click="modifyingContent = true" type="button">
      Modifier
    </button>
    <button class="modifyButton" @click="modify" type="button">
      Modifier2
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
      const myForm = new FormData();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.token,
        },
      };
      myForm.append("text", this.text);
      myForm.append("imageUrl", this.selectedFile);
      axios
        .put("http://localhost:3000/api/articles/" + urlId, myForm, config)
        .then(() => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    modify() {
      this.$emit("modify-area");
    },
  },
};
</script>