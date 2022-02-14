<template>
  <div class="w-1/2 flex flex-col h-full space-y-5">
    <form
      class="w-full flex flex-col h-full space-y-5"
      @submit.prevent="submit"
    >
      <label class="text-blue-600">Search Place</label>
      <GmapAutocomplete @place_changed="setPlace" class="p-2" />
      <p class="text-sm font-light text-gray-500">
        Use search Name to find location to mark exact location use cordinates
      </p>
      <label class="text-blue-600">Cordinates</label>
      <div class="w-full grid grid-cols-2 gap-2">
        <input
          v-model="data.lat"
          placeholder="lat"
          type="text"
          class="p-2 outline-none"
          :class="errors && errors.lat ? 'ring-2 ring-red-500' : ''"
        />
        <input
          v-model="data.lng"
          placeholder="lng"
          type="text"
          class="p-2 outline-none"
          :class="errors && errors.lng ? 'ring-2 ring-red-500' : ''"
        />
      </div>
      <label class="text-blue-600">Place Name</label>
      <input
        v-model="data.placeName"
        type="text"
        class="p-2 outline-none"
        :class="errors && errors.placeName ? 'ring-2 ring-red-500' : ''"
      />
      <label class="text-blue-600">Place Category</label>
      <select
        v-model="data.category"
        class="p-2"
        :class="errors && errors.category ? 'ring-2 ring-red-500' : ''"
      >
        <option value="hospital">Hospital</option>
        <option value="bank">Bank</option>
        <option value="hotel">Hotel</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="school">School</option>
      </select>
      <div class="w-full flex justify-center">
        <!-- href="/add"
          as="button"
          method="post"
          :data="{ placeName, category, lat, lng }"
           -->
        <button
          type="submit"
          class="
            p-2
            w-52
            bg-blue-600
            text-white
            hover:bg-blue-500
            flex
            justify-center
          "
        >
          <span> Mark Location</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { Link } from "@inertiajs/inertia-vue";
export default {
  components: {
    Link,
  },
  props: {
    location: {
      type: Array,
      // required: true,
    },
    st: String,
  },
  data() {
    return {
      currentPlace: null,
      errors: null,
      data: {
        placeName: "",
        category: "",
        lat: null,
        lng: null,
      },
    };
  },
  methods: {
    setPlace(place) {
      console.log(place);
      this.currentPlace = place;
      this.data.lat = this.currentPlace.geometry.location.lat();
      this.data.lng = this.currentPlace.geometry.location.lng();
    },
    submit() {
      this.$inertia.post("/add", this.data, {
        onSuccess: (page) => {},
      });
      this.errors = this.$page.props.errors;
      if (!this.errors) this.$emit("close", false);
    },
  },
};
</script>