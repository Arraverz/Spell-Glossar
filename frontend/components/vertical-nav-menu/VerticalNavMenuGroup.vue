<!-- =========================================================================================
	File Name: VerticalNavMenuGroup.vue
	Description: Vertical NavMenu Group Component. Extends vuesax framework's 'vs-sidebar-group' component
	Component Name: VerticalNavMenuGroup
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="vs-sidebar-group"
    :class="[
      { 'vs-sidebar-group-open': openItems },
      { 'vs-sidebar-group-active': open },
      { 'disabled-item pointer-events-none': group.isDisabled },
    ]"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <!-- Group Label -->
    <div @click="clickGroup" class="group-header w-full">
      <span class="flex items-center w-full">
        <!-- Group Icon -->
        <template
          v-if="group.icon || this.groupIndex > Math.floor(this.groupIndex)"
        >
          <feather-icon
            v-if="group.iconpack == 'feather-icons'"
            class="mr-2"
            :icon="group.icon || 'CircleIcon'"
            :svgClasses="{ 'w-3 h-3': this.groupIndex % 1 != 0 }"
          />
          <span v-if="group.iconpack == 'metro-icons'" :class="'mr-2 mif-2x mif-' + group.icon"></span>
          <vs-icon v-if="group.iconpack == 'material-icons'" class="mr-2" size="24px" :icon-pack="group.iconpack" :color="group.isDisabled ? '#c0c0c0': null" :icon="group.icon" />
        </template>

        <!-- Group Name -->
        <span class="truncate mr-3 select-none">{{ group.name }}</span>

        <!-- Group Tag -->
        <vs-chip
          class="ml-auto mr-4"
          :color="group.tagColor"
          v-if="group.tag"
          >{{ group.tag }}</vs-chip
        >
      </span>

      <!-- Group Collapse Icon -->
      <feather-icon
        :class="[{ rotate90: openItems }, 'feather-grp-header-arrow']"
        :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
        svg-classes="w-4 h-4"
      />

      <!-- Group Tooltip -->
      <span class="vs-sidebar--tooltip">{{ group.name }}</span>
    </div>
    <!-- /Group Label -->

    <!-- Group Items -->
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.submenu" :key="index">
        <!-- If item is group -->
        <v-nav-menu-group
          v-if="groupItem.submenu.length"
          :group="groupItem"
          :groupIndex="Number(`${groupIndex}.${index + 1}`)"
          :open="isGroupActive(groupItem)"
          :openHover="openHover"
        />

        <!-- Else: Item -->
        <v-nav-menu-item
          v-else
          icon-small
          :index="groupIndex + '.' + index"
          :to="groupItem.url"
          :href="groupItem.url"
          :icon="'CircleIcon'"
          :iconPack="'feather-icons'"
          :slug="groupItem.slug"
          :isDisabled="groupItem.isDisabled"
          :target="groupItem.target"
        >
          <span class="truncate">{{ groupItem.name }}</span>
          <vs-chip
            class="ml-auto"
            :color="groupItem.tagColor"
            v-if="groupItem.tag"
            >{{ groupItem.tag }}</vs-chip
          >
        </v-nav-menu-item>
      </li>
    </ul>
    <!-- /Group Items -->
  </div>
</template>


<script>
import VNavMenuItem from '~/components/vertical-nav-menu/VerticalNavMenuItem.vue'

export default {
  name: 'v-nav-menu-group',
  props: {
    openHover: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    group: { type: Object },
    groupIndex: { type: Number },
  },
  components: {
    VNavMenuItem,
  },
  data: () => ({
    maxHeight: '0px',
    openItems: false,
  }),
  computed: {
    styleItems() {
      return { maxHeight: this.maxHeight }
    },
    itemIcon() {
      return (index) => {
        let item = this.group.submenu[index]
        if (item.icon) {
          return item.icon
        }
        return 'CircleIcon'
        console.log(
          index,
          index.match(/\./g),
          index.match(/\./g) || [],
          (index.match(/\./g) || []).length > 1,
          !((index.match(/\./g) || []).length > 1)
        )
        if (!((index.match(/\./g) || []).length > 1)) return 'CircleIcon'
      }
    },
    isGroupActive() {
      return (item) => {
        const path = this.$route.fullPath
        let open = false
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined

        let func = (item) => {
          if (item.submenu.length) {
            item.submenu.forEach((item) => {
              if ((path == item.url || routeParent == item.slug) && item.url) {
                open = true
              } else if (item.submenu.length) {
                func(item)
              }
            })
          }
        }

        func(item)
        return open
      }
    },
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    $route() {
      let scrollHeight = this.scrollHeight

      // Collapse Group
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = `${0}px`
        }, 50)

        // Expand Group
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
        }, 300)
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != '0px'
    },
  },
  methods: {
    clickGroup() {
      if (!this.openHover) {
        if (this.$refs.items) {
          let thisScrollHeight = this.$refs.items.scrollHeight

          if (this.maxHeight == '0px') {
            this.maxHeight = `${thisScrollHeight}px`
            setTimeout(() => {
              this.maxHeight = 'none'
            }, 300)
          } else {
            this.maxHeight = `${thisScrollHeight}px`
            setTimeout(() => {
              this.maxHeight = `${0}px`
            }, 50)
          }

          this.$parent.$children.map((child) => {
            if (child.isGroupActive) {
              if (child !== this && !child.open && child.maxHeight != '0px') {
                setTimeout(() => {
                  child.maxHeight = `${0}px`
                }, 50)
              }
            }
          })
        } else {
          setTimeout(this.clickGroup(), 100)
        }
      }
    },
    mouseover() {
      if (this.openHover) {
        if (this.$refs.items) {
          let scrollHeight = this.$refs.items.scrollHeight
          this.maxHeight = `${scrollHeight}px`
        } else {
          setTimeout(this.mouseover(), 100)
        }
      }
    },
    mouseout() {
      if (this.openHover) {
        let scrollHeight = 0
        this.maxHeight = `${scrollHeight}px`
      }
    },
  },
  mounted() {
    this.openItems = this.open
    if (this.open) {
      this.maxHeight = 'none'
    }
  },
}
</script>


<style lang="scss">
@import '~/assets/scss/vuexy/components/verticalNavMenuGroup.scss';
</style>
