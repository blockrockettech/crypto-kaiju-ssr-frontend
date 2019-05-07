# Hello World - Google Cloud Run & Nuxt.js

> My hunky-dory Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


Setup
=====

* NodeJS 10 required due to Nuxt.js compilation bug on node V8
* Follow this - https://cloud.google.com/run/docs/setup

* Install beta tools
```
$ gcloud components install beta
```

* Build docker image - https://cloud.google.com/run/docs/building/containers
```
 gcloud builds submit --tag gcr.io/cryptokaiju-beta/dapp
```

* Create new service un gCloud mangement console - e.g. https://console.cloud.google.com/run

* Add new service
	* Once Docker image deployed
	* Add new service from Docker image URL
	* Deploy!


gcl0ud Login
============

* `gcloud init` and login/auth

* make new configuration 
    * `gcloud config configurations create cryptokaiju-beta`
    
* set configuration 
    * `gcloud config configurations activate cryptokaiju-beta`


* You can view and change the properties of your active configuration using the following commands:

```
$ gcloud config list
$ gcloud config set
```

* `gcloud config configurations list`

* URL generated typically like this: `gcr.io/cryptokaiju-beta/dapp`

* Make two local gcloud configs pointing to the right projects on gcloud
    * `cryptokaiju-beta`
    * `cryptokaiju-live`
