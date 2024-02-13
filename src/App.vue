<script >
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppPreview from './components/AppPreview.vue';


import { store } from '../src/store'

export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    console.log(store.foundMovies.length)
    axios.get('https://api.themoviedb.org/3/movie/362637?api_key=28667855a3c2bb6baed15553d94fadd3').then((res) => {
      console.log(res)
    })
  },
  components: { AppHeader, AppPreview }
}

</script>

<template
>
  <header>
    <AppHeader />
  </header>
  <section>
    <AppPreview />
  </section>
</template>

<style scoped lang="scss">
header {
  background-color: #101b26;
  color: white;
}
</style>
