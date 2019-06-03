<template>
    <div class="container">
        <h2>&nbsp;</h2>

        <div class="row" v-if="loading">
            <div class="col col-auto text-center">
                <code>Loading traits ... </code>
            </div>
        </div>

        <div class="row" v-if="!loading">
            <div class="col">
                <h3>Colours</h3>
                <pie-chart :donut="true"
                           :data="traits.colourStats"
                           :colors="['green', 'purple']">
                </pie-chart>
            </div>
            <div class="col">
                <h3>Gender</h3>
                <pie-chart :donut="true"
                           :data="traits.genderStats"
                           :colors="['lightblue', '#fff0f2', 'purple']">
                </pie-chart>
            </div>
        </div>

        <div class="row mt-5" v-if="!loading">
            <div class="col">
                <h3>Class</h3>
                <pie-chart :donut="true"
                           :data="traits.classStats">
                </pie-chart>
            </div>
            <div class="col">
                <h3>Skill</h3>
                <pie-chart :donut="true"
                           :data="traits.skillStats">
                </pie-chart>
            </div>
        </div>

    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import cryptoKaijusApiService from '../servcies/CryptoKaijusApiService';

    export default {
        layout: 'default',
        name: 'traits',
        data() {
            return {
                colours: ['#1f2760', '#ff005c', '#fff0f2', '#707070', ' #040505'],
                traits: {
                    colourStats: [],
                    genderStats: [],
                    classStats: [],
                    skillStats: [],
                },
                loading: false
            };
        },
        components: {},
        computed: {},
        async created() {
            this.loading = true;
            cryptoKaijusApiService.getTokenTraits(1)
                .then((data) => {
                    this.traits = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    };
</script>

<style lang="scss" scoped>

</style>
