<template>
    <div class="card">
        <figure>
            <img
                src='https://www.desktopbackground.org/p/2010/09/05/75431_movies-generic-film-home-theater-backdrops-wallpapers_1920x1080_h.jpg'>
        </figure>



    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    name: 'placeholder'

}
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';

div.card {
    width: calc((100% - 4 * 30px) / 5);
    flex-shrink: 0;

    figure {
        position: relative;


        &:hover .card-hover {
            display: flex;
        }

        img {
            filter: blur(5px);
        }
    }
}
</style>