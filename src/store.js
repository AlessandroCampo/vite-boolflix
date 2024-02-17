import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
    searchString: '',
    foundMovies: [{}],
    activeMovie: null,
    activeMovieDeatils: null,
    activeMovieCast: null,
    activeMovieDirectors: [],
    activeMovieLogo: '',
    bgUrl: '',
    page: 'Home',
    loading: false,
    apiKey: import.meta.env.API_KEY,
    allGenres: [],
    genreFilter: 0,
    previewID: '',
    starsNumber: 0,
    starsHalf: 0,
    emptyStars: 0,
    getTrailer(id, media_type) {
        console.log(id)
        if (media_type !== "tv") {
            media_type = "movie"
        }
        this.previewID = ''
        axios.get(`https://api.themoviedb.org/3//${media_type}/${id}/videos?api_key=${this.apiKey}&language=en-US`).then((res) => {

            res.data.results.forEach(res => {
                if ((res.name === "Official Trailer") || (res.type === "Trailer" && res.official && res.site === "YouTube")) {
                    this.previewID = res.key
                    return
                }
            })
            if (!this.previewID) {
                this.previewID = res.data.results[0].key
            }

        });
    },
    getDetails(id, media_type) {
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${this.apiKey}`).then((res) => {
            this.activeMovieDeatils = res.data
        })
    },
    getImages(id, media_type) {
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/images?api_key=${this.apiKey}`).then((res) => {
            console.log(res.data.logos)
            res.data.logos.forEach((logo) => {
                if (logo.iso_639_1 === "en" && logo.height < 500) {
                    this.activeMovieLogo = logo.file_path
                    return
                }
            })
            if (!this.activeMovieLogo) {
                this.activeMovieLogo = res.data.logos[0].file_path
            }

        })
    },
    getCast(id, media_type) {
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${this.apiKey}`).then((res) => {
            this.activeMovieCast = res.data.cast.slice(0, 5)
            this.activeMovieDirectors = []
            console.log(res.data)
            res.data.crew.forEach((member) => {
                if (member.job === "Director") {
                    this.activeMovieDirectors.push(member)
                } else if (member.department === "Writing") {
                    this.activeMovieDirectors.push(member)
                }
            })

        })
    },
    getGenre(media_type) {
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/genre/${media_type}/list?language=en&api_key=${this.apiKey}`).then((res) => {

            res.data.genres.forEach((genre) => {
                this.allGenres.push(genre)
            })
        })
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${this.apiKey}`).then((res) => {

            res.data.genres.forEach((genre) => {
                this.allGenres.push(genre)
            })

        })
    },
    roundHalveNumber(number) {
        let integerPart = Math.floor(number.toFixed(1));
        let decimalPart = number - integerPart;

        if (decimalPart === 0.25) {
            return integerPart + 0.25;
        } else if (decimalPart === 0.75) {
            return integerPart + 0.75;
        } else {
            return Math.round(number) / 2;
        }
    },
    updateStars() {
        store.starsNumber = 0
        store.starsHalf = 0
        store.emptyStars = 0
        store.starsNumber = store.roundHalveNumber(store.activeMovie.vote_average)
        if (store.starsNumber % 1 !== 0) {
            store.starsNumber -= 0.5;
            store.starsHalf = 1;
        }
        store.emptyStars = 5 - store.starsNumber - store.starsHalf
    }
})