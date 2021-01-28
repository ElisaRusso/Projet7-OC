<template>
  <div id="app">
    <header v-show="showModal">
      <router-link to="/signup">Inscription</router-link>
      <!-- <img alt="Groupomania Logo" src="./assets/icon-left-font.png" /> -->
      <router-link to="/login">Connexion</router-link>
      <router-link to="/">
        <span @click="showModal = !showModal">Accueil </span></router-link
      >
    </header>
    <!-- <Hdr /> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showModal: true,
    };
  },
};
// import Hdr from "./components/Header.vue";
// export default {
//   name: "Header",
//   components: {
//     Hdr,
//   },
// };
</script>

<style scoped lang="scss">
img {
  width: 10%;
}
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

