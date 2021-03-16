<template>
  <div id="content">
    <div id="articleContent">
      <textarea
        type="article"
        id="article"
        name="article"
        placeholder="Que voulez vous dire?"
        v-model="text"
        maxlength="150"
        minlength="1"
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
      <button id="form-validate-button" @click="createArticle" type="submit">
        Publier
      </button>
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
  width: 60%;
  font-size: 20px;
}

#articleContent {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
#form-validate-button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
#form-validate-button > button {
  align-items: center;
  height: 40px;
  width: 70px;
}
button {
  background-color: #e77d88;
  font-weight: bold;
}

#content {
  border: solid black 1px;
  max-width: 50%;
  margin: auto;
  margin-top: 10px;
}

#addFileButton {
  height: 50px;
}
#article {
  resize: none;
  height: 70px;
}
#addFileButton {
  background-color: #e77d88;
  margin-left: 10px;
}
</style>