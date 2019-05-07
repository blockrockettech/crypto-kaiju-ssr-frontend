const pkg = require('./package');

module.exports = {
    mode: 'universal',

    /*
     Add server config for cloud run
     process.env.PORT is the key
     use host "0.0.0.0" not "localhost" or "127.0.0.1"
    */
    server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        timing: false
    },

    /*
      ** Headers of the page
      */
    head: {
        title: "CryptoKaiju Explorer",

        meta: [
            {
                charset: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, shrink-to-fit=no"
            },
            {
                name: "keywords",
                content: "erc721, ethereum, blockchain, crypto, kaiju"
            },
            {
                hid: 'title',
                name: "title",
                content: "CryptoKaiju dApp - Ethereum Powered Vinyl Kaiju Toys | Non Fungible Sofubi"
            },
            {
                hid: 'description',
                name: "description",
                content: "CryptoKaiju are Adding Even More Fun to Non Fungible Tokens With our Range of Highly Collectible Soft Vinyl Kaiju Toys. Each is Individual & Backed by an ERC-721 Token. Find out More & Shop Online Today"
            },
            {
                hid: 'subject',
                name: "subject",
                content: "CryptoKaiju dApp Explorer"
            },
            {
                name: "robots",
                content: "index,follow"
            },
            {
                hid: 'og:title',
                property: "og:title",
                content: "CryptoKaiju dApp - Ethereum Powered Vinyl Kaiju Toys | Non Fungible Sofubi"
            },
            {
                hid: 'og:description',
                property: "og:description",
                content: "CryptoKaiju are Adding Even More Fun to Non Fungible Tokens With our Range of Highly Collectible Soft Vinyl Kaiju Toys. Each is Individual & Backed by an ERC-721 Token. Find out More & Shop Online Today"
            },
            {
                hid: 'og:url',
                property: "og:url",
                content: "http://dapp.cryptokaiju.io"
            },
            {
                hid: 'twitter:card',
                property: "twitter:card",
                content: "summary_large_image"
            },
            {
                hid: 'twitter:description',
                property: "twitter:description",
                content: "CryptoKaiju are Adding Even More Fun to Non Fungible Tokens With our Range of Highly Collectible Soft Vinyl Kaiju Toys. Each is Individual & Backed by an ERC-721 Token. Find out More & Shop Online Today"
            },
            {
                hid: 'twitter:title',
                property: "twitter:title",
                content: "CryptoKaiju dApp - Ethereum Powered Vinyl Kaiju Toys | Non Fungible Sofubi"
            }
        ],
        link: [
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon-32x32.png"
            },
            {
                rel: "shortcut icon",
                type: "image/x-icon",
                href: "/favicon-32x32.png"
            },
            {
                rel: "stylesheet",
                href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            },
        ]
    },

    /*
     ** Customize the progress bar color
     */
    loading: {
        color: "#3B8070"
    },

    manifest: {
        theme_color: "#3B8070"
    },

    /*
    ** Global CSS
    */
    css: ["~/assets/styles/main.css"],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/plugins.js', ssr: false},
        {src: '~/plugins/filters.js', ssr: false},
        {src: '~/plugins/vue-social-sharing.js', ssr: true},
        // '~/plugins/plugins.js',
        // '~/plugins/filters.js',
        // '~/plugins/vue-social-sharing.js'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt',
        '@nuxtjs/pwa'
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
    ** Build configuration
    */
    build: {

        publicPath: "/assets/",
        cache: true,

        vendor: [
            'vue-social-sharing',
            'vue-moment',
            'vue-chartkick',
            'vuejs-logger',
        ],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        },

    }
};
