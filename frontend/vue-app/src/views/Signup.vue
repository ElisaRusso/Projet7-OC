<template>
  <div id="content">
    <AuthHeader />
    <form id="signup">
      <h1>Inscription</h1>
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
      emailValue: "",
      passwordValue: "",
    };
  },
  methods: {
    signup() {
      let myForm = { email: this.emailValue, password: this.passwordValue };
      axios({
        method: "POST",
        url: "http://localhost:3000/api/auth/signup",
        data: myForm,
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          console.log(myForm);
          console.log("Utilisateur créé!");
        })
        .catch((error) => console.log(error, myForm));
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