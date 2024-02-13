<script >
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppPreview from './components/AppPreview.vue';
import AppRow from './components/AppRow.vue';


import { store } from '../src/store'

export default {
  data() {
    return {
      trendingMovies: [{}],
      store
    };
  },
  methods: {},
  created() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc`).then((res) => {
      this.trendingMovies = res.data.results
    });
  },
  components: { AppHeader, AppPreview, AppRow },

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
  <section class="rows-cont">

    <AppRow rowTitle="your research" :moviesArray="store.foundMovies" v-if="store.foundMovies.length > 1" />
    <AppRow rowTitle="Trending on Boolflix" :moviesArray="trendingMovies" />
  </section>
</template>

<style scoped lang="scss">
header {
  background-color: rgba(16, 27, 38, 0.6);
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 3;
}

.rows-cont {
  width: 95%;
  margin: 0 auto;
  padding-block: 30px;
}
</style>
