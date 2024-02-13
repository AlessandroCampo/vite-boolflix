<template>
    <div class="card" @click="updateActive(movie)">
        <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" alt="">
        <p> {{ movie.title }} </p>
    </div>
</template>

<script>

import { store } from '../../store'

export default {
    props: ["movie"],
    data() {
        return {}
    },
    methods: {
        updateActive(movie) {
            store.activeMovie = movie
            store.getTrailer(store.activeMovie.id)
        }
    }
}
</script>

<style lang="scss" scoped>
div.card {
    width: calc((100% - 4 * 30px) / 5);
    flex-shrink: 0;
    cursor: pointer;

    p {
        text-align: center;
        margin-top: 0.2em;
    }
}
</style>