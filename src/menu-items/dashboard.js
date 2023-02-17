// assets
import { Dashboard as IconDashboard } from 'tabler-icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'data-input',
            title: 'Data Input',
            type: 'item',
            url: '/input',
            icon: icons.IconDashboard,
            breadcrumbs: true
        },
        {
            id: 'viz',
            title: 'Viz',
            type: 'item',
            url: '/viz',
            icon: icons.IconDashboard,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
