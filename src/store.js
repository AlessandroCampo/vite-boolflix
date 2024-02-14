import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
    searchString: '',
    foundMovies: [{}],
    activeMovie: null,
    bgUrl: '',
    page: 'Home',
    loading: false,
    apiKey: import.meta.env.API_KEY,
    previewID: '',
    starsNumber: 0,
    starsHalf: 0,
    emptyStars: 0,
    getTrailer(id) {
        this.previewID = ''
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}`).then((res) => {
            res.data.results.forEach(res => {
                if (res.type === "Teaser" && res.official && res.site === "YouTube") {
                    console.log(res)
                    this.previewID = res.key
                    return
                }
            })
            if (!this.previewID) {
                this.previewID = res.data.results[0].key
            }

        });
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
    }
})