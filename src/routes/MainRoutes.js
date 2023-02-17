import { lazy } from 'react';

// project imports
import DashboardLayout from '../containers/DashboardLayout';
import Loadable from '../components/Loadable';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));
const DataInput = Loadable(lazy(() => import('../views/data-input')));
const Viz = Loadable(lazy(() => import('../views/viz')));
const About = Loadable(lazy(() => import('../views/about')));


const MainRoutes = {
    path: '',
    element: <DashboardLayout/>,
    children: [
        {
            path: '',
            element: (
                <DashboardDefault/>
            ),
        },
        {
            path: 'input',
            element: (
                <DataInput/>
            ),
        },
        {
            path: 'viz',
            element: (
                <Viz/>
            ),
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