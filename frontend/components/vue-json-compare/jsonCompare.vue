<template>
  <div class="alpaca-compare">
    <div class="alpaca-left">
      <vuejson :oldData="oldData" :newData="oldData"></vuejson>
    </div>
    <div class="alpaca-right">
      <vuejson :oldData="oldData" :newData="newData"></vuejson>
    </div>
  </div>
</template>

<script>
import vuejson from './src/jsonvue'
export default {
  components: {
    vuejson
  },
  props: ['oldData', 'newData']
}
</script>

<style>
.alpaca-compare {
  width: 100%;
}
.alpaca-left {
  width: 50%;
  float: left;
  padding-right: 20px;
}
.alpaca-right {
  width: 50%;
  float: right;
}
/*.alpaca-compare:after {
    content: '';
    display: block;
    clear: both;
  }*/
</style>
