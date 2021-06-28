<template>
  {{ dataRef }}
</template>

<script lang="ts">
  import { ref } from "vue";
  import axios from "axios";

  export default {
    name: "index",

    setup() {
      const dataRef = ref([]);

      axios
        .get("/api/admin", {
          params: {
            page: 1,
            limit: 10
          }
        })
        .then(res => {
          dataRef.value = res.data.rows;
        });

      return {
        dataRef
      };
    }
  };
</script>

<style lang="less" scoped></style>
