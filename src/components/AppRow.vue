<template>
    <h2> {{ rowTitle }} </h2>
    <div class="row-container">
        <i class="fa-solid fa-circle-chevron-left" @click="scroll('left')"></i>
        <div class="row" v-if="store.isLoading">
            <PlaceHolder v-for="count in 5" :key="count"></PlaceHolder>
        </div>

        <div class="row" ref="row" v-else>
            <MovieCard v-for=" (movie, index) in moviesArray" :movie="movie" :key="index"
                v-show="(!research) || (research && checkResearch(movie.media_type))" />
        </div>

        <i class="fa-solid fa-circle-chevron-right" @click="scroll('right')"></i>
    </div>
</template>

<script>

import { store } from '../store'
import MovieCard from './t2/MovieCard.vue'
import PlaceHolder from './t2/PlaceHolder.vue'


export default {
    props: {
        rowTitle: String,
        moviesArray: Array,
        research: Boolean
    },
    data() {
        return {
            store
        }
    },
    components: { MovieCard, PlaceHolder },
    methods: {
        scroll(direction) {
            const row = this.$refs.row
            let amount = (340 * 5) + (30 * 5)
            if (direction === 'left') {
                amount *= -1
            }
            row.scrollTo({
                left: row.scrollLeft + amount,
                behavior: 'smooth'
            });
        },
        checkResearch(media_type) {
            if (store.page === "Home") {
                return true
            } else if (store.page === "Series" && media_type === "tv") {
                return true
            } else if (store.page === "Movies" && media_type === "movie") {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h2 {
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 2.5%;
}




.row-container {
    position: relative;
    margin-top: 1em;
    margin-bottom: 2em;
    padding-inline: 2.5%;

    &:hover i {
        display: block;
    }

    .row {
        width: 100%;
        display: flex;
        gap: 30px;
        overflow-x: hidden;
        overflow-y: auto;
        transition: transform 0.5s ease;
    }
}


i {
    font-size: 30px;
    color: white;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    cursor: pointer;
    z-index: 2;
    display: none;
}

i.fa-circle-chevron-right {
    right: 0.5%;
}

i.fa-circle-chevron-left {
    left: 0.5%;
}
</style>