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
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.token;
    axios
      .get("http://localhost:3000/api/auth/users/" + user.userId)
      .then((response) => (this.user = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang='scss'>
#info {
  text-align: center;
}
</style>