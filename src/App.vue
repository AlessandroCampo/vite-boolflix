<script >
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';


import { store } from '../src/store'

export default {
  data() {
    return {};
  },
  components: ['AppHeader'],
  methods: {},
  created() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${store.apiKey}&query=${store.searchString}`).then((res) => {
      console.log(res.data);
    });
  },
  components: { AppHeader }
}

</script>

<template
>
  <header>
    <AppHeader />
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #101b26;
  color: white;
}
</style>
