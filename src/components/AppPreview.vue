<template>
    <figure :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${store.activeMovie.backdrop_path}')` }"
        v-if="store.activeMovie">
        <div class="movie-info">

            <img :src="`https://image.tmdb.org/t/p/original/${store.activeMovieLogo}`" alt="" class="movie_logo mb-4"
                style="width: 420px; max-height:200px;" v-if="store.activeMovieLogo">

            <p class="title" v-else>
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
                <p>
                    {{ store.activeMovieDeatils?.release_date ? store.activeMovieDeatils.release_date.split("-")[0] :
                        store.activeMovie.first_air_date.split("-")[0] }}
                    {{ store.activeMovieDeatils.runtime ? convertDuration(store.activeMovieDeatils.runtime) :
                        `${store.activeMovieDeatils.number_of_seasons} seasons (${store.activeMovieDeatils.status})` }}
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
                <!-- <span v-for="(dir, index) in store.activeMovieDeatils.created_by" :key=index>
                    {{ index !== store.activeMovieDeatils.created_by.length - 1 ? dir.name + "," + " " :
                        dir.name }}
                </span> -->
                <span v-for="(dir, index) in store.activeMovieDirectors" :key=index>
                    {{ index !== store.activeMovieDirectors.length - 1 ? dir.name + "," + " " :
                        dir.name }}
                </span>

            </p>

            <p class="actorList">
                <strong> Genres: </strong>
                <span v-for="(id, index) in store.activeMovie.genre_ids" :key=index>
                    {{ index !== store.activeMovie.genre_ids.length - 1 ? convertGenreId(id) + "," + " " :
                        convertGenreId(id) }}
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
        },
        convertGenreId(id) {
            let genreName = ''
            store.allGenres.forEach((genre) => {
                if (genre.id === id) {
                    genreName = genre.name
                    console.log(genre.name)
                }
            })
            return genreName
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
        gap: 0.6em;
        height: 80%;
        position: absolute;
        left: 5%;
        bottom: 5%;
        overflow: hidden;

        p.description {
            max-height: 35%;
            overflow: auto;
            font-size: 0.8em;
        }

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
            margin-top: 20px;

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