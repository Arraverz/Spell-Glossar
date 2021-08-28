import Vue from 'vue'
import Vuesax from 'vuesax'
import themeConfig from '~/themeConfig'

const colors = {
  primary: '#7367F0',
  success: '#28C76F',
  danger: '#EA5455',
  warning: '#FF9F43',
  dark: '#1E1E1E'
}

Vue.use(Vuesax, { server: true, theme: { colors }, rtl: themeConfig.rtl })
