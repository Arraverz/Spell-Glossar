export const state = () => ({
  windowWidth: 0,
  theme: 'default',
  pageTitle: 'Home - ME Overview',
  isVerticalNavMenuActive: true,
  mainLayoutType: 'vertical',
  verticalNavMenuWidth: 'default',
  scrollY: 0,
  bodyOverlay: false
})

export const mutations = {
  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  toggleVerticalNavMenu(state) {
    state.isVerticalNavMenuActive = !state.isVerticalNavMenuActive
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width
  },
  UPDATE_WINDOW_SCROLL_Y(state, val) {
    state.scrollY = val
  },
  UPDATE_PAGE_TITLE(state, val) {
    state.pageTitle = val
  },
  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val
  }
}

export const actions = {
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },
  changePageTitle({ commit }, name) {
    commit('UPDATE_PAGE_TITLE', name)
  },
  async nuxtServerInit(store, context) {}
}
