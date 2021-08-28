<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'no-scroll': isAppPage, 'admin-background': adminBackground }
    ]"
  >
    <v-nav-menu
      v-if="navMenuItems"
      :nav-menu-items="navMenuItems"
      parent=".layout--main"
      :title="$store.state.pageTitle"
    />
    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />

      <the-navbar-vertical
        :navbar-color="navbarColor"
        :title="$store.state.pageTitle"
      />

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div class="content-area__content">
                <transition :name="routerTransition" mode="out-in">
                  <nuxt
                    keep-alive
                    :keep-alive-props="{
                      max: 5,
                      include: ['page-customer-id', 'page-transferred']
                    }"
                    @setAppClasses="
                      (classesStr) => $emit('setAppClasses', classesStr)
                    "
                  />
                </transition>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeConfig from '../themeConfig'
import routes from '../routes'
import TheNavbarVertical from '~/components/navbar/TheNavbarVertical.vue'
import VNavMenu from '~/components/vertical-nav-menu/VerticalNavMenu.vue'

export default {
  components: {
    VNavMenu,
    TheNavbarVertical
  },
  data() {
    return {
      navbarType: 'floating',
      navbarColor: '#ffffff',
      hideScrollToTop: themeConfig.hideScrollToTop,
      footerType: themeConfig.footerType || 'static',
      routerTransition: themeConfig.routerTransition || 'none',
      navMenuItems: null
    }
  },
  computed: {
    isAppPage() {
      return this.$route.meta.no_scroll
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay
    },
    contentAreaClass() {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default')
          return 'content-area-reduced'
        else if (this.verticalNavMenuWidth === 'reduced')
          return 'content-area-lg'
        else return 'content-area-full'
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else return 'content-area-full'
    },
    navbarClasses() {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
    adminBackground() {
      return this.$store.state.adminBackground
    }
  },
  watch: {
    '$store.state.mainLayoutType'(val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    },
    '$store.state.windowWidth'() {
      this.setNavMenuVisibility(this.$store.state.mainLayoutType)
    }
  },
  created() {
    this.$nextTick(() => {
      this.setNavMenuVisibility(this.$store.state.mainLayoutType)
      this.navMenuItems = routes
    })
  },
  methods: {
    setNavMenuVisibility(layoutType) {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'default')
      }
    }
  }
}
</script>
<style lang="scss"></style>
