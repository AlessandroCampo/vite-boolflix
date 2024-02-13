import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({
    searchString: '',
    foundMovies: [{}],
    activeMovie: {},
    bgUrl: '',
    loading: false,
    apiKey: import.meta.env.API_KEY,
    previewID: '',
    getTrailer(id) {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}`).then((res) => {
            console.log(res.data.results)
            res.data.results.forEach(res => {
                console.log(res)
                if (res.type === "Teaser" && res.official && res.site === "YouTube") {
                    this.previewID = res.key
                    console.log("found")
                    return
                }
            })

        });
    }
})