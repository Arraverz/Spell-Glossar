<template>
  <div v-if="spell">
    <vs-row vs-type="flex" vs-justify="center">
      <vs-col class="w-full lg:w-8/12">
        <sg-spell-card
          full-detail
          :max-height="false"
          :spell="spell"
        ></sg-spell-card>
      </vs-col>
    </vs-row>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  layout: 'glossar',
  data() {
    return {
      spell: null,
    }
  },
  created() {
    this.$store.dispatch('changePageTitle', 'Spell')
    this.init()
  },
  methods: {
    init() {
      this.$axios
        .get(process.env.API + '/spells/get?id=' + this.$route.params.spell)
        .then((res) => {
          this.spell = res.data
          this.$store.dispatch('changePageTitle', this.spell.name)
        })
    },
  },
}
</script>

<style>
</style>