const routes = [
  {
    path: "/login",
    component: () => import("layouts/auth.vue"),
    children: [
      {
        path: "/login",
        component: () => import("src/pages/Login.vue"),
        name: "login",
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("src/pages/PageHome.vue"),
        name: "home",
        meta: { requiresAuth: true },
      },

      {
        path: "/category",
        component: () => import("src/pages/Category.vue"),
        name: "category",
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
