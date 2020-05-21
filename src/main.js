import Vue from 'vue';
import App from './App.vue';

//css 
import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


//Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ProgressSpinner', ProgressSpinner);
Vue.component('Dropdown', Dropdown);
Vue.component('InputNumber', InputNumber);
Vue.component('Button', Button);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
