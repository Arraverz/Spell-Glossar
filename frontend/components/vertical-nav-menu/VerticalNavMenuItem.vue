<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="vs-sidebar--item"
    :class="[
      { 'vs-sidebar-item-active': activeLink },
      { 'disabled-item pointer-events-none': isDisabled }
    ]"
  >
    <router-link
      v-if="to"
      tabindex="-1"
      exact
      :class="[{ 'router-link-active': activeLink }]"
      :to="to"
      :target="target"
    >
      <feather-icon
        v-if="iconPack == 'feather-icons'"
        class="mr-2"
        :class="{ 'w-3 h-3': iconSmall }"
        :icon="icon"
      />
      <span
        v-if="iconPack == 'metro-icons'"
        :class="'mr-2 mif-2x mif-' + icon"
      ></span>
      <vs-icon
        v-if="iconPack == 'material-icons'"
        class="mr-2"
        size="24px"
        :icon-pack="iconPack"
        :color="isDisabled ? '#c0c0c0' : null"
        :icon="icon"
      />
      <slot />
    </router-link>

    <a v-else :target="target" :href="href" tabindex="-1">
      <feather-icon
        v-if="iconPack == 'feather-icons'"
        class="mr-2"
        :class="{ 'w-3 h-3': iconSmall }"
        :icon="icon"
      />
      <span
        v-if="iconPack == 'metro-icons'"
        :class="'mr-2 mif-4x mif-' + icon"
      ></span>
      <vs-icon
        v-if="iconPack == 'material-icons'"
        class="mr-2"
        size="24px"
        :icon-pack="iconPack"
        :color="isDisabled ? '#c0c0c0' : null"
        :icon="icon"
      />
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: 'VNavMenuItem',
  props: {
    icon: { type: String, default: '' },
    iconSmall: { type: Boolean, default: false },
    iconPack: { type: String, default: 'material-icons' },
    href: { type: [String, null], default: '#' },
    to: { type: [String, Object, null], default: null },
    slug: { type: String, default: null },
    index: { type: [String, Number], default: null },
    featherIcon: { type: Boolean, default: true },
    metroIcon: { type: Boolean, default: false },
    target: { type: String, default: '_self' },
    isDisabled: { type: Boolean, default: false }
  },
  computed: {
    activeLink() {
      return !!(
        this.to === this.$route.path ||
        (this.$route.meta.parent === this.slug && this.to)
      )
    }
  }
}
</script>
<style>
.vs-sidebar--item a {
  font-size: 15px;
}

a:visited {
  color: inherit;
}
</style>
