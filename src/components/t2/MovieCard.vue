<template>
    <div class="card" @click="updateActive(movie)">
        <figure>
            <img :src="movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : 'https://www.desktopbackground.org/p/2010/09/05/75431_movies-generic-film-home-theater-backdrops-wallpapers_1920x1080_h.jpg'"
                alt="">
            <p> {{ movie.title ? movie.title : movie.name }} </p>
            <div class="card-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
                    <path
                        d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                </svg>
            </div>

        </figure>



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
            store.foundMovies = []
            store.updateStars()
            store.getTrailer(store.activeMovie.id, store.activeMovie.media_type)
            store.getDetails(store.activeMovie.id, store.activeMovie.media_type)
            store.getCast(store.activeMovie.id, store.activeMovie.media_type)
            store.getImages(store.activeMovie.id, store.activeMovie.media_type)
            store.getProviders(store.activeMovie.id, store.activeMovie.media_type)
            store.getRec(store.activeMovie.id, store.activeMovie.media_type)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';

div.card {
    width: calc((100% - 4 * 30px) / 5);
    flex-shrink: 0;
    cursor: pointer;

    figure {
        position: relative;

        &:hover .card-hover {
            display: flex;
        }
    }

    p {
        text-align: center;
        margin-top: 0.2em;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        padding: 5px;
    }

    .card-hover {
        @include hover-div;
        @include center-flex;
        background-color: rgba(0, 0, 0, 0.4);
        display: none;

        svg {
            width: 55px;
        }
    }
}
</style>