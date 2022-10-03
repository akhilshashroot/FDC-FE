import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";




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
const CancelList = React.lazy(() => import("./views/pages/CancelList/CancelListView"));
const NonPay = React.lazy(() => import("./views/pages/NonPay/index"));
const ActiveIpTransist = React.lazy(() => import("./views/pages/activeIpTransit/index"));
const CanceledIpTransist = React.lazy(() => import("./views/pages/canceledIpTransit/CancelIpTransitView"));
const IpTransistSettings = React.lazy(() => import("./views/pages/IpTransistSettings/index"));
const IpTransistExport = React.lazy(() => import("./views/pages/IpTransitExport/exportview"));



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
const CDN = React.lazy(() => import("./views/pages/cdn/cdnbillingview"));

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
const Passwords = React.lazy(() => import("./views/pages/password"));
const UserConfigs = React.lazy(() => import("./views/pages/UserConfigs"));

const RouteConfig = ({ component: Component, fullLayout, permission, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        const user_role = localStorage.getItem('user_role') || null;
        const token_val = localStorage.getItem("token") || null;
        if (token_val) {
          if (permission && permission.length && permission.indexOf(user_role) === -1) {
          
            return <Redirect to='/dashboard' />;
          } else {
            return (
              <ContextLayout.Consumer>
                {context => {
                  let LayoutTag =
                    fullLayout === true
                      ? context.fullLayout
                      : context.VerticalLayout
                  return (
                    <LayoutTag {...props} permission={props.user}>
                      <Suspense fallback={<Spinner />}>
                        <Component {...props} />
                      </Suspense>
                    </LayoutTag>
                  )
                }}
              </ContextLayout.Consumer>
            )
          }
        } else {
          if (!fullLayout) {
 
            return <Redirect to='/' />;
          } else {
            return (
              <ContextLayout.Consumer>
                {context => {
                  let LayoutTag =
                    fullLayout === true
                      ? context.fullLayout
                      : context.VerticalLayout
                  return (
                    <LayoutTag {...props} permission={props.user}>
                      <Suspense fallback={<Spinner />}>
                        <Component {...props} />
                      </Suspense>
                    </LayoutTag>
                  )
                }}
              </ContextLayout.Consumer>
            )
          }
        }


      }}
    />
  )
}


const mapStateToProps = state => { 
  return {
    user: state.auth.login.userRole
  }
}


const AppRoute = connect(mapStateToProps)(RouteConfig)




class AppRouter extends React.Component {
  
  render() {
 
    const resource_manager = localStorage.getItem('resource_manager') || null;
    const user_role = localStorage.getItem("user_role") || null;
  
    
    const ASRMSS_PERM = ["Admin", "Support", "Remote", "Manager", "Sales", "Senior Sales"];
    const ASM = ["Admin", "Support", "Manager"];
    const AM = ["Admin", "Manager"];
    const AdminOnly = ["Admin"];
    const ASMSS_PERM = ["Admin", "Support", "Manager", "Sales", "Senior Sales"];
    const AMS_PERM = ["Admin", "Manager", "Senior Sales"];
    const RDYNAMIC = ["Admin", "Manager" , resource_manager == 1 ? user_role : " "];



    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          {/* Authentication */}
          <AppRoute exact path="/" component={(props) => (localStorage.token ? (<Redirect to="/dashboard" />) : (<Login {...props} />))} fullLayout />
          <AppRoute exact path="/forgot-password" component={forgotPassword} fullLayout />
          <AppRoute path="/not-authorized" component={NonAuthorized} fullLayout />

          {/* Dashboard */}
          <AppRoute exact path='/dashboard' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<FDCDashboard {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/settings/change-password' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<UserProfile {...props} permission={ASRMSS_PERM} />))} />

          {/* Servers/Docs */}
          <AppRoute exact path='/docs/servers' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<ServerView {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/inventory' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Inventory {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/search' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Search {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/settings/locations' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<DocsLocationView {...props} permission={AdminOnly} />))} />
          <AppRoute exact path='/docs/kbase' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Kbase {...props} />))} permission={ASM} />
          <AppRoute exact path='/webfinder/shopping-list' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<WebfinderShopping {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/ipwatch/shipment' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<IpwatchShipment {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/documentation' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<DocsDocumentation {...props} />))} permission={ASRMSS_PERM} />
          <AppRoute exact path='/docs/cancel' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<CancelList {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/docs/nonpay' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<NonPay {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/docs/active_ip_transit' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<ActiveIpTransist {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/docs/canceled_ip_transit' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<CanceledIpTransist {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/docs/settings_ip_transit' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<IpTransistSettings {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/docs/export_ip_transit' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<IpTransistExport {...props} />))} permission={AdminOnly} />

          {/* CRM Tools */}
          <AppRoute exact path='/pts/tickets' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithTickets {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/pts/order_manager' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithOrderManager {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/pts/crm_search' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithCRMSearch {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/pts/password-generator' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithPasswordGenerator {...props} />))} permission={ASRMSS_PERM} />

          {/* Network Tools */}
          <AppRoute exact path='/ipwatch/search' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<IpwatchSearch {...props} />))} permission={ASM} />
          <AppRoute exact path='/ipwatch/null-routes' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<IpwatchNullRoute {...props} />))} permission={ASM} />

          {/* Audit/Stats */}
          <AppRoute exact path='/pts/cpanel' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithCpanel {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/quarantine/devices' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<QuarantineDevices {...props} />))} permission={AMS_PERM} />
          <AppRoute exact path='/vps/statistics' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<VpsStatistics {...props} />))} permission={AMS_PERM} />
          <AppRoute exact path='/vps/cdn' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<CDN {...props} />))} permission={AMS_PERM} />

          {/* Settings */}
          <AppRoute exact path='/settings/locations' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<LocationView {...props} />))} permission={AM} />
          <AppRoute exact path='/docs/settings/switches' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<SwitchView {...props} permission={AdminOnly} />))} />
          <AppRoute exact path='/docs/settings/pdu' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Pdu {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/docs/resources/server-resources' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<ServerResources {...props} />))} permission={RDYNAMIC} />
          <AppRoute exact path='/docs/resources/inventory-resources' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<InventoryResources {...props} />))} permission={RDYNAMIC} />
          <AppRoute exact path='/pts/settings' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<PetersmithSettings {...props} />))} permission={ASMSS_PERM} />
          <AppRoute exact path='/settings/users' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<UsersView {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/settings/logins' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<UserLogins {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/settings/passwords' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Passwords {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/settings/configs' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<UserConfigs {...props} />))} permission={AdminOnly} />
          <AppRoute exact path='/settings/pagination' component={(props) => (!localStorage.token ? (<Redirect to="/" />) : (<Pagination {...props} />))} permission={ASMSS_PERM} />
        </Switch>
      </Router>
    );
  }
}

export default  AppRouter;