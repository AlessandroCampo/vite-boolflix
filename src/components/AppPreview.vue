<template>
    <figure :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${store.activeMovie.backdrop_path}')` }"
        v-if="store.activeMovie">
        <div class="movie-info">
            <p class="title">
                {{ store.activeMovie.title }}
            </p>
            <p class="description">
                {{ store.activeMovie.overview }}
            </p>
            <div class="flex items-center gap-3">
                <img :src="convertFlag(store.activeMovie.original_language)" alt="">
                {{ store.activeMovie.vote_average }} ({{ store.activeMovie.vote_count }})
            </div>

            <button @click="() => { trailerWatch = !trailerWatch }">
                <i :class="!trailerWatch ? 'fa-solid fa-play' : 'fa-solid fa-xmark'"></i>
                {{ !trailerWatch ? 'watch trailer' : 'close trailer' }}
            </button>
        </div>
        <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${store.previewID}?autoplay=1`"
            v-if="trailerWatch">
        </iframe>




    </figure>
    <figure id="homeBG" v-else>
        <div>
            Find and watch awesome movies & TV shows ('s trailers :\')
        </div>
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
    },
    methods: {
        convertFlag(code) {
            if (code === "en") {
                code = "us"
            } else if (code === "ko") {
                code = "kr"
            }
            return `https://flagsapi.com/${code.toUpperCase()}/shiny/64.png`
        }
    }
}
</script>

<style lang="scss" scoped>
figure {
    height: 80vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    position: relative;

    .movie-info {
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        width: fit-content;
        max-width: 30%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 1em;
        max-height: 80%;
        position: absolute;
        left: 5%;
        bottom: 5%;
        overflow: hidden;

        .title {
            text-transform: uppercase;
            font-size: 2.5em;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
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

figure#homeBG {
    background-image: url('../assets/img/homepage_bg.jpg');
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        font-size: 45px;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        width: fit-content;
        padding: 20px;
    }

}
</style>