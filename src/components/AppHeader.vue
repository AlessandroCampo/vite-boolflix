<template>
    <div class="header-container">
        <figure>
            <img src="../assets/img/logo.png" alt="">
        </figure>

        <nav>
            <ul>
                <li> Home </li>
                <li> Series </li>
                <li> Movies </li>
            </ul>
        </nav>



        <div class="header-right">
            <div class="searchbar">

                <button @click="getMovies()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input type="text" v-model="store.searchString" @keyup.enter="getMovies()">
            </div>
            <dv class="account">
                A
            </dv>
        </div>


    </div>
</template>

<script>

import { store } from "../store"
import axios from 'axios';

export default {
    data() {
        return {
            store
        }
    },
    methods: {
        getMovies() {
            // reset my array
            store.foundMovies = []
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${store.apiKey}&query=${store.searchString}`).then((res) => {
                store.foundMovies = res.data.results
                store.foundMovies.sort((a, b) => b.popularity - a.popularity)
                store.activeMovie = store.foundMovies[0]
                store.getTrailer(store.activeMovie.id)

            });

        }
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.5em;

    figure {
        flex-basis: 25%;

        img {
            width: 50%;
        }
    }

    nav {
        flex-basis: 50%;
        display: flex;
        justify-content: center;

        ul {
            display: flex;
            gap: 2em;
            font-size: 20px;
        }
    }



    .header-right {

        display: flex;
        align-items: center;
        gap: 2em;
        justify-content: flex-end;
        border: 2px;
        flex-basis: 25%;

        .account {
            background-color: white;
            color: #1a2430;
            width: 50px;
            height: 50px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: circle();
            font-size: 20px;
            font-weight: bold;

        }

        .searchbar {
            display: flex;
            align-items: center;
            gap: 2em;

            button {
                font-size: 25px;
                display: flex;
                align-items: center;
            }

            input {
                background-color: #1a2430;
                border-radius: 10px;
                border: 1px solid white;
                padding-left: 5px;
            }
        }
    }



}
</style>