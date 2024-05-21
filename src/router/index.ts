import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Authentification/login.vue'),
    },
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
          path: '/identificar-productos',
          name: 'Identificar Articulo',
          component: () => import('../pages/Articulos/identifyProduct.vue'),
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },

        {
          path: '/agregar-productos',
          name: 'Agregar Articulo',
          component: () => import('../pages/Articulos/addProducts.vue'),
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
        {
          path: '/eliminar-productos',
          name: 'Eliminar Articulo',
          component: () => import('../pages/Articulos/deleteProducts.vue'),
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
        /*{
          path: '/editar-productos',
          name: 'Editar Articulo',
          component: () => import('../pages/Articulos/editProducts.vue'),
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },*/
        {
          path: '/usuarios',
          name: 'Usuarios',
          component: () => import('../pages/Users/usersPage.vue'), // Lazy load route component,
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
        {
          path: '/proveedores',
          name: 'Proveedores',
          component: () => import('../pages/Users/suppliersPage.vue'), // Lazy load route component,
          meta: {
            authorizedRoles: ['Administrador'],
          },
        },
      ],
    },
  ],
});

export default router;
