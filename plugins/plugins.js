import Vue from 'vue'
import VueMoment from 'vue-moment/vue-moment'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart});
Vue.use(VueMoment);
