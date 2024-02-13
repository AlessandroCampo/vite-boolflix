import { reactive } from 'vue'

export const store = reactive({
    searchString: '',
    loading: false,
    apiKey: import.meta.env.API_KEY
})