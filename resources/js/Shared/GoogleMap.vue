<template>
  <div class="w-full h-full relative">
    <!-- <div>
      <h2>Search and add a pin</h2>
      <GmapAutocomplete @place_changed="setPlace" />
      <button @click="addMarker">Add</button>
    </div> -->
    <div>
      <!-- <Link href="/add" class="bg-blue-500 p-2 rounded-lg mt-4 ml-5" as="button"
        >Add Location
        </Link> -->
      <button
        class="bg-blue-500 p-2 rounded-lg mt-4 ml-5"
        @click="openModal = true"
      >
        Add Location
      </button>
    </div>
    <br />
    <GmapMap :center="center" :zoom="6.5" style="width: 100%; height: 850px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      />
    </GmapMap>
    <div
      @click="openModal = !openModal"
      @keyup="close"
      v-if="openModal"
      class="
        absolute
        top-0
        right-0
        bottom-0
        left-0
        bg-black bg-opacity-25
        flex
        items-center
      "
    >
      <div class="w-4/5 h-4/5 m-auto bg-slate-300"></div>
    </div>
  </div>
</template>


<script>
import { Link } from "@inertiajs/inertia-vue";
export default {
  name: "GoogleMap",
  components: {
    Link,
  },
  data() {
    return {
      openModal: false,
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
    };
  },
  mounted() {
    this.geolocate();
    document.addEventListener("onkeyup", close);
  },
  methods: {
    close(e) {
      console.log(e);
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>
