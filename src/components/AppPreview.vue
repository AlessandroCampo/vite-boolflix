<template>
    <figure v-if="store.activeMovie" :style="{
        backgroundImage: `url('${store.activeMovie.backdrop_path ? 'https://image.tmdb.org/t/p/original/' + store.activeMovie.backdrop_path : 'https://www.desktopbackground.org/p/2010/09/05/75431_movies-generic-film-home-theater-backdrops-wallpapers_1920x1080_h.jpg'}')`
    }">
        <div class="movie-info">

            <img :src="`https://image.tmdb.org/t/p/original/${store.activeMovieLogo}`" alt="" class="movie_logo mb-4"
                style="width: 420px; max-height:200px;" v-if="store.activeMovieLogo">

            <p class="title" v-else>
                {{ store.activeMovie.title ? store.activeMovie.title : store.activeMovie.name }}
            </p>
            <div class="flex items-center gap-3">
                <img :src="store.convertFlag(store.activeMovie.original_language)" alt="" style="width: 50px;">
                <div class="review">
                    {{ store.roundHalveNumber(store.activeMovie.vote_average) }}
                    <i class="fa-solid fa-star text-yellow-400" v-for="index in store.starsNumber" :key="index"></i>
                    <i class="fa-solid fa-star-half-stroke text-yellow-400" v-for="index in store.starsHalf"
                        :key="index"></i>
                    <i class="fa-regular fa-star" v-for="index in store.emptyStars" :key="index"></i>
                    ({{ store.activeMovie.vote_count }})
                </div>
                <span v-if="store.activeMovieProvidersLogos.length > 0" class="prov-list">
                    <img :src="`https://image.tmdb.org/t/p/original/${logo}`" alt=""
                        v-for="(logo, index) in store.activeMovieProvidersLogos" :key="index">
                </span>
                <span v-else class="prov-list"> <img src="../assets/img/pirate_logo.jpg" alt=""></span>
            </div>
            <div>
                <p class="num_info">
                    {{ store.activeMovieDeatils?.release_date ? store.activeMovieDeatils.release_date.split("-")[0] :
                        store.activeMovie.first_air_date.split("-")[0] }} |
                    {{ store.activeMovieDeatils.runtime ? convertDuration(store.activeMovieDeatils.runtime) :
                        `${store.activeMovieDeatils.number_of_seasons} seasons (${store.activeMovieDeatils.status})` }}
                </p>



            </div>
            <p class="description">
                {{ store.activeMovie.overview }}
            </p>

            <div class="additiona_info">
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
            </div>




            <div class="buttons">
                <button @click="() => { trailerWatch = !trailerWatch }">
                    <i :class="!trailerWatch ? 'fa-solid fa-play' : 'fa-solid fa-xmark'"></i>
                    {{ !trailerWatch ? 'watch trailer' : 'close trailer' }}
                </button>
                <i class="fa-solid"
                    :class="{ 'fa-eye-slash': !isMovieInWatchlist, 'fa-eye': isMovieInWatchlist, 'text-white': !isMovieInWatchlist, 'text-red-600': isMovieInWatchlist }"
                    @click="addToWatchlist"></i>
                <i class="fa-solid"
                    :class="{ 'fa-heart-circle-minus': !isMovieInFavlist, 'fa-heart-circle-check': isMovieInFavlist, 'text-white': !isMovieInFavlist, 'text-red-600': isMovieInFavlist }"
                    @click="addToFavlist"></i>

            </div>

        </div>
        <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${store.previewID}?autoplay=1`"
            v-if="trailerWatch" allowfullscreen>
        </iframe>




    </figure>
    <figure id="homeBG" v-else>
        <div>
            <p>
                Stop wasting time watching terrible stuff
            </p>

            <img src="../assets/img/logo.png" alt="" style="width: 70%;">
        </div>
    </figure>
</template>

<script>
import { store } from "../store"
import axios from 'axios'
export default {
    data() {
        return {
            store,
            trailerWatch: false,

        }
    },
    methods: {
        convertDuration(minutes) {
            var hours = Math.floor(minutes / 60);
            var remainingMinutes = minutes % 60;
            return hours + "h " + remainingMinutes + "m";
        },
        convertGenreId(id) {
            let genreName = ''
            console.log(store.allGenres)
            store.allGenres.forEach((genre) => {
                if (genre.id === id) {
                    genreName = genre.name
                    console.log(genre.name)
                }
            })
            return genreName
        },
        addToWatchlist() {
            const existingIndex = store.watchList.findIndex(existingMovie => existingMovie.id === store.activeMovie.id);
            if (existingIndex === -1) {
                store.watchList.push(store.deepClone(store.activeMovie));
            } else {
                store.watchList.splice(existingIndex, 1);
            }
            localStorage.setItem('watchlist', JSON.stringify(store.watchList));

            console.log(store.watchList);
        },
        addToFavlist() {
            const existingIndex = store.favList.findIndex(existingMovie => existingMovie.id === store.activeMovie.id);
            if (existingIndex === -1) {
                store.favList.push(store.deepClone(store.activeMovie));
            } else {
                store.favList.splice(existingIndex, 1);
            }
            localStorage.setItem('favlist', JSON.stringify(store.favList));

            console.log(store.favList);
        }


    },
    computed: {
        isMovieInWatchlist() {
            return store.watchList.some(existingMovie => existingMovie.id === store.activeMovie.id);
        },
        isMovieInFavlist() {
            return store.favList.some(existingMovie => existingMovie.id === store.activeMovie.id);
        }
    }

}
</script>

<style lang="scss" scoped>
figure {
    height: 73vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    position: relative;


    .num_info {
        display: flex;
        align-items: center;
        line-height: 15px;
    }

    .movie-info {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        width: fit-content;
        max-width: 30%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        // height: 90%;
        position: absolute;
        left: 8%;
        bottom: 50%;
        transform: translateY(50%);
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

        .prov-list {
            display: flex;
            gap: 0.5em;

            img {
                width: 35px;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            gap: 1em;
            margin-top: 10px;

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

            i {
                font-size: 1.8em;
                cursor: pointer;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
    }

}
</style>