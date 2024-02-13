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
