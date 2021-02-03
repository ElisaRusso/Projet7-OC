
<template>
  <header>
    <a href="/signup" class="logout">Déconnexion</a>
    <a href="/login" class="account">Mon profil</a>
  </header>
</template>

<script>
export default {
  name: "Hdr",
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: white;
  display: flex;
  margin-bottom: 14px;
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