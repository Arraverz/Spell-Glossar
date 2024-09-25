<template>
  <div class="grid place-items-center h-screen">
    <vs-card style="max-width: 600px">
      <div slot="header">
        <h3>Register</h3>
      </div>
      <div>
        <vs-row class="mb-5">
          <vs-col vs-type="flex" vs-justify="center">
            <vs-input
              class="w-8/12"
              v-model="email"
              type="email"
              placeholder="Email"
              label="Email*"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5">
          <vs-col vs-type="flex" vs-justify="center">
            <vs-input
              class="w-8/12"
              v-model="username"
              type="text"
              placeholder="Username"
              label="Username*"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5">
          <vs-col vs-type="flex" vs-justify="center">
            <vs-input
              class="w-8/12"
              v-model="password"
              type="password"
              placeholder="Password"
              label="Password*"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-3">
          <vs-col vs-type="flex" vs-justify="space-evenly">
            <vs-button type="gradient" color="success" @click="register">
              Register
            </vs-button>
            <nuxt-link to="login">
              <vs-button type="flat" color="primary">Back to login</vs-button>
            </nuxt-link>
          </vs-col>
        </vs-row>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
    }
  },
  methods: {
    async register() {
      if (!this.validate()) return
      this.$axios
        .post(process.env.API + '/register', {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((res) => {})
    },
    validate() {
      if (this.email === '') {
        this.$vs.notify({
          title: 'Email is required',
          text: 'The email field is required.',
          color: 'danger',
        })
        return false
      }
      if (!this.validateEmail(this.email)) {
        this.$vs.notify({
          title: 'Email is invalid',
          text: 'Th entered email address is invalid.',
          color: 'danger',
        })
        return false
      }

      if (this.username === '') {
        this.$vs.notify({
          title: 'Username is required',
          text: 'The username field is required.',
          color: 'danger',
        })
        return false
      }
      if (this.password === '') {
        this.$vs.notify({
          title: 'Password is required',
          text: 'The password field is required.',
          color: 'danger',
        })
        return false
      }

      return true
    },
    validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
  },
}
</script>

<style>
</style>