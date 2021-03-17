<template>
  <div id="content">
    <AuthHeader />
    <form id="signup" @submit.prevent="signup">
      <img src="@/assets/icon-left-font2.png" />
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
          @input="checkPassword"
        />
      </div>
      <div class="input_container" v-show="showModal">
        <ul>
          <li v-bind:class="{ is_valid: contains_eight_characters }">
            8 Caractères minimum
          </li>
          <li v-bind:class="{ is_valid: contains_number }">1 Chiffre</li>
          <li v-bind:class="{ is_valid: contains_uppercase }">
            1 Caractère en majuscule
          </li>
          <li v-bind:class="{ is_valid: contains_special_character }">
            1 Caractère spécial
          </li>
        </ul>

        <div
          class="checkmark_container"
          v-bind:class="{ show_checkmark: valid_password }"
        >
          <svg width="50%" height="50%" viewBox="0 0 140 100">
            <path
              class="checkmark"
              v-bind:class="{ checked: valid_password }"
              d="M10,50 l25,40 l95,-70"
            />
          </svg>
        </div>
      </div>
      <div id="form-validate-button">
        <button type="submit" :disabled="isDisabled">Valider</button>
      </div>
    </form>
    <div id="message" v-show="message">
      Nom d'utilisateur ou adresse e-mail déjà enregistré.
    </div>
  </div>
</template>


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
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      message: false,
      isDisabled: true,
      showModal: false,
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
        .catch((error) => (console.log(error), (this.message = true)));
    },
    checkPassword() {
      this.password_length = this.passwordValue.length;
      this.showModal = true;
      const format = /[ !@#$%^&*()_+\-={};':"\\|,.<>?]/;

      if (this.password_length >= 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.passwordValue);
      this.contains_uppercase = /[A-Z]/.test(this.passwordValue);
      this.contains_special_character = format.test(this.passwordValue);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
        this.isDisabled = false;
      } else {
        this.valid_password = false;
        this.isDisabled = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 40%;
}
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
#message {
  color: red;
  margin: auto;
  text-align: center;
  width: 250px;
  margin-top: 10px;
}

//Password complexity

ul {
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  margin-bottom: 8px;
  color: #525f7f;
  position: relative;
}

li:before {
  content: "";
  width: 0%;
  height: 2px;
  background: #2ecc71;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Password Input --------- */

.input_container {
  position: relative;
  min-width: 15%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  background: #fff;
}

/* Checkmark & Strikethrough --------- */

.is_valid {
  color: rgba(136, 152, 170, 0.8);
}
.is_valid:before {
  width: 100%;
}

.checkmark_container {
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #2ecc71;
  width: 50px;
  height: 50px;
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>