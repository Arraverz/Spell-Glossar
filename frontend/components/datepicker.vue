<template lang="html">
  <div class="vs-component vs-con-input-label vs-input">
      <label class="vs-input--label">{{ label }}</label>
      <vue-pikaday class="vs-inputx vs-input--input normal" v-model="value" :options="options" />
  </div>
</template>

<script>
export default {
  name: 'datepicker',
  props: {
    label: { required: true },
    value: { required: true },
    options: { required: true }
  },
  data() {
    return {}
  }
}
</script>
