<template>
    <div class="container">
        <h1>Kitty Kaiju Foundry</h1>

        <div class="row mt-5 mb-5">
            <div class="col-sm-2 ml-3">
                Kitty ID
            </div>
            <div class="col">
                <input type="text" class="form-control" id="kitty-id-lookup" placeholder="Kitty ID..."
                       v-model="lookupForm.kittyId">
            </div>
            <div class="col">
                <button type="button" class="btn btn-primary" @click="lookupKittyData">
                    Pussy power
                </button>
                <code class="pl-2" v-if="lookupForm.loadingKitty">
                    Powering up pussy ...
                </code>
            </div>
        </div>

        <div class="row" v-if="foundKitty">
            <div class="col-sm-2">
                <img :src="foundKitty.raw_svg" class="img-fluid" style="max-height: 150px;"/>
            </div>
            <div class="col">
                {{foundKitty.name}} <span class="text-muted">{{foundKitty.description}}</span>
            </div>
        </div>

        <hr/>

        <div class="row mt-5">
            <div class="col ml-3 mr-3">
                <form>

                    <div class="form-group row" v-if="formData.errors.length">
                        <div class="col-sm-4">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in formData.errors" :key="error">{{ error }}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="name"
                               class="col-sm-2 col-form-label">
                            Name
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="name"
                                   disabled
                                   v-model="formData.name"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="description"
                               class="col-sm-2 col-form-label">
                            Description
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="description"
                                   disabled
                                   v-model="formData.description"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="colour"
                               class="col-sm-2 col-form-label">
                            Kitty Colour
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="colour"
                                   disabled
                                   v-model="formData.colour"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="batch"
                               class="col-sm-2 col-form-label">
                            Batch
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="batch"
                                   disabled
                                   v-model="formData.batch"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="recipient"
                               class="col-sm-2 col-form-label">
                            Recipient
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="recipient"
                                   v-model="formData.recipient"
                                   placeholder="0x0abc"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="nfcId"
                               class="col-sm-2 col-form-label">
                            NFC ID
                        </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   id="nfcId"
                                   maxlength="32"
                                   v-model="formData.nfcId"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="dob"
                               class="col-sm-2 col-form-label">
                            Birth Date
                        </label>
                        <div class="col-sm-10">
                            <input type="date"
                                   class="form-control"
                                   id="dob"
                                   v-model="formData.dob"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="class"
                               class="col-sm-2 col-form-label">
                            Class
                        </label>
                        <div class="col-sm-10">
                            <select class="form-control"
                                    id="class"
                                    v-model="formData.kclass">
                                <option v-for="kclass in formLookupData.kclass" :value="kclass" :key="kclass">
                                    {{kclass}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="skill"
                               class="col-sm-2 col-form-label">
                            Skill
                        </label>
                        <div class="col-sm-10">
                            <select class="form-control"
                                    id="skill"
                                    v-model="formData.skill">
                                <option v-for="skill in formLookupData.skills" :value="skill" :key="skill">{{skill}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary" @click="birthKitty">Kaiju Birth</button>

                    <div class="row">
                        <div class="col mt-5" v-if="ipfsUpload.hash">
                            <code>IPFS Metadata: <a target="_blank"
                                                    :href="'https://ipfs.infura.io/ipfs/' + ipfsUpload.hash">{{ipfsUpload.hash}}</a></code>
                        </div>
                        <div class="col mt-5" v-if="uploadedKaijusHashs">
                            <clickable-transaction :transaction="uploadedKaijusHashs"></clickable-transaction>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col">
                <pre class="text-muted">{{generateIpfsData}}</pre>
            </div>
            <div class="col">
                TODO output generated SVG
            </div>
        </div>

    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import * as _ from 'lodash';
    import * as moment from 'moment';
    import {kclass, skills} from '~/servcies/comonData';
    import cryptoKaijusApiService from '~/servcies/CryptoKaijusApiService';
    import ipfs from '~/servcies/ipfsService';
    import ClickableTransaction from '~/components/ClickableTransaction';
    import * as actions from '~/store/actions';
    import Web3 from 'web3';

    export default {
        components: {ClickableTransaction},
        layout: 'default',
        name: 'kitty',
        computed: {
            ...mapState(['account']),
            generateIpfsData() {
                return {
                    name: this.formData.name,
                    description: this.formData.description,
                    image: this.formData.image,
                    background_color: this.formData.background_color,
                    attributes: {
                        dob: this.formData.dob,
                        nfc: this.formData.nfcId,
                        colour: this.formData.colour,
                        batch: this.formData.batch,
                        class: _.lowerCase(_.get(this.formData, 'kclass')),
                        skill: _.lowerCase(_.get(this.formData, 'skill')),
                        kitty_id: this.foundKitty.token_id,
                        ...this.foundKitty.attributes
                    },
                    external_uri: 'https://cryptokaiju.io',
                    external_kitty_uri: this.foundKitty.external_kitty_uri,
                };
            }
        },
        data() {
            return {
                lookupForm: {
                    loadingKitty: false,
                    kittyId: 1511406
                },
                foundKitty: {},
                formData: {
                    errors: [],
                    name: null,
                    description: null,
                    recipient: null,
                    background_color: null,
                    batch: 'kitty',
                    nfc: null,
                    colour: null,
                    class: null,
                    skill: null,
                    dob: moment().format('YYYY-MM-DD'),
                },
                formLookupData: {
                    kclass: kclass,
                    skills: skills,
                },
                ipfsUpload: {
                    hash: null
                },
                uploadedKaijusHashs: null
            };
        },
        mounted() {
            
        },
        methods: {
            async lookupKittyData() {
                this.lookupForm.loadingKitty = true;
                const data = await cryptoKaijusApiService.findKittyDataById(this.lookupForm.kittyId);
                this.lookupForm.loadingKitty = false;
                console.log(data);

                const colorprimary = _.find(data.traits, (trait) => trait.trait_type === 'colorprimary');
                const colorsecondary = _.find(data.traits, (trait) => trait.trait_type === 'colorsecondary');
                const colortertiary = _.find(data.traits, (trait) => trait.trait_type === 'colortertiary');
                const generation = _.find(data.traits, (trait) => trait.trait_type === 'generation');
                const pattern = _.find(data.traits, (trait) => trait.trait_type === 'pattern');
                const mouth = _.find(data.traits, (trait) => trait.trait_type === 'mouth');
                const body = _.find(data.traits, (trait) => trait.trait_type === 'body');
                const eyes = _.find(data.traits, (trait) => trait.trait_type === 'eyes');
                const coloreyes = _.find(data.traits, (trait) => trait.trait_type === 'coloreyes');

                this.foundKitty = {
                    ...data,
                    name: data.name,
                    description: data.description,
                    external_kitty_uri: data.external_link,
                    background_color: data.background_color,
                    // FIXME download image and manipulate it
                    raw_svg: `https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${this.lookupForm.kittyId}.svg`,
                    attributes: {
                        colorprimary: colorprimary.value,
                        colorsecondary: colorsecondary.value,
                        colortertiary: colortertiary.value,
                        generation: generation.value,
                        pattern: pattern.value,
                        mouth: mouth.value,
                        body: body.value,
                        eyes: eyes.value,
                        coloreyes: coloreyes.value,
                    }
                };

                // Set form data to found kitty
                this.formData.name = data.name;
                this.formData.description = data.description;
                this.formData.image = this.foundKitty.raw_svg;
                this.formData.background_color = this.foundKitty.background_color;

                this.formData.colour = colorprimary.value;
            },
            birthKitty() {
                this.checkForm();
                if (this.formData.errors.length === 0) {

                    const ipfsData = this.generateIpfsData;
                    const recipient = this.formData.recipient;
                    const nfcId = this.formData.nfcId;

                    const tokenMetaData = JSON.stringify(ipfsData);
                    console.log(`Pushing to IPFS`, tokenMetaData);

                    const buffer = Buffer.from(tokenMetaData);

                    ipfs.add(buffer, {pin: true})
                        .then(function (response) {
                            console.log(response);
                            this.response.ipfsHash = response[0].hash;
                            this.$store.dispatch(actions.BIRTH_KAIJUS, {
                                recipient,
                                nfcId,
                                tokenURI: response[0].hash,
                                ipfsData,
                            });
                        }.bind(this))
                        .catch((error) => console.error(error));
                }
            },
            checkForm() {
                this.formData.errors = [];
                if (!this.formData.name) {
                    this.formData.errors.push('Name is required.');
                }
                if (!this.formData.recipient) {
                    this.formData.errors.push('Recipient is required.');
                } else if (!Web3.utils.isAddress(this.formData.recipient)) {
                    this.formData.errors.push('Recipient not valid address.');
                }
                if (!this.formData.nfcId) {
                    this.formData.errors.push('NFC ID is required.');
                }
                if (!this.formData.description) {
                    this.formData.errors.push('Description is required.');
                }
                if (!this.formData.colour) {
                    this.formData.errors.push('Colour is required.');
                }
                if (!this.formData.dob) {
                    this.formData.errors.push('DOB is required.');
                }
                if (!this.formData.batch) {
                    this.formData.errors.push('Batch is required.');
                }
                if (!this.formData.kclass) {
                    this.formData.errors.push('Class is required.');
                }
                if (!this.formData.skill) {
                    this.formData.errors.push('Skill is required.');
                }
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
