import React from "react";

let resource_manager = localStorage.getItem('resource_manager') || null;
let user_role = localStorage.getItem("user_role") || null;
console.log([user_role],"routenavigation")
// Authentication
const Login = React.lazy(() => import("./views/pages/authentication/login/Login"));
const forgotPassword = React.lazy(() => import("./views/pages/authentication/ForgotPassword"));
const NonAuthorized = React.lazy(() => import("./views/pages/notauthorized/NotAuthorized"));

// Dashboard
const FDCDashboard = React.lazy(() => import("./views/pages/dashboard/FDCDashboard"));
const UserProfile = React.lazy(() => import("./views/pages/user-profile/ChangePassword"));

// Servers/Docs
const ServerView = React.lazy(() => import("./views/pages/servers/ServerView"));
const Inventory = React.lazy(() => import("./views/pages/inventory/InventoryView"));
const Search = React.lazy(() => import("./views/pages/search/Search"));
const DocsLocationView = React.lazy(() => import("./views/pages/docs-location/DocsLocationView"));
const Kbase = React.lazy(() => import("./views/pages/k-base/KbaseView"));
const WebfinderShopping = React.lazy(() => import("./views/pages/webfinder-shopping/WebfinderShoppingView"));
const IpwatchShipment = React.lazy(() => import("./views/pages/ipwatch-shipments/IpwatchShipmentView"));
const DocsDocumentation = React.lazy(() => import("./views/pages/docs-documentation/index"));

// CRM Tools
const PetersmithTickets = React.lazy(() => import("./views/pages/petersmith-tickets/PetersmithTicketsView"));
const PetersmithOrderManager = React.lazy(() => import("./views/pages/petersmith-orders/PetersmithOrdersView"));
const PetersmithCRMSearch = React.lazy(() => import("./views/pages/petersmith-crm/PetersmithCrmView"));
const PetersmithPasswordGenerator = React.lazy(() => import("./views/pages/petersmith-password/PetersmitPasswordView"));

//  Network Tools
const IpwatchSearch = React.lazy(() => import("./views/pages/ipwatch-search/IpwatchView"));
const IpwatchNullRoute = React.lazy(() => import("./views/pages/ipwatch-nullroutes/IpwatchNullRoutesView"));

//  Audit/Stats
const PetersmithCpanel = React.lazy(() => import("./views/pages/petersmith-cpanel/PetersmithCpanel"));
const QuarantineDevices = React.lazy(() => import("./views/pages/quarantine-devices/QuarantineDeviceView"));
const VpsStatistics = React.lazy(() => import("./views/pages/vps-statistics/statisticsView"));

// Settings
const LocationView = React.lazy(() => import("./views/pages/locations/LocationView"));
const SwitchView = React.lazy(() => import("./views/pages/switches/SwitchView"));
const Pdu = React.lazy(() => import("./views/pages/pdu/PduListView"));
const ServerResources = React.lazy(() => import("./views/pages/server-resources/ResourcesView"));
const InventoryResources = React.lazy(() => import("./views/pages/inventory-resources/ResourcesView"));
const Pagination = React.lazy(() => import('./views/pages/pagination'));
const PetersmithSettings = React.lazy(() => import("./views/pages/petersmith-settings/PetersmithSettings"));
const UsersView = React.lazy(() => import("./views/pages/users-list/UsersView"));
const UserLogins = React.lazy(() => import("./views/pages/userLogins"));
const UserConfigs = React.lazy(() => import("./views/pages/UserConfigs"));



const publicRoutes = [
    {
        id: "login",
        title: "Login",
        type: "public",
        navLink: "/",
        component: Login,
        fullLayout: true
    },
    {
        id: "forgot-passowrd",
        title: "Forgot Password",
        type: "public",
        navLink: "/forgot-password",
        component: forgotPassword,
        fullLayout: true
    },
    {
        id: "non-authorized",
        title: "Non Authorized",
        type: "public",
        navLink: "/not-authorized",
        component: NonAuthorized,
        fullLayout: true
    },
]


