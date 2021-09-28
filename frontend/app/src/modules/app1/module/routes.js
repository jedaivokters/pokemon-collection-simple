import pagesRoutes from './../pages/pagesRoutes'
import Dashboard from "../../app1/layouts/dashboard.vue";

export default [
  // Dashboard
	{  path: ``, name:'dashboard', component: Dashboard, children: pagesRoutes}
];
