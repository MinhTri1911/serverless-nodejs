import Vue from 'vue'
// the component
import { library } from '@fortawesome/fontawesome-svg-core'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fa)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

