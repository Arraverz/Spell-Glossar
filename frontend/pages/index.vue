<template>
  <div>
    <div class="w-full flex justify-between mb-5">
      <vs-input
        class="w-4/12"
        style="min-width: 250px"
        icon="search"
        placeholder="Search"
        v-model="keyword"
      />
      <nuxt-link to="spells/new">
        <vs-button radius color="success" type="filled" icon="add"></vs-button>
      </nuxt-link>
    </div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="flex-end"> </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        v-for="spell in spells"
        :key="spell.id"
        class="w-6/12 mb-5 xl:w-4/12 xxl:w-3/12"
      >
        <sg-spell-card :max-height="600" :spell="spell"></sg-spell-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col>
        <vs-pagination :total="pages" v-model="page"></vs-pagination>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  layout: 'glossar',
  // middleware: 'auth',
  meta: {},
  data() {
    return {
      spells: [],
      limit: 8,
      page: 1,
      count: 8,
      keyword: '',
      keywordTimeout: null,
      loading: true,
    }
  },
  watch: {
    page: function () {
      if (this.loading) return
      let newQuery = { ...this.$route.query, page: this.page }
      this.$router.replace({ query: newQuery }).then(() => {
        this.fetchSpells()
      })
    },
    keyword: function () {
      clearTimeout(this.keywordTimeout)
      setTimeout(() => {
        this.page = 1
        this.fetchSpells()
      }, 300)
    },
  },
  computed: {
    pages() {
      return this.count % this.limit == 0
        ? this.count / this.limit
        : Math.floor(this.count / this.limit) + 1
    },
  },
  mounted() {
    this.$store.dispatch('changePageTitle', 'Spells')
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query.page) {
        this.page = Number.parseInt(this.$route.query.page)
      }
      this.fetchSpells().then(() => {
        this.loading = false
      })
    },
    async fetchSpells() {
      const res = await this.$axios.get(process.env.API + '/spells', {
        params: { limit: this.limit, page: this.page, keyword: this.keyword },
      })

      this.spells = res.data.entries
      this.limit = Number.parseInt(res.data.limit)
      this.page = Number.parseInt(res.data.page)
      this.count = Number.parseInt(res.data.count)
    },
  },
}
</script>

<style lang="scss">
</style>
