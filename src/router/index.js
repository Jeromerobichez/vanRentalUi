import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvailableVehiclesForRent from '../views/AvailableVehiclesForRent.vue'
import VehiclesPresentation from '../views/VehiclesPresentation.vue'
import AdministrationHome from '../views/Admin/AdministrationHome.vue'
import AdminClients from '../views/Admin/AdminClients.vue'
import AdminRentals from '../views/Admin/AdminRentals.vue'
import AdminVehicles from '../views/Admin/AdminVehicles.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/vehicules-disponibles',
            name: 'AvailableVehiclesForRent',
            component: AvailableVehiclesForRent
        },
        {
            path: '/nos-vehicules',
            name: 'VehiclesPresentation',
            component: VehiclesPresentation,
        },
        {
            path: '/administration',
            name: 'AdministrationHome',
            component: AdministrationHome
        },
        {
            path: '/administration/clients',
            name: 'AdminClients',
            component: AdminClients
        },
        {
            path: '/administration/reservations',
            name: 'AdminRentals',
            component: AdminRentals
        },
        {
            path: '/administration/vehicules',
            name: 'AdminVehicles',
            component: AdminVehicles
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
