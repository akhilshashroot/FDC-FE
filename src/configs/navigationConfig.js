import React from "react"
import * as Icon from "react-feather";

let resource_manager = localStorage.getItem('resource_manager') || null;
let user_role = localStorage.getItem("user_role") || null;


const navigationConfig = [
  {
    id: "docs",
    title: "Servers / Docs",
    type: "collapse",
    permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
    icon: <Icon.FileText size={20} />,
    children: [
      {
        id: "servers",
        title: "Servers",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
        navLink: "/docs/servers",
      },
      {
        id: "inventory",
        title: "Inventory",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
        navLink: "/docs/inventory",
      },
      {
        id: "search",
        title: "Search",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
        navLink: "/docs/search",
      },
      {
        id: "locations",
        title: "Summary",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/settings/locations"
      },
      {
        id: "kbase",
        title: "Knowledge Base",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin","Support","Manager"],
        navLink: "/docs/kbase",
      },
      {
        id: "shopping_list",
        title: "Shopping List",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
        navLink: "/webfinder/shopping-list",
      },
      {
        id: "shipments",
        title: "Shipments",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/ipwatch/shipment",
      },
      {
        id: "documentation",
        title: "Documentation",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Remote", "Sales", "Senior Sales"],
        navLink: "/docs/documentation",
      },
      {
        id: "cancel_list",
        title: "Cancel List",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/docs/cancel",
      },
      {
        id: "nonpay",
        title: "Non Pay",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/docs/nonpay",
      },
      {
        id: "active_ip_transit",
        title: "Active IP Transit",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/active_ip_transit",
      },
      {
        id: "canceled_ip_transit",
        title: "Cancelled IP Transit",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/canceled_ip_transit",
      },
      {
        id: "export_ip_transit",
        title: "Export IP Transit",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/export_ip_transit",
      },
      {
        id: "settings_ip_transit",
        title: "Ip Transit Settings",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/settings_ip_transit",
      },
    ]
  },
  {
    id: "ipwatch",
    title: "CRM Tools",
    type: "collapse",
    permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
    icon: <Icon.Eye size={20} />,
    children: [
      {
        id: "tickets",
        title: "Tickets/Orders",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/pts/tickets"
      },
      {
        id: "order_manager",
        title: "Order Manager",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/pts/order_manager"
      },
      {
        id: "crm_search",
        title: "CRM Search",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/pts/crm_search"
      },
      {
        id: "password_generator",
        title: "Gen Passwords",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"],
        navLink: "/pts/password-generator"
      },

    ]
  },
  {
    id: "webfinder",
    title: "Network Tools",
    type: "collapse",
    permissions: ["Admin", "Support", "Manager"],
    icon: <Icon.CheckCircle size={20} />,
    children: [
      {
        id: "search",
        title: "ARP Search",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager"],
        navLink: "/ipwatch/search",
      },
      {
        id: "null_routes",
        title: "Null Routes",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager"],
        navLink: "/ipwatch/null-routes",
      },
    ]
  },

  {
    id: "petersmith",
    title: "Audit / Stats",
    type: "collapse",
    permissions: ["Admin", "Manager", "Senior Sales","Sales"],
    icon: <Icon.Slack size={20} />,
    children: [
      {
        id: "cpanel",
        title: "Cpanel Audit",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager", "Senior Sales","Sales"],
        navLink: "/pts/cpanel"
      },
      {
        id: "quarantine_devices",
        title: "Quarantined Devices",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager", "Senior Sales"],
        navLink: "/quarantine/devices"
      },
      {
        id: "vps_statistics",
        title: "VPS Statistics",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager", "Senior Sales"],
        navLink: "/vps/statistics",
      },
      {
        id: "cdn",
        title: "CDN Billing",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager", "Senior Sales"],
        navLink: "/vps/cdn",
      },
    ]
  },
  {
    id: "main-settings",
    title: "Settings",
    type: "collapse",
    icon: <Icon.Settings size={20} />,
    permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales", resource_manager == 1 ? user_role : " "],
    children: [
      {
        id: "locations",
        title: "Locations",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager"],
        navLink: "/settings/locations"
      },
      {
        id: "switches",
        title: "Switches",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/settings/switches"
      },
      {
        id: "pdu",
        title: "PDUs",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin"],
        navLink: "/docs/settings/pdu"
      },
      {
        id: "server-resources",
        title: "Servers",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager",resource_manager == 1 ? user_role : " "],
        navLink: "/docs/resources/server-resources"
      },
      {
        id: "inventory-resources",
        title: "Inventory",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Manager",resource_manager == 1 ? user_role : " "],
        navLink: "/docs/resources/inventory-resources"
      },
      {
        id: "pts-settings",
        title: "CRM Tools",
        type: "item",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        navLink: "/pts/settings"
      },
      {
        id: "settings",
        title: "FDC Tools",
        type: "collapse",
        icon: <Icon.CornerDownRight size={12} />,
        permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
        children: [
          {
            id: "users",
            title: "Users",
            type: "item",
            icon: <Icon.ChevronRight size={15} />,
            permissions: ["Admin"],
            navLink: "/settings/users"
          },
          {
            id: "passwords",
            title: "Password Log",
            type: "item",
            icon: <Icon.ChevronRight size={15} />,
            permissions: ["Admin"],
            navLink: "/settings/passwords"
          },
          {
            id: "logins",
            title: "Login Log",
            type: "item",
            icon: <Icon.ChevronRight size={15} />,
            permissions: ["Admin"],
            navLink: "/settings/logins"
          },
          {
            id: "configs",
            title: "Network Tools",
            type: "item",
            icon: <Icon.ChevronRight size={15} />,
            permissions: ["Admin"],
            navLink: "/settings/configs"
          },
          {
            id: "pagination",
            title: "Pagination",
            type: "item",
            icon: <Icon.ChevronRight size={12} />,
            permissions: ["Admin", "Support", "Manager", "Sales", "Senior Sales"],
            navLink: "/settings/pagination"
          },
        ]
      },
    ]
  }
  // {
  //   id: "docs",
  //   title: "Docs",
  //   type: "collapse",
  //   icon: <Icon.FileText size={20} />,
  //   children: [
  //     {
  //       id: "servers",
  //       title: "Servers",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/servers",
  //     },
  //     {
  //       id: "inventory",
  //       title: "Inventory",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/inventory",
  //     },
  //     {
  //       id: "search",
  //       title: "Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/docs/search",
  //     },
  //     {
  //       id: "resources",
  //       title: "Resources",
  //       type: "collapse",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Manager"],
  //       children: [
  //         {
  //           id: "inventory-resources",
  //           title: "Inv - Resources",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin", "Manager"],
  //           navLink: "/docs/resources/inventory-resources"
  //         },
  //         {
  //           id: "server-resources",
  //           title: "Server - Resources",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin", "Manager"],
  //           navLink: "/docs/resources/server-resources"
  //         },
  //       ]
  //     },
  //     {
  //       id: "settings",
  //       title: "Settings",
  //       type: "collapse",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       children: [
  //         {
  //           id: "locations",
  //           title: "Locations",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/locations"
  //         },
  //         {
  //           id: "switches",
  //           title: "Switches",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/switches"
  //         },
  //         {
  //           id: "pdu",
  //           title: "PDU",
  //           type: "item",
  //           icon: <Icon.ChevronRight size={15} />,
  //           permissions: ["Admin"],
  //           navLink: "/docs/settings/pdu"
  //         },
  //       ]
  //     },
  //     {
  //       id: "kbase",
  //       title: "Old K-Base",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/docs/kbase",
  //     },
  //   ]
  // },
  // {
  //   id: "ipwatch",
  //   title: "Ipwatch",
  //   type: "collapse",
  //   icon: <Icon.Eye size={20} />,
  //   children: [
  //     {
  //       id: "search",
  //       title: "Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/search",
  //     },
  //     {
  //       id: "null_routes",
  //       title: "Null Routes",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/null-routes",
  //     },
  //     {
  //       id: "shipments",
  //       title: "Shipments",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/ipwatch/shipment",
  //     },
  //     {
  //       id: "quarantine_devices",
  //       title: "Devices",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/quarantine/devices"
  //     },
  //   ]
  // },
  // {
  //   id: "webfinder",
  //   title: "WebFinder",
  //   type: "collapse",
  //   icon: <Icon.CheckCircle size={20} />,
  //   children: [
  //     {
  //       id: "shopping_list",
  //       title: "Shopping List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/webfinder/shopping-list",
  //     },
  //   ]
  // },
  // {
  //   id: "petersmith",
  //   title: "Petersmith",
  //   type: "collapse",
  //   icon: <Icon.Slack size={20} />,
  //   permissions: ["Admin", "Support", "Remote", "Manager"],
  //   children: [
  //     {
  //       id: "tickets",
  //       title: "Tickets",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/tickets"
  //     },
  //     {
  //       id: "order_manager",
  //       title: "Order Manager",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/order_manager"
  //     },
  //     {
  //       id: "crm_search",
  //       title: "CRM Search",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/crm_search"
  //     },
  //     {
  //       id: "password_generator",
  //       title: "Password",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/password-generator"
  //     },
  //     {
  //       id: "cpanel",
  //       title: "Cpanel Audit",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/cpanel"
  //     },
  //     {
  //       id: "pts-settings",
  //       title: "Settings",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/pts/settings"
  //     }
  //   ]
  // },
  // {
  //   id: "vps",
  //   title: "VPS",
  //   type: "collapse",
  //   icon: <Icon.PieChart size={20} />,
  //   permissions: ["Admin", "Support", "Remote", "Manager"],
  //   children: [
  //     {
  //       id: "vps_statistics",
  //       title: "VPS Statistics",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin", "Support", "Remote", "Manager"],
  //       navLink: "/vps/statistics",
  //     },
  //   ]
  // },
  // {
  //   id: "main-settings",
  //   title: "Settings",
  //   type: "collapse",
  //   icon: <Icon.Settings size={20} />,
  //   permissions: ["Admin"],
  //   children: [
  //     {
  //       id: "locations",
  //       title: "Locations",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/locations"
  //     },
  //     {
  //       id: "users",
  //       title: "Users",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/users"
  //     },
  //     {
  //       id: "logins",
  //       title: "Logins",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/logins"
  //     },
  //     {
  //       id: "configs",
  //       title: "Configs",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["Admin"],
  //       navLink: "/settings/configs"
  //     }
  //   ]
  // }
]

export default navigationConfig
