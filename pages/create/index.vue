<template>
    <div class="container">
        <h1>Kaiju Birthing Station</h1>

        <div class="row mt-5">
            <div class="col ml-3 mr-3">

                <p>
                    <nuxt-link :to="{ name: 'create-classic'}" class="btn btn-primary w-25">
                        Birth Classic
                    </nuxt-link>
                    <span class="text-muted">I want to see the classic 🐲</span>
                </p>

                <p>
                    <nuxt-link :to="{ name: 'create-kitty'}" class="btn btn-outline-primary w-25">
                        Birth Kitty
                    </nuxt-link>
                    <span class="text-muted">Generate me some pussy 🐱</span>
                </p>

            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';

    export default {
        layout: 'default',
        name: 'creator',
        computed: {
            ...mapState(['account'])
        },
        mounted() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>

</style>
