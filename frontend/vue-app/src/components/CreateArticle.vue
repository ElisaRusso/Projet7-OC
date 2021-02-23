<template>
  <div>
    <div id="articleContent">
      <input
        type="article"
        id="article"
        name="article"
        placeholder="Que voulez vous dire"
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
    <div id="form-validate-button">
      <input @click="createArticle" type="submit" value="Valider" />
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "createArticle",
  data: function () {
    return {
      text: "",
      selectedFile: "",
    };
  },

  methods: {
    createArticle() {
      const user = JSON.parse(localStorage.getItem("user"));
      const myForm = new FormData();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.token,
        },
      };
      myForm.append("userId", user.userId);
      myForm.append("text", this.text);
      myForm.append("imageUrl", this.selectedFile);

      axios
        .post("http://localhost:3000/api/articles", myForm, config)
        .then(() => {
          console.log("Post créé!");
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

<style scoped lang="scss">
#article {
  width: 30%;
  font-size: 20px;
}

#articleContent {
  margin-top: 40px;
  text-align: center;
}
#form-validate-button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
#content {
  display: flex;
  justify-content: center;
}
#article,
#addFileButton {
  height: 50px;
}
#addFileButton {
  margin-left: 10px;
}
</style>