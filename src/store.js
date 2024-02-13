import { reactive } from 'vue'

export const store = reactive({
    searchString: '',
    foundMovies: [{}],
    bgUrl: 'https://w0.peakpx.com/wallpaper/739/144/HD-wallpaper-cillian-murphy-in-oppenheimer-movie.jpg',
    loading: false,
    apiKey: import.meta.env.API_KEY,
})