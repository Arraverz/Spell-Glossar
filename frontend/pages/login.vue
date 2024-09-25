<template>
  <div id="page-login" class="grid place-items-center h-screen">
    <div
      class="
        vx-col
        sm:w-11/12
        md:w-8/12
        lg:w-2/4
        xl:w-4/12
        xxl:w-3/12
        sm:m-0
        m-4
      "
    >
      <vs-card>
        <div slot="header">
          <h3>Login</h3>
        </div>
        <div>
          <vs-input
            v-model="username"
            name="username"
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Benutzername"
            class="w-full"
            @keyup.enter="login"
          />

          <vs-input
            v-model="password"
            type="password"
            name="password"
            icon-no-border
            icon="icon icon-lock"
            icon-pack="feather"
            label-placeholder="Passwort"
            class="w-full mt-6 mb-6"
            @keyup.enter="login"
          />
          <vs-button
            class="w-full"
            type="gradient"
            color="primary"
            @click="login"
            >Login</vs-button
          >
          <div class="mt-3">
            Don't have an account?
            <nuxt-link to="register" class="link"> Sign up</nuxt-link>
          </div>
        </div>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'default',
  meta: {},
  data() {
    return {
      username: '',
      password: '',
      logging_in: false,
    }
  },
  mounted() {},
  created() {
    if (this.$auth.$state.loggedIn) {
      this.$router.replace({ name: 'index' })
    }
  },
  methods: {
    async login() {
      if (this.logging_in) return

      this.logging_in = true
      await this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Fehler',
            text:
              'Es ist ein Fehler beim Login aufgetreten: ' +
              err.request.responseText,
            color: 'danger',
          })
        })
      this.logging_in = false
      if (this.$auth.$state.loggedIn) {
        this.$router.replace({ name: 'index' })
      }
    },
  },
}
</script>

<style lang="scss">

</style>
