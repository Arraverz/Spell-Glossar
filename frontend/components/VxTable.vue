<template>
  <div
    :class="[{ stripe: stripe, hoverFlat: hoverFlat }, `vs-table-${color}`]"
    class="vs-component vs-con-table"
  >
    <!-- header -->
    <header class="header-table vs-table--header">
      <slot name="header"></slot>
      <div v-if="search" class="con-input-search vs-table--search">
        <input
          v-model="searchx"
          class="input-search vs-table--search-input"
          type="text"
          @input="awaitingSearch = true"
        />
        <vs-icon icon="search"></vs-icon>
      </div>
    </header>
    <div class="con-tablex vs-table--content">
      <div :style="styleConTbody" class="vs-con-tbody vs-table--tbody ">
        <table ref="table" class="vs-table vs-table--tbody-table">
          <thead ref="thead" class="vs-table--thead">
            <tr>
              <th v-if="multiple || hasExpadableData" class="td-check">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox
                    :key="isCheckedLine ? 'remove' : 'check'"
                    :icon="isCheckedLine ? 'remove' : 'check'"
                    :checked="isCheckedMultiple"
                    size="small"
                    @click="changeCheckedMultiple"
                  />
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
          </thead>
          <slot :data="datax"></slot>
        </table>
      </div>
      <div v-if="isNoData" class="not-data-table vs-table--not-data">
        {{ noDataText }}
      </div>

      <div v-if="pagination" class="con-pagination-table vs-table--pagination">
        <vs-pagination
          ref="pagination"
          v-model="currentx"
          :total="searchx && !sst ? getTotalPagesSearch : getTotalPages"
          :size-array="queriedResults.length"
          :max-items="maxItemsx"
          :max="paginationMax"
          :description="description"
          :description-items="descriptionItems"
          @changeMaxItems="changeMaxItems"
        ></vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VxTable',
  props: {
    value: {},
    color: {
      default: 'primary',
      type: String
    },
    noDataText: {
      default: 'No data Available',
      type: String
    },
    stripe: {
      default: false,
      type: Boolean
    },
    hoverFlat: {
      default: false,
      type: Boolean
    },
    maxHeight: {
      default: 'auto',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    data: {
      default: null
    },
    notSpacer: {
      default: false,
      type: Boolean
    },
    search: {
      default: false,
      type: Boolean
    },
    maxItems: {
      default: 5,
      type: [Number, String]
    },
    pagination: {
      default: false,
      type: Boolean
    },
    description: {
      default: false,
      type: Boolean
    },
    descriptionItems: {
      default: () => [],
      type: Array
    },
    currentPage: {
      default: 1,
      type: Number | String
    },
    sst: {
      default: false,
      type: Boolean
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    headerWidth: '100%',
    trs: [],
    datax: [],
    searchx: '',
    currentx: 1,
    maxItemsx: 5,
    hasExpadableData: false,
    currentSortKey: null,
    currentSortType: null,
    awaitingSearch: false
  }),
  computed: {
    paginationMax() {
      const x =
        this.searchx && !this.sst
          ? this.getTotalPagesSearch
          : this.getTotalPages
      if (x > 5 && x < 10) {
        return 5
      } else {
        return 9
      }
    },
    getTotalPages() {
      return Math.ceil(this.total / this.maxItemsx)
    },
    getTotalPagesSearch() {
      return Math.ceil(this.total / this.maxItems)
    },
    queriedResults() {
      const queriedResults = this.data
      return queriedResults
    },
    isNoData() {
      if (typeof this.datax === Object) {
        return this.datax
          ? Object.keys(this.datax).length == 0
          : false && this.search
      } else {
        return this.datax ? this.datax.length == 0 : false && this.search
      }
    },
    isCheckedLine() {
      const lengthx = this.data.length
      const lengthSelected = this.value.length
      return lengthx !== lengthSelected
    },
    isCheckedMultiple() {
      return this.value.length > 0
    },
    styleConTbody() {
      return {
        maxHeight: this.maxHeight,
        overflow: this.maxHeight != 'auto' ? 'auto' : null
      }
    },
    getThs() {
      const ths = this.$slots.thead.filter((item) => item.tag)
      return ths.length
    },
    tableHeaderStyle() {
      return {
        width: this.headerWidth
      }
    }
  },
  watch: {
    currentPage() {
      this.currentx = this.currentPage
    },
    currentx() {
      if (this.sst) {
        this.$emit('change-page', this.currentx)
      } else {
        this.loadData()
      }
    },
    maxItems(val) {
      this.maxItemsx = val
      this.loadData()
    },
    maxItemsx() {
      this.loadData()
    },
    data() {
      this.loadData()
      this.$nextTick(() => {
        if (this.datax.length > 0) {
          this.changeTdsWidth()
        }
      })
    },
    searchx() {
      if (this.sst) {
        setTimeout(() => {
          this.awaitingSearch = false
        }, 1000)
      } else {
        this.loadData()
        this.currentx = 1
      }
    },
    awaitingSearch() {
      if (this.searchx == null) {
        this.$emit('search', this.searchx)
      } else if (this.searchx.length > 2 || this.searchx.length == 0)
        this.$emit('search', this.searchx)
    }
  },
  mounted() {
    window.addEventListener('resize', this.listenerChangeWidth)
    this.maxItemsx = this.maxItems
    this.loadData()

    // this.$nextTick(() => {
    //   if(this.datax.length > 0) {
    //     this.changeTdsWidth()
    //   }
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.listenerChangeWidth)
  },
  methods: {
    loadData() {
      const max = Math.ceil(this.currentx * this.maxItemsx)
      const min = max - this.maxItemsx
      this.datax = this.pagination
        ? this.getItems(min, max)
        : this.sortItems(this.data) || []
    },
    getItems(min, max) {
      const dataBase = this.sortItems(this.data)
      return dataBase
    },
    sortItems(data) {
      const { currentSortKey, currentSortType } = this
      function compare(a, b) {
        if (a[currentSortKey] < b[currentSortKey])
          return currentSortType == 'desc' ? 1 : -1
        if (a[currentSortKey] > b[currentSortKey])
          return currentSortType == 'desc' ? -1 : 1
        return 0
      }
      return currentSortType !== null ? [...data].sort(compare) : [...data]
    },
    getItemsSearch(pagination = false, min, max) {
      const search = this.normalize(this.searchx)

      return this.sortItems(this.data)
        .filter((tr) => {
          return this.normalize(this.getValues(tr).toString()).includes(search)
        })
        .filter((_, index) => {
          return index >= min && index < max
        })
    },
    sort(key, sortType) {
      this.currentSortKey = key
      this.currentSortType = sortType
      if (this.sst) {
        this.$emit('sort', key, sortType)
        return
      }
      this.loadData()
    },
    normalize(string) {
      return string
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .toLowerCase()
    },
    getValues: function getValues(obj) {
      function flattenDeep(val) {
        return Object.values(val || []).reduce(
          (acc, val) =>
            typeof val === 'object'
              ? acc.concat(flattenDeep(val))
              : acc.concat(val),
          []
        )
      }

      return flattenDeep(obj).filter(function(item) {
        return typeof item === 'string' || typeof item === 'number'
      })
    },
    changeCheckedMultiple() {
      const lengthx = this.data.length
      const lengthSelected = this.value.length
      const selectedx = lengthx - lengthSelected
      if (selectedx == 0) {
        this.$emit('input', [])
      } else {
        this.$emit('input', this.data)
      }
    },
    clicktr(tr, isTr) {
      if (this.multiple && isTr) {
        const val = this.value.slice(0)
        if (val.includes(tr)) {
          val.splice(val.indexOf(tr), 1)
        } else {
          val.push(tr)
        }

        this.$emit('input', val)
        this.$emit('selected', tr)
      } else if (isTr) {
        this.$emit('input', tr)
        this.$emit('selected', tr)
      }
    },
    dblclicktr(tr, isTr) {
      if (isTr) {
        this.$emit('dblSelection', tr)
      }
    },
    listenerChangeWidth() {
      this.headerWidth = `${this.$refs.table.offsetWidth}px`
      this.changeTdsWidth()
    },
    changeTdsWidth() {
      if (!this.value) return

      const tbody = this.$refs.table.querySelector('tbody')

      // Adding condition removes querySelector none error - if tbody isnot present
      if (tbody) {
        const trvs = tbody.querySelector('.tr-values')
        if (trvs === undefined || trvs === null) return
        const tds = trvs.querySelectorAll('.td')

        const tdsx = []

        tds.forEach((td, index) => {
          tdsx.push({ index, widthx: td.offsetWidth })
        })

        const colgrouptable = this.$refs.colgrouptable
        if (colgrouptable !== undefined && colgrouptable !== null) {
          const colsTable = colgrouptable.querySelectorAll('.col')
          colsTable.forEach((col, index) => {
            col.setAttribute('width', tdsx[index].widthx)
          })
        }
      }
    },
    changeMaxItems(index) {
      this.maxItemsx = this.descriptionItems[index]
    }
  }
}
</script>
