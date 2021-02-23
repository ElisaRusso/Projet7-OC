<template>
  <div id="content">
    <AuthHeader />
    <form id="signup">
      <h1>Inscription</h1>
      <div>
        <label for="username">Nom d'Utilisateur: </label>
        <input
          type="username"
          id="username"
          name="user_username"
          placeholder="Utilisateur01"
          v-model="usernameValue"
        />
      </div>
      <div>
        <label for="email">Email: </label>
        <input
          type="email"
          id="email"
          name="user_email"
          placeholder="email@hotmail.com"
          v-model="emailValue"
        />
      </div>
      <div>
        <label for="password">Mot de passe: </label>
        <input
          type="password"
          id="password"
          name="user_password"
          placeholder="********"
          v-model="passwordValue"
        />
      </div>
      <div id="form-validate-button">
        <input @click="signup" type="submit" value="Valider" />
      </div>
    </form>
  </div>
</template>

<script src="../backend/signup.js"></script>

<script>
import AuthHeader from "../components/AuthHeader.vue";
import axios from "axios";
export default {
  name: "Signup",
  components: {
    AuthHeader,
  },
  data: function () {
    return {
      usernameValue: "",
      emailValue: "",
      passwordValue: "",
    };
  },
  methods: {
    signup() {
      axios({
        method: "POST",
        url: "http://localhost:3000/api/auth/signup",
        data: {
          username: this.usernameValue,
          email: this.emailValue,
          password: this.passwordValue,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped lang="scss">
#signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form-validate-button {
  display: flex;
  justify-content: center;
}
div,
h1 {
  width: 170px;
}
h1 {
  text-align: center;
}
div {
  margin-top: 20px;
}
#content {
  width: 100%;
  margin: auto;
}
</style>