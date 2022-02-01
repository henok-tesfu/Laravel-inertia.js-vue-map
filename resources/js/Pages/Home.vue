<template>
  <div id="app">
    <GoogleMap />
  </div>
</template>

<script>
import GoogleMap from "../Shared/GoogleMap.vue";

export default {
  name: "App",
  components: {
    GoogleMap,
  },
};
</script>