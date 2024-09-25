/*
  https://github.com/nuxt-community/auth-module/issues/139#issuecomment-394192447
*/
export default function({ $axios, app, redirect }) {
  $axios.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      const code = parseInt(error.response && error.response.status)

      if ([401].includes(code)) {
        if (error.config.url.includes('api/login')) {
          return Promise.reject(error)
        }

        if (error.config.url.includes('api/logout')) {
          app.$auth.reset()
          return redirect('/login')
        }

        return app.$auth.logout()
      }
      console.log(error);
      return Promise.reject(error)
    }
  )
}
