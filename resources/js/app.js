import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { InertiaProgress } from '@inertiajs/progress'


createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    Vue.use(plugin)

    new Vue({
      render: h => h(App, props),
    }).$mount(el)
  },
});
Vue.use(VueGoogleMaps, {
  load: {
    key: 'Your_API_GOOGLE_KEY_Here',
    libraries: 'places',
  }
});
InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 100,

  // The color of the progress bar.
  color: 'red',

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: true,
});