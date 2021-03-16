
<template>
  <div>
    <header>
      <a href="/account" class="account">Mon profil</a>
      <a id="logo" href="/home"
        ><img src="@/assets/icon-left-font-monochrome-white.png"
      /></a>
      <a href="/login" @click="logout" class="logout">Déconnexion</a>
    </header>
  </div>
</template>

<script>
export default {
  name: "Hdr",
  methods: {
    logout() {
      localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
  margin: 20px;
  max-width: 200px;
}
a:hover {
  color: red;
}

header {
  display: flex;
  height: 80px;
  background: black;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}
a > img {
  width: 100%;
  min-width: 180px;
}
.account {
  min-width: 90px;
}

@media screen and (max-width: 480px) {
  header {
    flex-direction: column;
    justify-content: center;
    height: 300px;
  }
  a {
    margin: 0;
  }
  a > img {
    width: 100%;
    min-width: 100px;
  }
}
</style>
