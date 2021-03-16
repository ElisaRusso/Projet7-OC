<template>
  <div>
    <button class="modifyButton" @click="modify" type="button">Modifier</button>

    <div v-show="modifyingContent" id="articleContent">
      <h1>Modifiez votre post</h1>
      <div id="contentArea">
        <textarea
          type="article"
          id="article"
          name="user_article"
          v-model="text"
          maxlength="150"
        />
        <input
          ref="fileInput"
          style="display: none"
          type="file"
          name="image"
          @change="onFileSelected"
        />
        <button id="addFileButton" @click="$refs.fileInput.click()">
          <font-awesome-icon :icon="['fas', 'images']" size="2x" />
        </button>
        {{ selectedFile.name }}
      </div>
      <div id="form-validate-button">
        <button @click="cancel" type="button">Annuler</button>
        <button @click="modifyArticle" type="submit">Valider</button>
      </div>
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
  mounted() {
    const urlId = this.$route.params.id;
    axios
      .get("http://localhost:3000/api/articles/" + urlId)
      .then((response) => (this.text = response.data.text))
      .catch((error) => console.log(error));
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
    cancel() {
      location.reload();
    },
    modify() {
      this.modifyingContent = !this.modifyingContent;
      this.$emit("modify-area");
    },
  },
};
</script>

<style scoped lang="scss">
#contentArea {
  display: flex;
  justify-content: center;
}
#form-validate-button > button {
  margin: 5px;
}
#articleContent {
  text-align: center;
  width: 1000px;
  margin-top: 100px;
}
#article {
  width: 80%;
  height: 40px;
  resize: none;
}
@media screen and (max-width: 1010px) {
  #articleContent {
    max-width: 800px;
  }
}

@media screen and (max-width: 810px) {
  #articleContent {
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  #article {
    height: 70px;
  }
}
</style>