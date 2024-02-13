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
                <input type="text" v-model="store.searchString">
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
            store.foundMovies = []
            console.log("clicked")
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${store.apiKey}&query=${store.searchString}`).then((res) => {
                // console.log(res.data.title);
                // console.log(res.data.original_title);
                // console.log(res.data.original_language);
                // console.log(res.data.vote_average);
                store.foundMovies = res.data.results
                console.log(store.foundMovies)
                store.foundMovies.forEach((movie) => {
                    if (movie.popularity > 2) {
                        console.log(movie.title);
                        console.log(movie.original_title);
                        console.log(movie.original_language);
                        console.log(movie.vote_average);
                    }

                })
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