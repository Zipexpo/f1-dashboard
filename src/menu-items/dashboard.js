// assets
import { Dashboard as IconDashboard , FileUpload as IconFileUpload,
    ChartDots2 as IconChartDots2} from 'tabler-icons-react';

// constant
const icons = { IconDashboard, IconFileUpload, IconChartDots2 };

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
            icon: icons.IconFileUpload,
            breadcrumbs: true
        },
        {
            id: 'viz',
            title: 'Viz',
            type: 'item',
            url: '/viz',
            icon: icons.IconChartDots2,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
