<template>
  <div id="content">
    <AuthHeader />

    <form id="login" @submit.prevent="login">
      <img src="@/assets/icon-left-font2.png" />
      <h1>Connexion</h1>
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
          autocomplete="on"
        />
      </div>
      <div id="form-validate-button">
        <input type="submit" value="Valider" />
      </div>
    </form>
    <div id="message" v-show="message">
      Adresse e-mail ou mot de passe incorrecte
    </div>
  </div>
</template>



<script>
import axios from "axios";
import AuthHeader from "../components/AuthHeader.vue";
export default {
  name: "Login",
  components: {
    AuthHeader,
  },
  data: function () {
    return {
      emailValue: "",
      passwordValue: "",
      message: false,
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      axios({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        headers: { "Content-Type": "application/json" },
        data: { email: this.emailValue, password: this.passwordValue },
      })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            this.$router.push("/home");
          }
        })
        .catch(
          (error) => (
            console.log(error), (this.message = true), (this.passwordValue = "")
          )
        );
    },
  },
  mounted() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped lang="scss">
div > #login {
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
#message {
  color: red;
  margin: auto;
  text-align: center;
  margin-top: 10px;
}

img {
  width: 40%;
}
</style>