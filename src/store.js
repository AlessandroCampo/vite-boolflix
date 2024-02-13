import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
    searchString: '',
    foundMovies: [{}],
    activeMovie: null,
    bgUrl: '',
    loading: false,
    apiKey: import.meta.env.API_KEY,
    previewID: '',
    getTrailer(id) {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}`).then((res) => {
            res.data.results.forEach(res => {
                if (res.type === "Teaser" && res.official && res.site === "YouTube") {
                    this.previewID = res.key
                    return
                }
            })

        });
    }
})