<template>
    <figure :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${store.activeMovie.backdrop_path}')` }"
        v-if="store.foundMovies[0].title">
        <div class="movie-info">
            <p class="title">
                {{ store.activeMovie.title }}
            </p>
            <p class="description">
                {{ store.activeMovie.overview }}
            </p>

            <button @click="() => { trailerWatch = !trailerWatch }">
                <i :class="!trailerWatch ? 'fa-solid fa-play' : 'fa-solid fa-xmark'"></i>
                {{ !trailerWatch ? 'watch trailer' : 'close trailer' }}
            </button>
        </div>
        <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${store.previewID}?autoplay=1`"
            v-if="trailerWatch">
        </iframe>



    </figure>
</template>

<script>
import { store } from "../store"
export default {
    data() {
        return {
            store,
            trailerWatch: false
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

        button {
            width: fit-content;
            background-color: white;
            color: black;
            padding-block: 0.5em;
            padding-inline: 1em;
            font-weight: bold;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 0.8em;
            font-size: 18px;
            border-radius: 20px;

            i {
                font-size: 22px;
            }
        }
    }
}
</style>