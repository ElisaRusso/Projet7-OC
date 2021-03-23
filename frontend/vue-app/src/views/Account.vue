<template>
  <div>
    <Hdr />
    <div id="info">
      <div>Adresse e-mail: {{ this.user.email }}</div>
      <div>Nom d'utilisateur: {{ this.user.username }}</div>
    </div>
    <div>
      <DisplayUsers />
    </div>
    <button id="deleteButton" @click="deleteAccount" type="button">
      Supprimer mon compte
    </button>
  </div>
</template>

<script>
import Hdr from "../components/Header.vue";
import DisplayUsers from "../components/DisplayUsers";
import axios from "axios";
export default {
  name: "Account",
  components: {
    Hdr,
    DisplayUsers,
  },
  data: function () {
    return {
      userId: String,
      user: String,
    };
  },
  mounted() {
    //On récupère les informations de l'utilisateur actuellement connecté
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.token;
    axios
      .get("http://localhost:3000/api/auth/users/" + user.userId)
      .then((response) => (this.user = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    deleteAccount() {
      //Suprression d'un utilisateur
      const user = JSON.parse(localStorage.getItem("user"));
      let header = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/auth/users/" + this.user.id, header)
        .then(() => ((location.href = "/"), localStorage.removeItem("user")))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang='scss'>
#info {
  font-size: 20px;
  border: black solid 1px;
  text-align: center;
  min-width: 140px;
  max-width: 30%;
  margin: auto;
  margin-top: 20px;
  word-break: break-all;
}
#deleteButton {
  float: right;
  margin-top: 20px;
}
</style>