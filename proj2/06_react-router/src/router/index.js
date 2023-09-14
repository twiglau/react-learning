import Home from '../pages/home'
import About, { AboutContact, AboutCulture, AboutHistory, AboutJoin } from '../pages/about'
const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/about",
        component: About,
        routes: [
            {
                path: "/about",
                exact: true,
                component: AboutHistory
            },
            {
                path: "/about/culture",
                component: AboutCulture
            },
            {
                path: "/about/contact",
                component: AboutContact
            },
            {
                path: "/about/join",
                component: AboutJoin
            }
        ]
    }
]

export default routes