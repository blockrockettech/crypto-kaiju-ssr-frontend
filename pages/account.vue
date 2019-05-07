<template>
  <div class="container">

    <h2>My Kaijus <span class="badge badge-primary">{{accountKaijus.length}}</span></h2>
    <p>
      <clickable-address :eth-address="account"></clickable-address>
    </p>
    accountKaijus = {{accountKaijus}}
    account = {{account}}

    <div class="row mt-5" v-if="!accountKaijus || accountKaijus.length === 0">
      <div class="col text-center">
        <code>You don't own any kaijus yet...</code>
        <br/>
        <a href="https://cryptokaiju.io/shop/" target="_blank" class="btn btn-primary btn-lg mt-5">Buy now</a>
      </div>
    </div>

    <div class="row text-center mt-5" v-else>
      <div class="card-deck">
        <div class="mb-5" v-for="card in accountKaijus" :key="card.nfcId">
          <card :cdata="card" class="m-2"></card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import * as actions from '~/store/actions';
  import ClickableTransaction from '~/components/ClickableTransaction';
  import ClickableAddress from '~/components/ClickableAddress';
  import Card from '~/components/Card';

  export default {
    layout: 'default',
    name: 'account',
    components: {Card, ClickableTransaction, ClickableAddress},
    computed: {
      ...mapState(['account', 'accountKaijus', 'transfers'])
    },
    created() {

      const loadData = () => {
        this.$store.dispatch(actions.LOAD_ACCOUNT_KAIJUS, {account: this.$store.state.account});
      };

      this.$store.watch(
        () => this.$store.state.account,
        () => loadData()
      );

      if (this.$store.state.account) {
        loadData();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
