<template>
  <form id="login">
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
      />
    </div>
    <div id="form-validate-button">
      <input @click="login" type="submit" value="Valider" />
    </div>
  </form>
</template>



<script>
import axios from "axios";
// import AuthHeader from "../components/AuthHeader.vue";
export default {
  name: "Login",
  // components: {
  //   AuthHeader,
  // },
  data: function () {
    return {
      emailValue: "",
      passwordValue: "",
    };
  },
  methods: {
    login() {
      let myForm = { email: this.emailValue, password: this.passwordValue };
      axios({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        headers: { "Content-Type": "application/json" },
        data: myForm,
      })
        .then((response) => (this.myForm = response))
        .catch((error) => console.log(error, myForm));
    },
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
</style>