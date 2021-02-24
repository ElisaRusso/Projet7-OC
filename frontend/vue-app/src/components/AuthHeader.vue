<template>
  <header>
    <router-link to="/">Inscription</router-link>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/home"> Accueil </router-link>
  </header>
</template>

<script>
export default {
  name: "AuthHeader",
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
  display: flex;
  margin-bottom: 14px;
  width: 20px;
}
a:hover {
  color: red;
}

header {
  height: 60px;
  background: black;
  margin: 0;
}
</style>
<style lang="scss">
body {
  width: 100%;
  margin: 0px;
}
</style>