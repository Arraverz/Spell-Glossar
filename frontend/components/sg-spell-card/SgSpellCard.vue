<template>
  <div :class="getSpellCardClasses()">
    <main :style="mainStyles">
      <div ref="parchment" class="parchment" :style="parchmentStyles"></div>
      <div ref="contain" class="contain">
        <div class="actions pt-2 px-1">
          <feather-icon
            icon="HeartIcon"
            class="cursor-pointer mr-1"
            :svgClasses="favouriteClasses"
            @click="toggleFavourite"
          ></feather-icon>
          <feather-icon
            icon="EditIcon"
            class="cursor-pointer mr-1"
            @click="goToEditPage"
          ></feather-icon>
          <vs-icon
            v-if="!fullDetail"
            size="24px"
            class="cursor-pointer mr-1"
            icon="zoom_out_map"
            @click="goToDetailPage"
          />
        </div>
        <p class="inkTitle font-effect-fire-animation">{{ spell.name }}</p>
        <p class="inkSubtitle">
          {{ levelString }}
        </p>

        <sg-school-symbol
          class="labarum"
          width="15%"
          :school="spell.school"
        ></sg-school-symbol>
        <div v-if="fullDetail" class="attributes mb-4">
          <vs-row vs-type="flex" vs-justify="space-evenly">
            <vs-col vs-w="4"><b>Range:</b> {{ spell.range }}</vs-col>
            <vs-col vs-w="4"><b>Cast Time:</b> {{ spell.castTime }}</vs-col>
          </vs-row>
          <vs-row vs-type="flex" vs-justify="space-evenly">
            <vs-col vs-w="4"><b>Duration:</b> {{ spell.duration }}</vs-col>
            <vs-col vs-w="4"><b>Components:</b> {{ spell.components }}</vs-col>
          </vs-row>
        </div>
        <div class="ql-snow" >
          <p :class="getMainTextClasses()" v-html="spell.effect"></p>
        </div>

        <div class="signature mt-3 mb-1">
          {{ spell.system }}<br />
          {{ spell.book }}
        </div>
      </div>
    </main>

    <svg class="spell-svg">
      <filter :id="'wavy' + spell.id">
        <!-- writing feTurbulence as feturbulence causes the filter to fail when coming to the page from a different page in the SPA -->
        <feTurbulence
          x="0"
          y="0"
          baseFrequency="0.02"
          numOctaves="5"
          :seed="spell.id"
        />
        <feDisplacementMap in="SourceGraphic" scale="20" />
      </filter>
    </svg>
  </div>
</template>

<script>
import SgSchoolSymbol from '../sg-school-symbol/SgSchoolSymbol.vue'
export default {
  components: { SgSchoolSymbol },
  name: 'sg-spell-card',
  props: {
    spell: {
      type: Object,
      required: true,
    },
    maxHeight: {
      type: Number | Boolean,
      default: 600,
    },
    fullDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      resizeTimeout: null,
      favourite: false,
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener('resize', () => {
        this.scrollHeight()
        this.resizeTimeout = null
        this.resizeTimeout = setTimeout(this.scrollHeight, 500)
      })

      this.scrollHeight()
      this.resizeTimeout = setTimeout(this.scrollHeight, 500)
    }
  },
  computed: {
    favouriteClasses() {
      return this.favourite ? 'filled text-red' : ''
    },
    mainStyles() {
      if (!this.maxHeight) return {}

      return {
        maxHeight: this.maxHeight + 'px',
        overflow: 'hidden',
      }
    },
    parchmentStyles() {
      return {
        filter: 'url(#wavy' + this.spell.id + ')',
      }
    },
    levelString() {
      const level = this.spell.level
      if (!level || typeof level !== 'object') return ''

      let string = ''
      for (const cClass in level) {
        if (Object.hasOwnProperty.call(level, cClass)) {
          const classLevel = level[cClass]
          if (string.length !== 0) {
            string += ', '
          }
          string += cClass + ' ' + classLevel
        }
      }
      return string
    },
  },
  methods: {
    scrollHeight() {
      const content = this.$refs.parchment
      const container = this.$refs.contain
      if (!content || !container) return
      // SVG feTurbulence can modify all others elements, that's why "parchment" is in absolute position.
      // so for a better effect, absolute height is defined by his content.

      if (!this.maxHeight || container.offsetHeight <= this.maxHeight) {
        content.style.height = container.offsetHeight - 10 + 'px'
      } else {
        content.style.height = this.maxHeight - 10 + 'px'
      }
    },
    setMainTextLineLimit() {
      //TODO: at the very least need to remove the line limit if there is no max height
    },
    getMainTextClasses() {
      let classes = 'main-text ql-editor py-0'
      if (!this.fullDetail) {
        classes += ' no-images clamp'
      }
      return classes
    },
    getSpellCardClasses() {
      let classes = 'spell-card'
      if (!this.fullDetail) {
        classes += ' with-hover-grow'
      }
      return classes
    },
    toggleFavourite() {
      this.favourite = !this.favourite
    },
    camelCaseToWords(text) {
      const result = text.replace(/([A-Z])/g, ' $1')
      const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
      return finalResult
    },
    goToDetailPage() {
      this.$router.push({
        name: 'spells-spell',
        params: { spell: this.spell.id },
      })
    },
    goToEditPage() {
      this.$router.push({
        name: 'spells-spell-edit',
        params: { spell: this.spell.id },
      })
    },
  },
}
</script>

<style>
.filled {
  fill: currentColor;
}
</style>
<style lang="scss" >
@import '@/assets/scss/parchment.scss';
</style>
