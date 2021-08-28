<template>
  <div class="parentx">
    <vs-sidebar
      ref="verticalNavMenu"
      v-model="isVerticalNavMenuActive"
      class="v-nav-menu"
      default-index="-1"
      :click-not-close="clickNotClose"
      :parent="parent"
      :hidden-background="true"
    >
      <div slot="header" class="header-sidebar flex items-end justify-between">
        <!-- Logo -->
        <router-link
          v-slot="{ navigate }"
          custom
          class="vx-logo cursor-pointer flex items-center"
          to="/"
        >
          <div role="link" @click="navigate" @keypress.enter="navigate">
            LOGO HERE
          </div>
        </router-link>
        <!-- /Logo -->

        <!-- Menu Buttons -->
        <div v-show="$store.state.windowWidth < 1200">
          <feather-icon
            icon="XIcon"
            class="m-0 cursor-pointer"
            @click="$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)"
          />
        </div>
        <!-- /Menu Toggle Buttons -->
      </div>
      <div>
        <!-- Menu Items -->
        <template v-for="(item, index) in menuItemsUpdated">
          <!-- Group Header -->
          <span
            v-if="item.header"
            :key="`header-${index}`"
            class="navigation-header truncate"
            >{{ item.header }}</span
          >
          <!-- /Group Header -->

          <template v-else-if="!item.header">
            <!-- Nav-Item -->
            <v-nav-menu-item
              v-if="!item.submenu.length"
              :key="`item-${index}`"
              :index="index"
              :to="item.url"
              :href="item.url"
              :icon="item.icon"
              :icon-pack="item.iconPack"
              :target="item.target"
              :is-disabled="item.isDisabled"
              :slug="item.slug"
            >
              <span class="truncate">{{ item.name }}</span>
              <vs-chip
                v-if="item.tag && (isMouseEnter || !reduce)"
                class="ml-auto"
                :color="item.tagColor"
                >{{ item.tag }}</vs-chip
              >
            </v-nav-menu-item>

            <!-- Nav-Group -->
            <template v-else>
              <v-nav-menu-group
                :key="`group-${index}`"
                :open-hover="openGroupHover"
                :group="item"
                :group-index="index"
                :open="isGroupActive(item)"
              />
            </template>
            <!-- /Nav-Group -->
          </template>
        </template>
        <!-- /Menu Items -->
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import VNavMenuGroup from '~/components/vertical-nav-menu/VerticalNavMenuGroup.vue'
import VNavMenuItem from '~/components/vertical-nav-menu/VerticalNavMenuItem.vue'

export default {
  name: 'VNavMenu',
  components: {
    VNavMenuGroup,
    VNavMenuItem
  },
  props: {
    parent: { type: String },
    navMenuItems: { type: Array, required: true },
    openGroupHover: { type: Boolean, default: false },
    title: { type: String }
  },
  data: () => ({
    // clickNotClose: false, // disable close navMenu on outside click
    isMouseEnter: false,
    reduce: false, // determines if navMenu is reduce - component property
    settings: {
      // perfectScrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    showShadowBottom: false
  }),
  computed: {
    clickNotClose() {
      return true
    },
    isAppPage() {
      return this.$route.meta.no_scroll
    },
    isVerticalNavMenuActive: {
      get() {
        return this.$store.state.isVerticalNavMenuActive
      },
      set(val) {
        this.$store.commit(
          'TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE',
          val || !this.$store.state.isVerticalNavMenuActive
        )
      }
    },
    isGroupActive() {
      return (item) => {
        const path = this.$route.fullPath
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined
        let open = false

        const func = (item) => {
          if (item.submenu.length) {
            item.submenu.forEach((item) => {
              if (
                item.url &&
                (path === item.url || routeParent === item.slug)
              ) {
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
    menuItemsUpdated() {
      const clone = this.navMenuItems.slice()

      for (const [index, item] of this.navMenuItems.entries()) {
        if (item.header && item.items.length && (index || 1)) {
          const i = clone.findIndex((ix) => ix.header === item.header)
          for (const [subIndex, subItem] of item.items.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem)
          }
        }
      }

      return clone
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit(
        'TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE',
        !this.$store.state.isVerticalNavMenuActive
      )
    },
    psSectionScroll() {
      this.showShadowBottom = this.$refs.verticalNavMenuPs.$el.scrollTop > 0
    }
  }
}
</script>

<style lang="scss">
.vs-sidebar.vs-sidebar-parent {
  position: fixed;
  z-index: 51000;
}
</style>
