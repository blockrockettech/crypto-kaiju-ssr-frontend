<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-5">
                <h2>Collectible Vinyl Toys</h2>
                <p><em>Powered by the Ethereum Blockchain</em></p>
                <p class="mt-5" v-if="totalSupply">There are currently <span
                        class="badge badge-primary pl-2 pr-2 ml-2 mr-2">{{ totalSupply }}</span>
                    kaiju in existence</p>
            </div>

            <div class="col-sm-7 mt-5">
                <div class="form-group">
                    <input type="text"
                           class="form-control form-control-lg w-75"
                           id="kId"
                           v-model="searchData.kId"
                           placeholder="Token ID or NFC ID"/>
                </div>
                Search by
                <b-button type="button" variant="primary" class="btn-lg"
                          :disabled="isSearching"
                          @click="searchByNfcId">
                    NFC ID
                </b-button>
                <b-button type="button" variant="primary" class="btn-lg"
                          :disabled="isSearching"
                          @click="searchByTokenId">
                    Token ID
                </b-button>
            </div>
        </div>


        <div class="row text-center mt-5" v-if="searchResult && !isSearching">
            <div class="card-deck">
                <card :cdata="searchResult" class="m-2"></card>
            </div>
        </div>

        <div class="row text-center mt-5" v-if="nonFound">
            <div class="col col-auto text-center">
                <code>No Kaiju found</code>
            </div>
        </div>

        <div class="row text-center mt-5"
             v-if="(selectedKaiju && selectedKaiju.length > 0) && !isSearching && !searchResult">

            <h4>Some of our favourite Kaiju</h4>

            <div class="card-deck">
                <div class="mb-5" v-for="card in selectedKaiju" :key="card.tokenId">
                    <card :cdata="card" class="m-2"></card>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import {mapState} from 'vuex';
    import Card from '../components/Card';
    import cryptoKaijusApiService from '../servcies/CryptoKaijusApiService';

    export default {
        layout: 'default',
        name: 'home',
        components: {Card},
        data() {
            return {
                searchData: {
                    kId: null
                },
                searchResult: null,
                totalTokens: 0,
                isSearching: false,
                nonFound: false
            };
        },
        computed: {
            ...mapState([
                'currentNetworkId'
            ])
        },
        methods: {
            searchByNfcId() {
                this.isSearching = true;
                this.searchResult = null;
                this.nonFound = false;
                cryptoKaijusApiService.searchByNfcId(this.currentNetworkId, this.searchData.kId)
                    .then((kaiju) => {
                        console.log('kaiju', kaiju);
                        this.searchResult = kaiju;
                        if (!kaiju) {
                            this.nonFound = true;
                        }
                    })
                    .finally(() => {
                        this.isSearching = false;
                    });
            },
            searchByTokenId() {
                this.isSearching = true;
                this.searchResult = null;
                this.nonFound = false;
                cryptoKaijusApiService.searchByTokenId(this.currentNetworkId, this.searchData.kId)
                    .then((kaiju) => {
                        console.log('kaiju', kaiju);
                        this.searchResult = kaiju;
                        if (!kaiju) {
                            this.nonFound = true;
                        }
                    })
                    .finally(() => {
                        this.isSearching = false;
                    });
            }
        },
        async asyncData() {
            const {totalSupply, selectedKaiju} = await cryptoKaijusApiService.getHomePageDetails(1);
            return {
                totalSupply,
                selectedKaiju
            };
        },
    };
</script>

<style lang="scss" scoped>

    body > .container {
        padding: 60px 60px 0;
    }

    h1 {
        font-size: 50px;
        color: #ffffff;
        text-align: center;
        font-weight: 700;
        font-style: normal;
    }

    /* mobile only */
    @media screen and (max-width: 767px) {
        .card {
            min-width: 200px;
        }
    }

</style>
