import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'userLayout',
      component: () => import('../layout/layout.vue'), // Lazy load route component,
      children: [
        {
          path: '/inventario',
          name: 'Inventario',
          component: () => import('../pages/Inventory/inventoryPage.vue'), // Lazy load route component,
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
        {
          path: '/usuarios',
          name: 'Usuarios',
          component: () => import('../pages/Users/usersPage.vue'), // Lazy load route component,
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
      ],
    },
  ],
});

export default router;
