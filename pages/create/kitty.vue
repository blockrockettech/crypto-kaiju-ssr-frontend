<template>
    <div class="container">
        <h1>Kitty Kaiju Foundry</h1>

        <div class="row mt-5">
            <div class="col ml-3 mr-3">


            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';

    export default {
        layout: 'default',
        name: 'kitty',
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
