<template>
    <figure :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${store.foundMovies[0].backdrop_path}')` }"
        v-if="store.foundMovies[0].title">
        <div class="movie-info">
            <p class="title">
                {{ store.foundMovies[0].title }}
            </p>
            <p class="description">
                {{ store.foundMovies[0].overview }}
            </p>
        </div>
    </figure>
</template>

<script>
import { store } from "../store"
export default {
    data() {
        return {
            store,
        }
    }
}
</script>

<style lang="scss" scoped>
figure {
    height: 70vh;
    background-size: cover;
    /* Adjusted */
    background-repeat: no-repeat;
    background-position: 50% 10%;
    position: relative;

    /* Adjusted */
    .movie-info {
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        width: fit-content;
        max-width: 25%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 1em;
        position: absolute;
        left: 5%;
        bottom: 5%;

        .title {
            text-transform: uppercase;
            font-size: 3em;
        }
    }
}
</style>