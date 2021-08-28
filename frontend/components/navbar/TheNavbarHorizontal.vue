<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        style="static"
        :color="navbarColor"
      >
        <nuxt-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer mx-auto flex items-center"
        >
          <span class="vx-logo-text text-primary">{{
            $store.state.pageTitle
          }}</span>
        </nuxt-link>

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from '~/components/ProfileDropDown.vue'

export default {
  name: 'TheNavbarHorizontal',
  components: {
    ProfileDropDown
  },
  props: {
    logo: { type: String },
    navbarType: {
      type: String,
      required: true
    },
    title: { type: String, required: true }
  },
  computed: {
    navbarColor() {
      let color = '#fff'
      if (this.navbarType === 'sticky') color = '#f7f7f7'
      else if (this.navbarType === 'static') {
        if (this.scrollY < 50) {
          color = '#f7f7f7'
        }
      }

      color =
        this.isThemedark === 'dark'
          ? color === '#fff'
            ? '#10163a'
            : '#262c49'
          : null

      return color
    },
    isThemedark() {
      return this.$store.state.theme
    },
    navbarStyle() {
      return this.navbarType === 'static'
        ? { transition: 'all .25s ease-in-out' }
        : {}
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === 'static'
        ? null
        : 'd-theme-dark-light-bg shadow-none'
    },
    scrollY() {
      return this.$store.state.scrollY
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  }
}
</script>
