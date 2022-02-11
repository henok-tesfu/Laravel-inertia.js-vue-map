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
      <!-- <img src="/assets/hotel.png" alt="" /> -->
    </div>
    <br />
    <GmapMap :center="center" :zoom="6.5" style="width: 100%; height: 850px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in location"
        :position="m"
        @click="center = m"
        :icon="{
          url: `/assets/${m.category}.png`,
          anchor: { x: 10, y: 10 },
          size: { width: 60, height: 90, f: 'px', b: 'px' },
          scaledSize: { width: 20, height: 35, f: 'px', b: 'px' },
        }"
      />
    </GmapMap>
    <div
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
      <div
        class="
          w-4/5
          h-4/5
          m-auto
          bg-slate-300
          flex flex-col
          justify-center
          items-center
        "
      >
        <div
          class="
            text-red-300 text-2xl
            rounded-full
            p-2
            px-4
            bg-slate-900
            cursor-pointer
            mb-5
            mt-5
          "
          @click="openModal = false"
        >
          X
        </div>
        <add-location
          :location="location"
          st="hello world"
          @close="closeModal"
        ></add-location>
      </div>
    </div>
  </div>
</template>


<script>
import { Link } from "@inertiajs/inertia-vue";
import AddLocation from "../Pages/AddLocation.vue";
export default {
  name: "GoogleMap",
  props: {
    location: Array,
  },
  components: {
    Link,
    AddLocation,
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
  created() {
    this.getPositions();
  },
  mounted() {
    this.geolocate();
    document.addEventListener("onkeyup", close);
  },
  methods: {
    closeModal(value) {
      this.openModal = value;
      console.log("emiiiiiiiiiiiiiting");
    },
    getPositions() {
      this.$page.props;
    },
    close(e) {
      console.log(e.key);
      if (e.key == "Escape") {
        this.openModal = false;
      }
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
