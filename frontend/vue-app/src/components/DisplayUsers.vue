<template>
  <ul v-show="showModal">
    <li v-for="(users, i) in users" :key="i">
      <div id="userId">
        {{ users.username }}
        <button class="deleteButton" @click="onButtonSelected" type="button">
          Supprimer
          <font-awesome-icon :icon="['fas', 'user-minus']" />
        </button>
      </div>
    </li>
  </ul>
</template>


<script>
import axios from "axios";
export default {
  name: "DisplayUsers",
  data: function () {
    return {
      users: String,
      user: String,
      showModal: true,
      selectedButton: null,
    };
  },
  mounted() {
    //On vérifie si l'utilisateur est un administrateur
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isAdmin == true) {
      this.showModal = true;
      this.displayUsers();
    } else {
      this.showModal = false;
    }
  },
  methods: {
    displayUsers() {
      const user = JSON.parse(localStorage.getItem("user"));
      let header = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .get("http://localhost:3000/api/auth/users/", header)
        .then((response) => (this.users = response.data))
        .catch((error) => console.log(error));
    },
    onButtonSelected(event) {
      this.selectedButton = event.target.previousSibling.textContent.trim();
      this.checkUser();
    },

    //On vérifie à quel utilisateur correspond le bouton cliqué
    checkUser() {
      axios
        .get("http://localhost:3000/api/auth/user/" + this.selectedButton)
        .then((response) => ((this.user = response.data.id), this.deleteUser()))
        .catch((error) => console.log(error));
    },
    deleteUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      let header = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/auth/users/" + this.user, header)
        .then(() => location.reload())
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  margin-left: -16px;
}
#userId {
  text-align: center;
  width: 100px;
  border: 1px solid;
}
li {
  margin-top: 20px;
}
button {
  width: 80px;
}
</style>