<template>
  <div>
    <div>
      <Hdr />
      Adresse e-mail: {{ this.user.email }}
    </div>
    <div>Nom d'utilisateur: {{ this.user.username }}</div>
  </div>
</template>

<script>
import Hdr from "../components/Header.vue";
import axios from "axios";
export default {
  name: "Account",
  components: {
    Hdr,
  },
  data: function () {
    return {
      userId: String,
      user: String,
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.token;
    axios
      .get("http://localhost:3000/api/auth/users/" + user.userId)
      .then(
        (response) => (
          (this.user = response.data[0]), console.log(this.userMail)
        )
      )
      .catch((error) => console.log(error));
  },
};
</script>