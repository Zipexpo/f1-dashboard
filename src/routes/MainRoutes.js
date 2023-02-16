import { lazy } from 'react';

// project imports
import DashboardLayout from '../containers/DashboardLayout';
import Loadable from '../components/Loadable';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));
const About = Loadable(lazy(() => import('../views/about')));


const MainRoutes = {
    path: '/',
    element: <DashboardLayout/>,
    children: [
        {
            path: '',
            element: (
                <DashboardDefault/>
            )
        },
        {
            path: 'about',
            element: (
                <About/>
            )
        }
    ]
};

export default MainRoutes;