const privateRoutes = [
    {
        id: "dashboard",
        title: "Dashboard",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/dashboard",
        component: FDCDashboard
    },
    {
        id: "userProfile",
        title: "User Profile",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/docs/settings/change-password",
        component: UserProfile
    },
    {
        id: "servers",
        title: "Servers",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/docs/servers",
        component: ServerView
    },
    {
        id: "inventory",
        title: "Inventory",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/docs/inventory",
        component: Inventory
    },
    {
        id: "search",
        title: "Search",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/docs/search",
        component: Search
    },
    {
        id: "locations",
        title: "Summary",
        type: "private",
        permissions: ["Admin"],
        navLink: "/docs/settings/locations",
        component: DocsLocationView
    },
    {
        id: "kbase",
        title: "Knowledge Base",
        type: "private",
        permissions: ["Admin","Support","Manager"],
        navLink: "/docs/kbase",
        component: Kbase
    },
    {
        id: "shopping_list",
        title: "Shopping List",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/webfinder/shopping-list",
        component: WebfinderShopping
    },
    {
        id: "shipments",
        title: "Shipments",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/ipwatch/shipment",
        component: IpwatchShipment
    },
    {
        id: "documentation",
        title: "Documentation",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Remote", "Sales", "Senior Sales"],
        navLink: "/docs/documentation",
        component: DocsDocumentation
    },
    {
        id: "tickets",
        title: "Tickets",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/pts/tickets",
        component: PetersmithTickets
    },
    {
        id: "order_manager",
        title: "Order Manager",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/pts/order_manager",
        component: PetersmithOrderManager
    },
    {
        id: "crm_search",
        title: "CRM Search",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/pts/crm_search",
        component: PetersmithCRMSearch
    },
    {
        id: "password_generator",
        title: "Gen Passwords",
        type: "private",
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales"],
        navLink: "/pts/password-generator",
        component: PetersmithPasswordGenerator
    },
    {
        id: "arp_search",
        title: "ARP Search",
        type: "private",
        permissions: ["Admin", "Support", "Manager"],
        navLink: "/ipwatch/search",
        component: IpwatchSearch
    },
    {
        id: "null_routes",
        title: "Null Routes",
        type: "private",
        permissions: ["Admin", "Support", "Manager"],
        navLink: "/ipwatch/null-routes",
        component: IpwatchNullRoute
    },
    {
        id: "cpanel",
        title: "Cpanel Audit",
        type: "private",
        permissions: ["Admin", "Manager","Sales"],
        navLink: "/pts/cpanel",
        component: PetersmithCpanel
    },
    {
        id: "quarantine_devices",
        title: "Quarantined Devices",
        type: "private",
        permissions: ["Admin", "Manager"],
        navLink: "/quarantine/devices",
        component: QuarantineDevices
    },
    {
        id: "vps_statistics",
        title: "VPS Statistics",
        type: "private",
        permissions: ["Admin", "Manager"],
        navLink: "/vps/statistics",
        component: VpsStatistics
    },
    {
        id: "locations",
        title: "Locations",
        type: "private",
        permissions: ["Admin", "Manager"],
        navLink: "/settings/locations",
        component: LocationView
    },
    {
        id: "switches",
        title: "Switches",
        type: "private",
        permissions: ["Admin"],
        navLink: "/docs/settings/switches",
        component: SwitchView
    },
    {
        id: "pdu",
        title: "PDUs",
        type: "private",
        permissions: ["Admin"],
        navLink: "/docs/settings/pdu",
        component: Pdu
    },
    {
        id: "server-resources",
        title: "Servers",
        type: "private",
        permissions: ["Admin", "Manager"],
        navLink: "/docs/resources/server-resources",
        component: ServerResources
    },
    {
        id: "inventory-resources",
        title: "Inventory",
        type: "private",
        permissions: ["Admin", "Manager", resource_manager == 1 ? user_role : ""],
        navLink: "/docs/resources/inventory-resources",
        component: InventoryResources
    },
    {
        id: "pts-settings",
        title: "CRM Tools",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/pts/settings",
        component: PetersmithSettings
    },
    {
        id: "users",
        title: "Users",
        type: "private",
        permissions: ["Admin"],
        navLink: "/settings/users",
        component: UsersView
    },
    {
        id: "logins",
        title: "Login Log",
        type: "private",
        permissions: ["Admin"],
        navLink: "/settings/logins",
        component: UserLogins
    },
    {
        id: "configs",
        title: "Network Tools",
        type: "private",
        permissions: ["Admin"],
        navLink: "/settings/configs",
        component: UserConfigs
    },
    {
        id: "pagination",
        title: "Pagination",
        type: "private",
        permissions: ["Admin", "Support", "Manager", "Sales"],
        navLink: "/settings/pagination",
        component: Pagination
    },
]

const allRoutes = [...publicRoutes, ...privateRoutes];

export { allRoutes, publicRoutes, privateRoutes };
