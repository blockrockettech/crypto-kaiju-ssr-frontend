import Vue from 'vue';
import Web3 from 'web3';

Vue.filter('toEth', function (value) {
  if (!value) return '';
  return Web3.utils.fromWei(value.toString(10), 'ether').valueOf();
});

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('uppercase', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
});
