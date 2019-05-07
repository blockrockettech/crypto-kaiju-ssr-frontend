<template>
  <span class="current-network">
    {{ currentNetwork }}
  </span>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'currentNetwork',
    computed: {
      ...mapState(['currentNetwork']),
    },
  };
</script>

<style lang="scss" scoped>
  .current-network {
    font-size: 12px;
  }
</style>
