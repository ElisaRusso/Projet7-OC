<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>
<style lang="scss">
button {
  background-color: #e77d88;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #cc3e4c;
}
</style>

