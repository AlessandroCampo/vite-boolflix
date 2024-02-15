<template>
    <figure :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${store.activeMovie.backdrop_path}')` }"
        v-if="store.activeMovie">
        <div class="movie-info">
            <p class="title">
                {{ store.activeMovie.title ? store.activeMovie.title : store.activeMovie.name }}
            </p>
            <div class="flex items-center gap-3">
                <img :src="convertFlag(store.activeMovie.original_language)" alt="" style="width: 50px;">
                <div class="review">
                    {{ store.roundHalveNumber(store.activeMovie.vote_average) }}
                    <i class="fa-solid fa-star text-yellow-400" v-for="index in store.starsNumber" :key="index"></i>
                    <i class="fa-solid fa-star-half-stroke text-yellow-400" v-for="index in store.starsHalf"
                        :key="index"></i>
                    <i class="fa-regular fa-star" v-for="index in store.emptyStars" :key="index"></i>
                    ({{ store.activeMovie.vote_count }})

                </div>
            </div>
            <div>
                <p v-if="store.activeMovieDeatils.release_date">
                    {{ store.activeMovieDeatils.release_date.split("-")[0] }}
                    {{ convertDuration(store.activeMovieDeatils.runtime) }}
                </p>


            </div>
            <p class="description">
                {{ store.activeMovie.overview }}
            </p>

            <p class="actorList">
                <strong> Cast: </strong>
                <span v-for="(actor, index) in store.activeMovieCast" :key=index>
                    {{ index !== store.activeMovieCast.length - 1 ? actor.name + "," + " " :
                        actor.name }}
                </span>
            </p>

            <p class="actorList">
                <strong> Directors: </strong>
                <span v-for="(dir, index) in store.activeMovieDirectors" :key=index>
                    {{ index !== store.activeMovieDirectors.length - 1 ? dir.name + "," + " " :
                        dir.name }}
                </span>
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
            } else if (code === "ja") {
                code = "jp"
            }
            return `https://flagsapi.com/${code.toUpperCase()}/shiny/64.png`
        },
        convertDuration(minutes) {
            var hours = Math.floor(minutes / 60);
            var remainingMinutes = minutes % 60;
            return hours + "h " + remainingMinutes + "m";
        }

    },
    computed: {

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
        background-color: rgba(0, 0, 0, 0.8);
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

        .actorList {

            font-size: 0.8em;

            span {
                font-style: italic;
            }

            strong {
                font-weight: bolder;
                font-size: 1.1em;
            }
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