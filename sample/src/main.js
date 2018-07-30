import Vue from 'vue'
import App from './App.vue'
import router from './router'
import User from './class/User.js';

Vue.config.productionTip = false

import TopBar from '@/components/TopBar.vue'
import UserBar from '@/components/UserBar.vue'
import RectButtonContainer from '@/components/RectButtonContainer.vue'
import BlockList from '@/components/BlockList.vue'
import PlusButton from '@/components/PlusButton.vue'
import ProductItems from '@/components/ProductItems.vue'
Vue.component('top-bar', TopBar)
Vue.component('user-bar', UserBar)
Vue.component('rect-button-container', RectButtonContainer)
Vue.component('block-list', BlockList)
Vue.component('plus-button', PlusButton)
Vue.component('product-items', ProductItems)
Vue.prototype.$User = new User();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
