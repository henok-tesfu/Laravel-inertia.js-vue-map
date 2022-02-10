<template>
  <div class="w-1/2 flex flex-col h-full space-y-5">
    <label class="text-blue-600">Search Place</label>
    <GmapAutocomplete @place_changed="setPlace" class="p-2" />
    <p class="text-sm font-light text-gray-500">
      Use search Name to find location to mark exact location use cordinates
    </p>
    <label class="text-blue-600">Cordinates</label>
    <div class="w-full grid grid-cols-2 gap-1">
      <input v-model="lat" placeholder="lat" type="text" class="p-2" />
      <input v-model="lng" placeholder="lng" type="text" class="p-2" />
    </div>
    <label class="text-blue-600">Place Name</label>
    <input v-model="placeName" type="text" class="p-2" />
    <label class="text-blue-600">Place Category</label>
    <select v-model="categori" class="p-2" id="">
      <option value="hospital">Hospital</option>
      <option value="bank">Bank</option>
      <option value="hotel">Hotel</option>
      <option value="pharmacy">Pharmacy</option>
      <option value="school">School</option>
    </select>
    <div class="w-full flex justify-center">
      <Link
        href="/add"
        as="button"
        class="
          p-2
          w-52
          bg-blue-600
          text-white
          hover:bg-blue-500
          flex
          justify-center
        "
        method="post"
        :data="{ placeName, categori, lat, lng }"
      >
        <span> Mark Location</span>
      </Link>
    </div>
  </div>
</template>
<script>
import { Link } from "@inertiajs/inertia-vue";
export default {
  components: {
    Link,
  },
  data() {
    return {
      currentPlace: null,
      placeName: "",
      categori: "",
      lat: null,
      lng: null,
    };
  },
  methods: {
    setPlace(place) {
      console.log(place);
      this.currentPlace = place;
      this.lat = this.currentPlace.geometry.location.lat();
      this.lng = this.currentPlace.geometry.location.lng();
    },
  },
};
</script>