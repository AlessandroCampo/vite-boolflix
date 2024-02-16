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
      filteredPopular: [],
      filteredLatest: [],
      filteredTopRated: [],
      store
    };
  },
  methods: {
    getGenreName(id) {
      let genreName = ''
      store.allGenres.forEach((genre) => {
        if (genre.id === id) {
          genreName = genre.name
        }
      })
      return genreName
    },
    getFilteredByGenre(genre_id, query, targetArray) {
      targetArray.splice(0, targetArray.length); // Clear the target array

      let media_type = store.page;
      switch (media_type) {
        case 'Home':
          media_type = 'multi';
          break;
        case 'Series':
          media_type = 'tv';
          break;
        case 'Movies':
          media_type = 'movie';
          break;
      }

      if (media_type !== "multi") {
        axios.get(`https://api.themoviedb.org/3/discover/${media_type}?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`)
          .then((res) => {
            targetArray.push(...res.data.results);
          });
      } else {
        const moviePromise = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`);
        const tvPromise = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`);

        Promise.all([moviePromise, tvPromise])
          .then(([movieRes, tvRes]) => {
            targetArray.push(...movieRes.data.results, ...tvRes.data.results);
            targetArray.sort((a, b) => b.vote_count - a.vote_count);
          });
      }
    },
    updateFilteredResults() {
      this.getFilteredByGenre(store.genreFilter, 'vote_count.desc', this.filteredPopular);
      this.getFilteredByGenre(store.genreFilter, 'vote_average.desc', this.filteredTopRated);
      this.getFilteredByGenre(store.genreFilter, 'primary_release_date.desc', this.filteredLatest);
    }

  },
  created() {
    store.getGenre("movie")

    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc`).then((res) => {
      this.trendingAll = res.data.results
    });
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.apiKey}&page=1&`).then((res) => {

      for (let i = 0;i < 10;i++) {
        this.popularAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        this.popularMovies.push(res.data.results[i])
      }

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
  watch: {
    'store.genreFilter': {
      handler(newGenreFilter, oldGenreFilter) {
        if (newGenreFilter !== oldGenreFilter) {
          console.log("Genre filter changed");
          this.updateFilteredResults();
        }
      },
      immediate: true
    },
    'store.page': {
      handler(newPage, oldPage) {
        if (newPage !== oldPage) {
          console.log("Page changed");
          this.updateFilteredResults();
        }
      },
      immediate: true
    }
  }

}

</script>

<template
>
  <header>
    <AppHeader @genreChange="getEverything" />
  </header>
  <section>
    <AppPreview />
  </section>
  <section class="rows-cont">
    <AppRow rowTitle="your research" :research="searchBool" :moviesArray="store.foundMovies"
      v-if="store.foundMovies.length > 1" />
    <AppRow rowTitle="Trending on Boolflix" :moviesArray="trendingAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular on Boolflix" :moviesArray="popularAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated on Boolflix" :moviesArray="topRatedAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Trending shows on Boolflix" :moviesArray="trendingShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular shows on Boolflix" :moviesArray="popularShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated shows on Boolflix" :moviesArray="topRatedShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Trending movies on Boolflix" :moviesArray="trendingMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular movies on Boolflix" :moviesArray="popularMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated movies on Boolflix" :moviesArray="topRatedMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow :rowTitle="`Popular ${getGenreName(store.genreFilter)}`" :moviesArray="filteredPopular"
      v-if="store.genreFilter != 0" />
    <AppRow :rowTitle="`Latest ${getGenreName(store.genreFilter)}`" :moviesArray="filteredLatest"
      v-if="store.genreFilter != 0" />
    <AppRow :rowTitle="`Top Rated ${getGenreName(store.genreFilter)}`" :moviesArray="filteredTopRated"
      v-if="store.genreFilter != 0" />



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
