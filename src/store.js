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
    activeMovieProvidersLogos: [],
    activeMovieRec: [],
    chosenForYou: [],
    watchList: JSON.parse(localStorage.getItem('watchlist')) || [],
    favList: JSON.parse(localStorage.getItem('favlist')) || [],
    bgUrl: '',
    page: 'Home',
    lang: localStorage.getItem('lang') || 'it',
    loading: false,
    apiKey: import.meta.env.API_KEY,
    allGenres: [],
    optimizedGenres: [],
    genreFilter: 0,
    previewID: '',
    starsNumber: 0,
    starsHalf: 0,
    emptyStars: 0,
    getTrailer(id, media_type) {

        if (media_type !== "tv") {
            media_type = "movie"
        }
        this.previewID = ''
        axios.get(`https://api.themoviedb.org/3//${media_type}/${id}/videos?api_key=${this.apiKey}&language=${store.lang}`).then((res) => {

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
    isDirectorInArray(name) {
        return this.activeMovieDirectors.some(director => director.name === name);
    },
    getDetails(id, media_type) {
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${this.apiKey}&language=${store.lang}`).then((res) => {
            this.activeMovieDeatils = res.data

        })
    },
    getImages(id, media_type) {
        this.activeMovieLogo = ''
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/images?api_key=${this.apiKey}`).then((res) => {

            res.data.logos.forEach((logo) => {
                if (logo.iso_639_1 === "en" && logo.height < 520) {
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

            res.data.crew.forEach((member) => {
                if ((member.job === "Director" || member.department === "Writing" || member.job === "Executive Producer") && !this.isDirectorInArray(member.name)) {
                    this.activeMovieDirectors.push(member);

                }
            });
            this.activeMovieDirectors.sort((a, b) => {
                if (a.job === "Director" && b.job !== "Director") {
                    return -1;
                } else if (a.job !== "Director" && b.job === "Director") {
                    return 1;
                }
                return 0;
            });
            this.activeMovieDirectors = this.activeMovieDirectors.slice(0, 3);

        })
    },
    getGenre(media_type) {
        this.allGenres = []
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/genre/${media_type}/list?&api_key=${this.apiKey}`).then((res) => {

            res.data.genres.forEach((genre) => {
                this.allGenres.push(genre)
                if (genre.id !== 28 && genre.id !== 10752 && genre.id !== 12 && genre.id !== 878 && genre.name !== "Fantasy" && genre.id !== 53) {
                    this.optimizedGenres.push(genre)
                }

            })
        })
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=${store.lang}&api_key=${this.apiKey}`).then((res) => {

            res.data.genres.forEach((genre) => {
                this.allGenres.push(genre);
                if (!this.optimizedGenres.some(existingGenre => existingGenre.id === genre.id)) {

                    this.optimizedGenres.push(genre)
                }
            })
            console.log(this.optimizedGenres)

            this.optimizedGenres.sort((a, b) => {
                const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1; // Name "a" comes before name "b"
                if (nameA > nameB) return 1; // Name "a" comes after name "b"
                return 0; // Names are equal
            });

        })


    },
    getProviders(id, media_type) {
        this.activeMovieProvidersLogos = []
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${this.apiKey}`).then((res) => {

            res.data.results.IT?.flatrate.forEach((prov) => {
                if (this.activeMovieProvidersLogos.length < 4) {
                    this.activeMovieProvidersLogos.push(prov.logo_path)
                }

            })
        })

        this.activeMovieProvidersLogos = this.activeMovieProvidersLogos.slice(0, 4)

    },
    getRec(id, media_type) {
        this.activeMovieRec = []
        if (media_type !== "tv") {
            media_type = "movie"
        }
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${this.apiKey}&language=${store.lang}`).then((res) => {

            res.data.results.forEach((rec) => {
                this.activeMovieRec.push(rec)
            })

        })

    },
    generateForYou() {
        let favListIdArray = [];
        store.favList.forEach((fav) => {
            let favObj = {
                id: fav.id,
                media_type: fav.media_type
            };
            favListIdArray.push(favObj);
        });
        console.log(store.favList)

        let promises = favListIdArray.map((el) => {
            return axios.get(`https://api.themoviedb.org/3/${el.media_type}/${el.id}/recommendations?api_key=${this.apiKey}&language=${store.lang}`)
                .then((res) => {
                    return res.data.results.slice(0, 5);
                });
        });

        Promise.all(promises)
            .then((recommendationsArray) => {

                let flattenedRecommendations = recommendationsArray.flat();

                let filteredRecommendations = flattenedRecommendations.filter((recommendation) => {
                    return !favListIdArray.some((fav) => fav.id === recommendation.id && fav.media_type === recommendation.media_type);
                });

                let shuffledRecommendations = this.shuffleArray(filteredRecommendations);

                let chosenForYouSet = new Set();
                shuffledRecommendations.forEach((recommendation) => {
                    if (chosenForYouSet.size < 20 && !chosenForYouSet.has(recommendation.id)) {
                        store.chosenForYou.push(recommendation);
                        chosenForYouSet.add(recommendation.id);
                    }
                });
                console.log(store.chosenForYou)

            })
            .catch((error) => {
                console.error("Error fetching recommendations:", error);
            });
    },

    shuffleArray(array) {
        for (let i = array.length - 1;i > 0;i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    ,


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
    },
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    convertFlag(code) {
        if (code === "en") {
            code = "us"
        } else if (code === "ko") {
            code = "kr"
        } else if (code === "ja") {
            code = "jp"
        }
        return `https://flagsapi.com/${code.toUpperCase()}/shiny/64.png`
    }

})