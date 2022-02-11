<template>
  <div id="app">
    <GoogleMap :location="location" />
  </div>
</template>

<script>
import GoogleMap from "../Shared/GoogleMap.vue";

export default {
  name: "App",
  props: {
    location: Array,
  },
  components: {
    GoogleMap,
  },
};
</script>