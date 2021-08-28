<template>
  <div class="spell-card">
    <main :style="mainStyles">
      <div ref="parchment" class="parchment" :style="parchmentStyles"></div>
      <div ref="contain" class="contain">
        <div class="actions">
          <feather-icon
            icon="HeartIcon"
            style="cursor: pointer"
            :svgClasses="favouriteClasses"
            @click="toggleFavourite"
          ></feather-icon>
        </div>
        <p class="inkTitle">{{ spell.name }}</p>
        <p class="inkSubtitle">
          {{ levelString }}
        </p>

        <sg-school-symbol
          class="labarum"
          width="15%"
          :school="spell.school"
        ></sg-school-symbol>

        <p class="main-text">
          {{ spell.effect }}
        </p>
        
        <div class="signature mt-3 mb-1">
          {{ spell.system }}<br />
          {{ spell.book }}
        </div>
      </div>
    </main>

    <svg class="spell-svg">
      <filter :id="'wavy' + spell.id">
        <feturbulence
          x="0"
          y="0"
          baseFrequency="0.02"
          numOctaves="5"
          :seed="spell.id"
        ></feturbulence>
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
      type: Number,
      default: 600,
    },
    fullDetail: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      resizeTimeout: null,
      favourite: false,
    }
  },
  mounted() {
    this.$store.dispatch('changePageTitle', 'Home')
    window.addEventListener('resize', () => {
      this.scrollHeight()
      this.resizeTimeout = null
      this.resizeTimeout = setTimeout(this.scrollHeight, 500)
    })

    this.$nextTick(() => {
      this.scrollHeight()
      this.resizeTimeout = setTimeout(this.scrollHeight, 500)
    })
  },
  computed: {
    favouriteClasses() {
      return this.favourite ? 'filled text-red' : ''
    },
    mainStyles() {
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
          string += this.camelCaseToWords(cClass) + ' ' + classLevel
        }
      }
      return string
    },
  },
  methods: {
    scrollHeight() {
      const content = this.$refs.parchment
      const container = this.$refs.contain
      // SVG feTurbulence can modify all others elements, that's why "parchment" is in absolute position.
      // so for a better effect, absolute height is defined by his content.
      if (container.offsetHeight > this.maxHeight) {
        content.style.height = this.maxHeight - 10 + 'px'
      } else {
        content.style.height = container.offsetHeight - 10 + 'px'
      }
    },
    toggleFavourite() {
      this.favourite = !this.favourite
    },
    camelCaseToWords(text) {
      const result = text.replace(/([A-Z])/g, ' $1')
      const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
      return finalResult
    },
  },
}
</script>

<style>
.filled {
  fill: currentColor;
}
</style>
