<template>
  <span> </span>
</template>

<script>
import axios from "axios";
export default {
  name: "isOwner",
  data: function () {
    return {
      articleUserId: String,
      userId: String,
      isOwnerBool: Boolean,
    };
  },

  mounted() {
    this.isOwner();
  },
  methods: {
    isOwner() {
      const urlId = this.$route.params.id;
      axios
        .get("http://localhost:3000/api/articles/" + urlId)
        .then(
          (response) => (
            (this.articleUserId = response.data[0].userId),
            this.isOwnerCheck(this.articleUserId)
          )
        )
        .catch((error) => console.log(error));
    },

    isOwnerCheck() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.userId = user.userId;

      if (this.userId == this.articleUserId) {
        this.isOwnerBool = true;
      } else {
        this.isOwnerBool = false;
      }
      console.log(this.isOwnerBool);
    },
  },
};
</script>



