import React from "react"
import { NavItem, NavLink, } from "reactstrap"
import * as Icon from "react-feather"
import { connect } from "react-redux"
// import { loadSuggestions, updateStarred } from "../../../redux/actions/navbar/Index"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import NavBreadCrumbs from './NabBreadcrumbs'

// a little function to help us with reordering the bookmarks
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)
//   return result
// }

class NavbarBookmarks extends React.PureComponent {
  state = {
    // showBookmarks: false,
    value: "",
    noSuggestions: false,
    isStarred: false,
    suggestions: [],
    // starredItems: []
  }

  updateBookmarks = false

  // handleBookmarksVisibility = () => {
  //   this.setState({
  //     showBookmarks: !this.state.showBookmarks,
  //     value: "",
  //     suggestions: [],
  //     noSuggestions: false,
  //     starred: null
  //   })
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.bookmarks.starred.length !== this.state.starredItems.length && this.updateBookmarks === true) {
  //     this.setState({ starredItems: this.props.bookmarks.starred })
  //     this.updateBookmarks = false
  //   }
  // }

  // componentDidMount() {
  //   let {
  //     bookmarks: { suggestions, starred },
  //     loadSuggestions
  //   } = this.props
  //   this.setState(
  //     {
  //       suggestions: suggestions,
  //       starredItems: starred
  //     },
  //     loadSuggestions()
  //   )
  // }

  // onDragEnd = result => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return
  //   }

  //   const starredItems = reorder(
  //     this.state.starredItems,
  //     result.source.index,
  //     result.destination.index
  //   )

  //   this.setState({
  //     starredItems
  //   })
  // }

  // renderBookmarks = () => {
  //   this.updateBookmarks = true
  //   return <DragDropContext onDragEnd={this.onDragEnd}>
  //     <Droppable droppableId="droppable" direction="horizontal">
  //       {(provided, snapshot) => (
  //         <div
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //           className="d-flex flex-sm-wrap flex-lg-nowrap draggable-cards"
  //         >
  //           {this.state.starredItems.map((item, index) => {
  //             return (
  //               <Draggable key={item.target} draggableId={item.target} index={index}>
  //                 {(provided, snapshot) => {
  //                   return <div ref={provided.innerRef}
  //                     {...provided.draggableProps}
  //                     {...provided.dragHandleProps}>
  //                   </div>
  //                 }}

  //               </Draggable>
  //             )
  //           })}
  //           {provided.placeholder}
  //         </div>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // }

  mainBreadCrumb = () => {
    let data = []
    if (this.props.location && this.props.location.pathname === "/dashboard") {
      return data
    }
    if (this.props.location && this.props.location.pathname === "/docs/servers") {
      data.push("Servers")
      data.push("Servers / Docs")
      data.push("Servers")
    }
    if (this.props.location && this.props.location.pathname === "/docs/inventory") {
      data.push("Inventory")
      data.push("Servers / Docs")
      data.push("Inventory")
    }
    if (this.props.location && this.props.location.pathname === "/docs/search") {
      data.push("Search")
      data.push("Servers / Docs")
      data.push("Search")
    }
    if (this.props.location && this.props.location.pathname === "/docs/resources/inventory-resources") {
      data.push("Inventory - Resources")
      data.push("Settings")
      data.push("Inventory - Resources")
    }
    if (this.props.location && this.props.location.pathname === "/docs/resources/server-resources") {
      data.push("Server - Resources")
      data.push("Settings")
      data.push("Server - Resources")
    }
    if (this.props.location && this.props.location.pathname === "/docs/settings/locations") {
      data.push("Locations")
      data.push("Servers / Docs")
      data.push("Locations")
    }
    if (this.props.location && this.props.location.pathname === "/docs/settings/switches") {
      data.push("Switches")
      data.push("Settings")
      data.push("Switches")
    }
    if (this.props.location && this.props.location.pathname === "/docs/settings/pdu") {
      data.push("PDUs")
      data.push("Settings")
      data.push("PDUs")
    }

    if (this.props.location && this.props.location.pathname === "/settings/locations") {
      data.push("Locations")
      data.push("Settings")
      data.push("Locations")
    }


    if (this.props.location && this.props.location.pathname === "/settings/users") {
      data.push("Users")
      data.push("Settings")
      data.push("Users")
    }
    if (this.props.location && this.props.location.pathname === "/docs/kbase") {
      data.push("Knowledge Base")
      data.push("Servers / Docs")
      data.push("Knowledge Base")
    }
    if (this.props.location && this.props.location.pathname === "/docs/settings/change-password") {
      data.push("Change Password")
      data.push("Profile")
      data.push("Change Password")
    }
    if (this.props.location && this.props.location.pathname === "/ipwatch/search") {
      data.push("Search")
      data.push("Network Tools")
      data.push("Search")
    }
    if (this.props.location && this.props.location.pathname === "/ipwatch/null-routes") {
      data.push("Null Routes")
      data.push("Network Tools")
      data.push("Null Routes")
    }
    if (this.props.location && this.props.location.pathname === "/ipwatch/shipment") {
      data.push("Shipments")
      data.push("Servers / Docs")
      data.push("Shipments")
    }
    if (this.props.location && this.props.location.pathname === "/webfinder/shopping-list") {
      data.push("Shopping List")
      data.push("Servers / Docs")
      data.push("Shopping List")
    }
    if (this.props.location && this.props.location.pathname === "/pts/tickets") {
      data.push("Tickets")
      data.push("CRM Tools")
      data.push("Tickets")
    }
    if (this.props.location && this.props.location.pathname === "/pts/order_manager") {
      data.push("Order Manager")
      data.push("CRM Tools")
      data.push("Order Manager")
    }
    if (this.props.location && this.props.location.pathname === "/pts/crm_search") {
      data.push("CRM Search")
      data.push("CRM Tools")
      data.push("CRM Search")
    }
    if (this.props.location && this.props.location.pathname === "/pts/password-generator") {
      data.push("Password Generator")
      data.push("CRM Tools")
      data.push("Password Generator")
    }
    if (this.props.location && this.props.location.pathname === "/pts/cpanel") {
      data.push("Cpanel Audit")
      data.push("Audit / Stats")
      data.push("Cpanel Audit")
    }
    if (this.props.location && this.props.location.pathname === "/pts/settings") {
      data.push("CRM Tools")
      data.push("Settings")
      data.push("CRM Tools")
    }
    if (this.props.location && this.props.location.pathname === "/vps/statistics") {
      data.push("VPS")
      data.push("Audit / Stats")
      data.push("VPS")
    }
    if (this.props.location && this.props.location.pathname === "/quarantine/devices") {
      data.push("Devices")
      data.push("Audit / Stats")
      data.push("Devices")
    }
    if (this.props.location && this.props.location.pathname === "/settings/logins") {
      data.push("Login Log")
      data.push("Settings")
      data.push("Login Log")
    }
    if (this.props.location && this.props.location.pathname === "/settings/passwords") {
      data.push("Password Log")
      data.push("Settings")
      data.push("Password Log")
    }
    if (this.props.location && this.props.location.pathname === "/settings/configs") {
      data.push("Network Tools")
      data.push("Settings")
      data.push("Network Tools")
    }

    if (this.props.location && this.props.location.pathname === "/settings/pagination") {
      data.push("Pagination")
      data.push("Settings")
      data.push("Pagination")
    }
    if (this.props.location && this.props.location.pathname === "/docs/documentation") {
      data.push("Documentation")
      data.push("Servers / Docs")
      data.push("Documentation")
    }
    if (this.props.location && this.props.location.pathname === "/docs/cancel") {
      data.push("Cancel List")
      data.push("Servers / Docs")
      data.push("Cancel List")
    }
    if (this.props.location && this.props.location.pathname === "/docs/nonpay") {
      data.push("Nonpayment")
      data.push("Servers / Docs")
      data.push("Nonpayment")
    }
    if (this.props.location && this.props.location.pathname === "/vps/cdn") {
      data.push("CDN Billing")
      data.push("Audit / Stats")
      data.push("CDN Billing")
    }
    if (this.props.location && this.props.location.pathname === "/docs/active_ip_transit") {
      data.push("Active Ip Transit")
      data.push("Servers / Docs")
      data.push("Active Ip Transit")
    }
    if (this.props.location && this.props.location.pathname === "/docs/canceled_ip_transit") {
      data.push("Cancelled Ip Transit")
      data.push("Servers / Docs")
      data.push("Cancelled Ip Transit")
    }

    if (this.props.location && this.props.location.pathname === "/docs/settings_ip_transit") {
      data.push("Ip Transit Settings")
      data.push("Servers / Docs")
      data.push("Ip Transit Settings")
    }

    if (this.props.location && this.props.location.pathname === "/docs/export_ip_transit") {
      data.push("Ip Transit Export")
      data.push("Servers / Docs")
      data.push("Ip Transit Export")
    }
    

    return data
  }



  render() {
    let {
      sidebarVisibility,
    } = this.props
    let breadcrumbstyle = {
      marginLeft: "0.5rem",
      height: "40px"
    }


    return (
      <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu mr-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={sidebarVisibility}
            >
              <Icon.Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
        <ul className="navbar-nav bookmark-icons" style={breadcrumbstyle}>
          <NavBreadCrumbs data={this.mainBreadCrumb()} />
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    bookmarks: state.navbar
  }
}

export default connect(mapStateToProps, {})(
  NavbarBookmarks
)
