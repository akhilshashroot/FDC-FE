import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
// import navbar from "./navbar/Index";
import dataList from "./data-list/";
import userList from "./user-list/";
import inventory from "./inventory/index.js";
import PDU from "./pdu/index.js";
import Server from "./servers/index.js";
import Switches from "./switches/index.js";
import Searches from './search/index.js';
import Kbase from './kbase/index.js';
import IPSearch from './ip-watch/index.js';
import IpwatchNullRoute from './ipwatch-nullroutes/index';
import IpwatchShopping from './ipwatch-shopping/index';
import IpwatchShipment from './ipwatch-shipments/index';
import QarentineDevices from './qarentine-devices/index';
import UserConfigs from './userConfigs/index';
import PaginationReducer from './pagination/index';
import DocumentationReducer from './documentation/index';
import CancelListReducer from './cancel-list';
import CDNListReducer from './cdn-billing';
import NonPayReducer from './nonPay';
import IpTransitReducer from './ip-transit';
import IpTransitSettingsReducer from './ip-transist-settings';
import IpTransitExportReducer from './ip-transit-export'

const appReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  // navbar: navbar,
  dataList: dataList,
  userList: userList,
  inventoryList: inventory,
  pduList: PDU,
  ServerList: Server,
  SwitchList: Switches,
  SearchList: Searches,
  KbaseList: Kbase,
  IPSearchList: IPSearch,
  IpwatchNullRoute: IpwatchNullRoute,
  IpwatchShoppingList: IpwatchShopping,
  IpwatchShipmentData: IpwatchShipment,
  QarentineDevices: QarentineDevices,
  UserConfig: UserConfigs,
  paginateData: PaginationReducer,
  DocumentationList: DocumentationReducer,
  CancelList: CancelListReducer,
  CDNList: CDNListReducer,
  NonPay: NonPayReducer,
  IpTransitList: IpTransitReducer,
  IpTransistProvider: IpTransitSettingsReducer,
  IpTransitExportList: IpTransitExportReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer
