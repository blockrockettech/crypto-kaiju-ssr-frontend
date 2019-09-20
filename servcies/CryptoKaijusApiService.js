const axios = require('axios');

// const API_URL = `http://localhost:5000/cryptokaiju-39233/us-central1/main/api`;
// const API_URL = `https://us-central1-cryptokaiju-39233.cloudfunctions.net/api`;
// const API_URL = `https://dapp.cryptokaiju.io/api`;

const API_CONFIG = {
    local: 'http://localhost:5000/cryptokaiju-39233/us-central1/main/api',
    live: 'https://api.cryptokaiju.io/api'
};

const getApi = () => {
    if (process.browser) {
        switch (window.location.hostname) {
            case '0.0.0.0':
            case 'localhost':
            case '127.0.0.1':
                return API_CONFIG.local;
            default:
                return API_CONFIG.live;
        }
    } else {
        if (process.env.NODE_ENV === 'development') {
            return API_CONFIG.local;
        }
        return API_CONFIG.live;
    }
};

const AXIOS_CONFIG = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

class CryptoKaijusApiService {

    async getTokenDetails(network = 1, tokenId) {
        return axios.get(`${getApi()}/network/${network}/token/id/${tokenId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getNfcDetails(network = 1, nfcId) {
        return axios.get(`${getApi()}/network/${network}/token/nfc/${nfcId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getTokensForAddress(network = 1, address) {
        return axios.get(`${getApi()}/network/${network}/token/account/${address}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getTokenTraits(network = 1) {
        return axios.get(`${getApi()}/network/${network}/token/traits`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getAllTokens(network = 1) {
        return axios.get(`${getApi()}/network/${network}/token/all`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getHomePageDetails(network = 1) {
        return axios.get(`${getApi()}/network/${network}/homepage`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async searchByTokenId(network = 1, tokenId) {
        return axios.get(`${getApi()}/network/${network}/search/id/${tokenId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async searchByNfcId(network = 1, nfcId) {
        return axios.get(`${getApi()}/network/${network}/search/nfc/${nfcId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async getOpenSeaDetials(network = 1, tokenId) {
        return axios.get(`${getApi()}/network/${network}/os/id/${tokenId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async findKittyDataById(kittyId) {
        return axios.get(`${getApi()}/network/1/os/search/kitty-data/${kittyId}`, AXIOS_CONFIG)
            .then((payload) => payload.data);
    }

    async downloadKittyBandana(kittyId) {
        return axios.get(`${getApi()}/image/decorate/kitty/${kittyId}/bandana`, {
            ...AXIOS_CONFIG,
            responseType: 'arraybuffer'
        })
            .then((payload) => payload.data);
    }

    buildBandanaUrl(kittyId) {
        return `${getApi()}/image/decorate/kitty/${kittyId}/bandana`;
    }
}

export default new CryptoKaijusApiService();
