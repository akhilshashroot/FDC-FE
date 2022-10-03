import React, { Fragment } from "react";
import { Button, Card, CardBody, } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { Edit, Plus,Trash,GitPullRequest } from "react-feather";
import { connect } from "react-redux";
import { getInitialData } from "../../../redux/actions/data-list";
import { clearLocationConfigData } from '../../../redux/actions/userConfigs/index';
import Sidebar from "./LocationSidebar";
import "../../../assets/scss/pages/data-list.scss";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import ConfigModal from './ConfigModal';
import LocationDelete from './LocationDelete';

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={15}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <GitPullRequest
        className="cursor-pointer mr-1"
        size={15}
        onClick={(e) => {
          return props.toggleConfigModal(e, props.row)
        }}
      />
      <Trash
        className="cursor-pointer mr-1"
        size={15}
        onClick={(e) => {
          return props.toggleDeleteModal(e, props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </div>
    </div>
  )
}
const notifyInfo = () => toast.info("Location Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("Location Added Successfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })

class LocationConfig extends React.PureComponent {

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "#",
        selector: "index",
        sortable: true,
        maxWidth: "8%",
        minWidth: "8%",
      },
      {
        name: "Location",
        selector: "location",
        sortable: true,
        minWidth: "20%",
        maxWidth: "20%",
      },
      {
        name: "Location Short",
        selector: "loc_short",
        sortable: true,
        minWidth: "20%",
        maxWidth: "20%",
        cell: row => (<span>{row.loc_short.toUpperCase()}</span>)
      },
      {
        name: "Sector",
        selector: "sector",
        sortable: true,
        maxWidth: "12%",
        minWidth: "12%",
      },
      {
        name: "Address",
        selector: "iw_loc_desc",
        sortable: true,
        maxWidth: "28%",
        minWidth: "28%",
      },
      {
        name: "Actions",
        sortable: true,
        minWidth: "12%",
        maxWidth: "12%",
        cell: row => (
          <ActionsComponent
            row={row}
            currentData={this.handleCurrentData}
            toggleConfigModal={this.toggleModal}
            toggleDeleteModal = {this.toggleDeleteModal}
          />
        )
      }
    ],
    sidebar: false,
    currentData: null,
    selected: [],
    addNew: "",
    modal: false,
    loc: "",
    deletModal : false
  }

  componentDidMount() {
    if (this.props.locationData && this.props.locationData.length === 0) {
      this.props.getInitialData()
    }
  }

  notifyLocShortWarning = (message) => toast.warning(message, { transition: Zoom })

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  toggleModal = (e, row = false) => {
    if (row) {
      this.setState({ modal: !this.state.modal, loc: row });
    } else {
      this.setState({ modal: !this.state.modal, loc: "" });
      this.props.clearLocationConfigData()
    }
  }

  toggleDeleteModal = (e,row =false) => {
    if (row) {
      this.setState({ deletModal: !this.state.deletModal, loc: row });
    } else {
      this.setState({ deletModal: !this.state.deletModal, loc: "" });
    }
  }

  render() {
    let {
      columns,
      currentData,
      sidebar,
      modal,
      loc,
      deletModal
    } = this.state
    return (
      <>
        <div className={`data-list list-view`}>
          {(this.props.locationData && this.props.locationData.length <= 0) ? (
            <Spinner color="primary" className="reload-spinner" />
          ) : (
              <Card>
                <CardBody>
                  <DataTable
                    columns={columns}
                    data={this.props.locationData ? this.props.locationData : []}
                    noHeader
                    subHeader
                    customStyles={selectedStyle}
                    subHeaderComponent={
                      <CustomHeader
                        handleSidebar={this.handleSidebar}
                      />
                    }
                  />
                </CardBody>
              </Card>
            )}

          {sidebar &&
            <Fragment>
              <Sidebar
                show={sidebar}
                data={currentData}
                handleSidebar={this.handleSidebar}
                AddMessage={notifyBounce}
                UpdateMessage={notifyInfo}
                ErrorMessage={notifyWarning}
                notifyLocShortWarning={this.notifyLocShortWarning}
              />
              <div
                className={classnames("data-list-overlay", {
                  show: sidebar
                })}
                onClick={() => this.handleSidebar(false, true)}
              />
            </Fragment>
          }
          <ToastContainer />
        </div>
        {
          modal &&
          <ConfigModal modal={modal} toggleModal={this.toggleModal} loc={loc} />
        }
        {
          deletModal &&
          <LocationDelete deletModal={deletModal} location = {loc} toggleDeleteModal={this.toggleDeleteModal}/>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    locationData: state.dataList.allData,
  }
}

export default connect(mapStateToProps, { getInitialData, clearLocationConfigData })(LocationConfig)