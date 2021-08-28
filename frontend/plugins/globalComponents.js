/* =========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
import Vue from 'vue'

import vuescroll from 'vuescroll/dist/vuescroll-native'
import vSelect from 'vue-select'
import vueJsonCompare from '../components/vue-json-compare/jsonCompare.vue'
import VxCard from '../components/vx-card/VxCard.vue'
import VxList from '../components/vx-list/VxList.vue'
import VxListLinks from '../components/vx-list-links/VxListLinks.vue'
import VxBreadcrumb from '../components/VxBreadcrumb.vue'
import VxTooltip from '../components/vx-tooltip/VxTooltip.vue'
import VxInputGroup from '../components/vx-input-group/VxInputGroup.vue'
import VxTable from '../components/VxTable'
import FeatherIcon from '../components/FeatherIcon.vue'
import datepicker from '../components/datepicker'
import VsSelectIconItem from '../components/vs-select/vs-select-icon-item.vue'
import SgSpellCard from '../components/sg-spell-card/SgSpellCard'
import SgSchoolSymbol from '../components/sg-school-symbol/SgSchoolSymbol'

Vue.use(vuescroll)
Vue.component('JsonCompare', vueJsonCompare)
Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(VxListLinks.name, VxListLinks)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(VxInputGroup.name, VxInputGroup)
Vue.component(VxTable.name, VxTable)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(datepicker.name, datepicker)
Vue.component(VsSelectIconItem.name, VsSelectIconItem)
Vue.component(SgSpellCard.name, SgSpellCard)
Vue.component(SgSchoolSymbol.name, SgSchoolSymbol)





// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: (createElement) =>
      createElement('feather-icon', {
        props: {
          icon: 'XIcon',
          svgClasses: 'w-4 h-4 mt-1'
        }
      })
  },
  OpenIndicator: {
    render: (createElement) =>
      createElement('feather-icon', {
        props: {
          icon: 'ChevronDownIcon',
          svgClasses: 'w-5 h-5'
        }
      })
  }
})

Vue.component('VSelect', vSelect)


