export default ({ app, store }, inject) => {
  app.mounted = () => {
    store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    window.addEventListener('resize', window.handleWindowResize)
    window.addEventListener('scroll', window.handleScroll)
  }

  window.handleWindowResize = function() {
    store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

    // Set --vh property
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  }

  window.handleScroll = function() {
    store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
  }
}
