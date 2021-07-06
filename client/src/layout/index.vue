<template>
  <router-link to="/">index</router-link>
  &nbsp;
  <router-link to="/websocket">websocket</router-link>
  &nbsp;
  <router-link to="/chat-room">chat-room</router-link>

  <router-view></router-view>
</template>

<script lang="ts">
  export default {
    setup() {}
  };
</script>
