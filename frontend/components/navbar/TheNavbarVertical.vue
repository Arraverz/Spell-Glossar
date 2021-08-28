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
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />
        <span class="vx-logo mx-auto flex">
          <span class="vx-logo-text text-primary">{{
            $store.state.pageTitle
          }}</span>
        </span>
        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from '~/components/ProfileDropDown.vue'

export default {
  name: 'TheNavbarVertical',
  components: {
    ProfileDropDown
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff'
        ? '#10163a'
        : this.navbarColor
    },
    verticalNavMenuWidth() {
      return 'default'
    },
    textColor() {
      return {
        'text-black':
          (this.navbarColor !== '#10163a' &&
            this.$store.state.theme === 'dark') ||
          (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')
      }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj() {
      return 'navbar-default'
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit(
        'TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE',
        !this.$store.state.isVerticalNavMenuActive
      )
    }
  }
}
</script>

<style scoped>
.vx-logo.mx-auto {
  margin-left: 0 !important;
}
</style>
