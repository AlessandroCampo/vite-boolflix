<script >
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppPreview from './components/AppPreview.vue';
import AppRow from './components/AppRow.vue';


import { store } from '../src/store'

export default {
  data() {
    return {
      searchBool: true,
      trendingAll: [{}],
      popularAll: [],
      topRatedAll: [],
      trendingMovies: [{}],
      popularMovies: [],
      topRatedMovies: [],
      trendingShows: [{}],
      popularShows: [],
      topRatedShows: [],
      store
    };
  },
  methods: {},
  created() {
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc`).then((res) => {
      this.trendingAll = res.data.results
      console.log(this.trendingAll)
    });
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.apiKey}&page=1&`).then((res) => {
      for (let i = 0;i < 10;i++) {
        this.popularAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        this.popularMovies.push(res.data.results[i])
      }
      console.log(this.popularAll)
    })
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.apiKey}&page=2&`).then((res) => {
      for (let i = 0;i < 10;i++) {
        this.popularAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        this.popularShows.push(res.data.results[i])
      }
      this.popularAll.sort((a, b) => b.popularity - a.popularity)
    })
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${store.apiKey}&page=1&`).then((res) => {
      for (let i = 0;i < 10;i++) {
        this.topRatedAll.push(res.data.results[i])
      }
      console.log(this.topRatedAll)
      for (let i = 0;i < 20;i++) {
        this.topRatedMovies.push(res.data.results[i])
      }
    })
    axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${store.apiKey}&page=2&`).then((res) => {
      for (let i = 0;i < 10;i++) {
        this.topRatedAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        this.topRatedShows.push(res.data.results[i])
      }
      this.topRatedAll.sort((a, b) => b.popularity - a.popularity)
    })
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc`).then((res) => {
      this.trendingMovies = res.data.results
    });
    axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc`).then((res) => {
      this.trendingShows = res.data.results
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
    <AppRow rowTitle="your research" :research="searchBool" :moviesArray="store.foundMovies"
      v-if="store.foundMovies.length > 1" />
    <AppRow rowTitle="Trending on Boolflix" :moviesArray="trendingAll" v-if="store.page === 'Home'" />
    <AppRow rowTitle="Most popular on Boolflix" :moviesArray="popularAll" v-if="store.page === 'Home'" />
    <AppRow rowTitle="Top Rated on Boolflix" :moviesArray="topRatedAll" v-if="store.page === 'Home'" />
    <AppRow rowTitle="Trending shows on Boolflix" :moviesArray="trendingShows" v-if="store.page === 'Series'" />
    <AppRow rowTitle="Most popular shows on Boolflix" :moviesArray="popularShows" v-if="store.page === 'Series'" />
    <AppRow rowTitle="Top Rated shows on Boolflix" :moviesArray="topRatedShows" v-if="store.page === 'Series'" />
    <AppRow rowTitle="Trending movies on Boolflix" :moviesArray="trendingMovies" v-if="store.page === 'Movies'" />
    <AppRow rowTitle="Most popular movies on Boolflix" :moviesArray="popularMovies" v-if="store.page === 'Movies'" />
    <AppRow rowTitle="Top Rated movies on Boolflix" :moviesArray="topRatedMovies" v-if="store.page === 'Movies'" />

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
  margin: 0 auto;
  padding-block: 30px;
}
</style>
