import Vue from "vue";
import VueRouter from "vue-router";
import AdminHome from "../views/admin/MainPage.vue";
import AdminUsers from "../views/admin/Users.vue";
import AdminSales from "../views/admin/Sales.vue";
import AdminReports from "../views/admin/Reports.vue";
import AdminSettings from "../views/admin/Settings.vue";
import AdminServices from "../views/admin/Services.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    props: true,
    name: "home",
    component: AdminHome,
  },
  {
    path: "/users",
    props: true,
    name: "users",
    component: AdminUsers,
  },
  {
    path: "/sales",
    props: true,
    name: "sales",
    component: AdminSales,
  },
  {
    path: "/services",
    props: true,
    name: "services",
    component: AdminServices,
  },
  {
    path: "/reports",
    props: true,
    name: "reports",
    component: AdminReports,
  },
  {
    path: "/settings",
    props: true,
    name: "settings",
    component: AdminSettings,
  },
  {
    path: "/login",
    props: true,
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(
        /* webpackChunkName: "about" */ "../views/auth/LoginView.vue"
      );
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.VUE_APP_PROJECT_BASE_URL,
});

export default router;
