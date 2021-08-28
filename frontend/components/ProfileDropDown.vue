<template>
  <div v-if="$auth.user" class="the-navbar__user-meta flex items-center">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ $auth.user.name }}</p>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          v-if="$auth.user.name"
          key="onlineImg"
          src="/dummy.jpg"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  name: 'ProfileDropDown',
  data() {
    return {}
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
