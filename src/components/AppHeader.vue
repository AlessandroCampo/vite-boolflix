<template>
    <div class="header-container">
        <figure>
            <img src="../assets/img/logo.png" alt="">
        </figure>

        <nav>
            <ul>
                <li class="active" @click="changePage('Home', $event)"> Home </li>
                <li @click="changePage('Series', $event)"> Series </li>
                <li @click="changePage('Movies', $event)"> Movies </li>
                <li v-show="store.page !== 'Personal'">
                    <select v-model="store.genreFilter">
                        <option value=" 0" selected> Any genre </option>
                        <option :value="genre.id" v-for="(genre, index) in store.optimizedGenres" :key="index">
                            {{ genre.name }}
                        </option>
                    </select>
                </li>
            </ul>
        </nav>



        <div class="header-right">
            <div class="searchbar">

                <button @click="getMovies()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input type="text" v-model="store.searchString" @keyup.enter="getMovies()">
            </div>
            <div class="account" @click="changePage('Personal', $event)" @contextmenu="triggerInputFile"
                :style="{ backgroundImage: `url(${profilePicURL})` }">

                <input type="file" @change="onChangeFileUpload" class="hidden" ref="inputFile">
            </div>
        </div>


    </div>
</template>

<script>

import { store } from "../store"
import axios from 'axios';

export default {
    data() {
        return {
            store,
            profilePicURL: JSON.parse(localStorage.getItem('propic')) || '/src/assets/img/propic.jpg'
        }
    },
    methods: {
        getMovies() {
            // reset my array
            store.foundMovies = []
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${store.apiKey}&query=${store.searchString}`).then((res) => {
                store.foundMovies = res.data.results
                store.foundMovies.sort((a, b) => b.vote_count - a.vote_count)

                store.activeMovie = store.foundMovies[0]
                store.getTrailer(store.activeMovie.id, store.activeMovie.media_type)
                store.getDetails(store.activeMovie.id, store.activeMovie.media_type)
                store.getCast(store.activeMovie.id, store.activeMovie.media_type)
                store.getImages(store.activeMovie.id, store.activeMovie.media_type)
                store.getProviders(store.activeMovie.id, store.activeMovie.media_type)
                store.updateStars()
                store.searchString = ''
            });

        },
        changePage(newPage, e) {
            const menuLinks = document.querySelectorAll("header ul li")
            menuLinks.forEach((link) => {

                link.classList.remove("active")
            })
            store.page = newPage

            e.target.classList.add("active")
        },
        async onChangeFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async () => {
                this.profilePicURL = reader.result;
                localStorage.setItem('propic', JSON.stringify(this.profilePicURL));
            };
            reader.readAsDataURL(file);
        },
        triggerInputFile() {

            this.$refs.inputFile.click();

        }
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 95%;
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

            li {
                padding: 12px;
                cursor: pointer;

                select {
                    background-color: transparent;
                    border: 1px solid white;
                    border-radius: 10px;

                    option {
                        background-color: rgba(16, 27, 38, 0.6);
                        margin-right: auto;
                        text-align: center;
                    }
                }
            }

            .active {
                background-color: rgba(99, 109, 120, 0.7);
                border-radius: 10px;
            }
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
            width: 60px;
            height: 60px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            background-size: cover;
            background-position: center;
            border: 1px solid white;

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