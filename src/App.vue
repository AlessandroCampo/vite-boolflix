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

      switch (genre_id) {
        case 10759:
          genre_id = '28%7C10759%7C12';
          break;
        case 10768:
          genre_id = '10752%7C10768';
          break;
        case 53:
          genre_id = '53%7C9648';
          break;
        case 10765:
          genre_id = '10765%7C878%7C14'
          break;

      }

      if (media_type !== "multi") {
        axios.get(`https://api.themoviedb.org/3/discover/${media_type}?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`)
          .then((res) => {
            res.data.results.forEach((el) => {
              el.media_type = media_type
            })
            targetArray.push(...res.data.results);
            if (targetArray == this.filteredPopular && this.filteredPopular.length > 0) {

              this.updateActive(this.filteredPopular[0])
            }

          });
      } else {
        const moviePromise = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`);
        const tvPromise = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${store.apiKey}&with_genres=${genre_id}&sort_by=${query}&page=1&vote_count.gte=150`);

        Promise.all([moviePromise, tvPromise])
          .then(([movieRes, tvRes]) => {
            const moviesWithMediaType = movieRes.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
            const tvWithMediaType = tvRes.data.results.map(tv => ({ ...tv, media_type: 'tv' }));
            targetArray.push(...moviesWithMediaType, ...tvWithMediaType);
            targetArray.sort((a, b) => b.vote_count - a.vote_count);
            if (targetArray == this.filteredPopular && this.filteredPopular.length > 0) {
              this.updateActive(this.filteredPopular[0]);
            }
          });

      }
    },
    async updateFilteredResults() {
      await Promise.all([
        this.getFilteredByGenre(store.genreFilter, 'vote_count.desc', this.filteredPopular),
        this.getFilteredByGenre(store.genreFilter, 'vote_average.desc', this.filteredTopRated),
        this.getFilteredByGenre(store.genreFilter, 'primary_release_date.desc', this.filteredLatest)
      ]);
      console.log(this.filteredPopular)
    }
    ,
    updateActive(movie) {
      store.activeMovie = movie
      store.foundMovies = []
      store.updateStars()
      store.getTrailer(store.activeMovie.id, store.activeMovie.media_type)
      store.getDetails(store.activeMovie.id, store.activeMovie.media_type)
      store.getCast(store.activeMovie.id, store.activeMovie.media_type)
      store.getImages(store.activeMovie.id, store.activeMovie.media_type)
      store.getProviders(store.activeMovie.id, store.activeMovie.media_type)
      store.getRec(store.activeMovie.id, store.activeMovie.media_type)
    }

  },
  created() {
    store.getGenre("movie")
    store.generateForYou()
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (window.scrollY === 0) {
        header.style.backgroundColor = "rgba(16, 27, 38, 0.6)";
      } else {
        header.style.backgroundColor = "rgba(16, 27, 38, 1)";
      }
    });

    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc&language=${store.lang}`).then((res) => {

      this.trendingAll = res.data.results
    });
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${store.apiKey}&sort_by=vote_count.desc&page=1&vote_count.gte=150&language=${store.lang}`).then((res) => {

      for (let i = 0;i < 10;i++) {
        res.data.results[i].media_type = "movie"
        this.popularAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        res.data.results[i].media_type = "movie"
        this.popularMovies.push(res.data.results[i])
      }

    })
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${store.apiKey}&sort_by=vote_count.desc&page=1&vote_count.gte=150&language=${store.lang}`).then((res) => {

      for (let i = 0;i < 10;i++) {
        res.data.results[i].media_type = "tv"
        this.popularAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        res.data.results[i].media_type = "tv"
        this.popularShows.push(res.data.results[i])
      }
      this.popularAll.sort((a, b) => b.vote_average - a.vote_average)
    })
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${store.apiKey}&sort_by=vote_average.desc&page=1&vote_count.gte=350&language=${store.lang}`).then((res) => {
      for (let i = 0;i < 10;i++) {
        res.data.results[i].media_type = "movie"
        this.topRatedAll.push(res.data.results[i])
      }

      for (let i = 0;i < 20;i++) {
        res.data.results[i].media_type = "movie"
        this.topRatedMovies.push(res.data.results[i])
      }
    })
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${store.apiKey}&sort_by=vote_average.desc&page=1&vote_count.gte=350&language=${store.lang}`).then((res) => {
      for (let i = 0;i < 10;i++) {
        res.data.results[i].media_type = "tv"
        this.topRatedAll.push(res.data.results[i])
      }
      for (let i = 0;i < 20;i++) {
        res.data.results[i].media_type = "tv"
        this.topRatedShows.push(res.data.results[i])
      }
      this.topRatedAll.sort((a, b) => b.vote_average - a.vote_average)
    })
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc&language=${store.lang}`).then((res) => {
      this.trendingMovies = res.data.results
    });
    axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${store.apiKey}&query=${store.searchString}&page=1&sort_by=popularity.desc&language=${store.lang}`).then((res) => {
      this.trendingShows = res.data.results
    });
  },
  components: { AppHeader, AppPreview, AppRow },

  watch: {
    'store.genreFilter': {
      handler(newGenreFilter, oldGenreFilter) {
        if (newGenreFilter !== oldGenreFilter) {
          this.updateFilteredResults();
          store.activeMovieRec = []
        }
      },
      immediate: true
    },
    'store.page': {
      handler(newPage, oldPage) {
        if (newPage !== oldPage) {
          console.log("page changed")
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
    <AppHeader />
  </header>
  <section>
    <AppPreview />
  </section>
  <section class="rows-cont">

    <AppRow rowTitle="your research" :research="searchBool" :moviesArray="store.foundMovies"
      v-if="store.foundMovies.length > 1" />
    <AppRow :rowTitle="`If you liked ${store.activeMovie.name || store.activeMovie.title}`"
      :moviesArray="store.activeMovieRec" v-if="store.activeMovieRec.length > 0" />
    <AppRow rowTitle="Trending on WOP" :moviesArray="trendingAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular on WOP" :moviesArray="popularAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated on WOP" :moviesArray="topRatedAll"
      v-if="store.page === 'Home' && store.genreFilter == 0" />
    <AppRow rowTitle="Trending shows on WOP" :moviesArray="trendingShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular shows on WOP" :moviesArray="popularShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated shows on WOP" :moviesArray="topRatedShows"
      v-if="store.page === 'Series' && store.genreFilter == 0" />
    <AppRow rowTitle="Trending movies on WOP" :moviesArray="trendingMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow rowTitle="Most popular movies on WOP" :moviesArray="popularMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow rowTitle="Top Rated movies on WOP" :moviesArray="topRatedMovies"
      v-if="store.page === 'Movies' && store.genreFilter == 0" />
    <AppRow :rowTitle="`Popular ${getGenreName(store.genreFilter)}`" :moviesArray="filteredPopular"
      v-if="store.genreFilter != 0 && store.page !== 'Personal'" />
    <AppRow :rowTitle="`Latest ${getGenreName(store.genreFilter)}`" :moviesArray="filteredLatest"
      v-if="store.genreFilter != 0 && store.page !== 'Personal'" />
    <AppRow :rowTitle="`Top Rated ${getGenreName(store.genreFilter)}`" :moviesArray="filteredTopRated"
      v-if="store.genreFilter != 0 && store.page !== 'Personal'" />
    <AppRow :rowTitle="`Watchlist`" :moviesArray="store.watchList"
      v-if="store.page === 'Personal' && store.watchList.length > 0" />
    <AppRow :rowTitle="`Favourites`" :moviesArray="store.favList"
      v-if="store.page === 'Personal' && store.favList.length > 0" />
    <AppRow :rowTitle="`Chosen for you`" :moviesArray="store.chosenForYou"
      v-if="store.page === 'Personal' && store.chosenForYou.length > 0" />

    <h1 class="text-center text-4xl mt-12"
      v-if="store.favList.length == 0 && store.watchList.length == 0 && store.page === 'Personal'"> START FILLING
      YOUR WATCHLIST AND FAVLIST </h1>




  </section>
</template>

<style scoped lang="scss">
header {
  background-color: rgba(16, 27, 38, 0.6);
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 13;
}

.rows-cont {
  margin: 0 auto;
  padding-block: 30px;
}
</style>
