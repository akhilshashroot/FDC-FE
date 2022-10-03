import React, { Component, Fragment } from "react";
import { Button, Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { Edit, Trash, Plus, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { getInitialData } from "../../../redux/actions/data-list/";
import { getUserData, DeleteUser, GetUserPrivilege, updateUserDuo ,updateUserAccess,updateUserResource} from "../../../redux/actions/user-list";
import "../../../assets/scss/pages/data-list.scss";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import "react-toggle/style.css";
import "../../../assets/scss/plugins/forms/switch/react-toggle.scss";
import Toggle from "react-toggle";
import Sidebar from "./UserListSidebar";
import UserDeleteModal from './DeleteModal';
import ReactPaginate from "react-paginate";
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import { getPaginateData } from '../../../redux/actions/pagination';

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
      <Trash
        className="cursor-pointer"
        size={15}
        onClick={() => {
          props.deleteRow(props.row)
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
const notifyInfo = () => toast.info("User Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("User Added Successfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Please fill required fields !", { transition: Zoom })
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyDeleted = () => toast.success("User deleted Succesfully", { transition: Zoom })
const userAdderrorWarning = (message) => toast.warning(message, { transition: Zoom })
const duoEnable = () => toast.success("Duo Enabled Successfully", { transition: Zoom })
const duoDisable = () => toast.success("Duo Disabled Successfully", { transition: Zoom })
const resourceEnable = () => toast.success("Resource Manager Mode Enabled Successfully", { transition: Zoom })
const resourceDisable = () => toast.success("Resource Manager Mode Disabled Successfully", { transition: Zoom })
const accessEnable = () => toast.success("Login Enabled Successfully", { transition: Zoom })
const accessDisable = () => toast.success("Login Disabled Successfully", { transition: Zoom })

class UserListConfig extends Component {


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
        minWidth: "8%"
      },
      {
        name: "Full Name",
        selector: "name",
        sortable: true,
        minWidth: "22%",
        maxWidth: "22%"
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "17%",
        maxWidth: "17%"
      },
      {
        name: "Username",
        selector: "username",
        sortable: true,
        minWidth: "12%",
        maxWidth: "12%"
      },
      {
        name: "privileges",
        selector: "role",
        sortable: true,
        minWidth: "12%",
        maxWidth: "12%",
        cell: row => (<Fragment>{(row.role === "Remote" || row.role === "REMOTE") ? row.locations.map((value, index) => <React.Fragment key={index}>{value.location} <br /></React.Fragment>) : row.role}</Fragment>)
      },
      {
        name: "Duo",
        selector: "duo_flag",
        sortable: true,
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<label className="react-toggle-wrapper">
          <Toggle
            defaultChecked={row.duo_flag ? true : false}
            className="switch-danger"
            onChange={(e) => this.handleDuoChange(e, row)}
          />
        </label>)
      }, {
        name: "User Login",
        selector: "login_status",
        sortable: true,
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<label className="react-toggle-wrapper">
          <Toggle
            defaultChecked={row.login_status ? false : true}
            className="switch-danger"
            onChange={(e) => this.handleAccessChange(e, row)}
          />
        </label>)
      },
      {
        name: "Resource Manager",
        selector: "resource_manager",
        sortable: true,
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<label className="react-toggle-wrapper">
          <Toggle
            defaultChecked={row.resource_manager ? true : false}
            className="switch-danger"
            onChange={(e) => this.handleResourceChange(e, row)}
          />
        </label>)
      },
      {
        name: "Actions",
        sortable: true,
        minWidth: "10%",
        maxWidth: "10%",
        cell: row => (
          <ActionsComponent
            row={row}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      }
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    userObj: "",
    pageNumber: 1,
    perPageData: 30
  }
  child = React.createRef();

  thumbView = this.props.thumbView

  componentDidMount() {
    if (this.props.paginateData && this.props.paginateData.perPageCount) {
      this.setState({ perPageData: this.props.paginateData.perPageCount })
    } else {
      this.props.getPaginateData().then(() => {
        if (this.props.paginateData && this.props.paginateData.perPageCount) {
          this.setState({ perPageData: this.props.paginateData.perPageCount })
        }
      })
    }

    if (this.props.dataList && this.props.dataList.allData && !this.props.dataList.allData.length > 0) {
      this.props.getInitialData(true)
    }
    if (this.props.userList && !this.props.userList.allData) {
      this.props.getUserData(true, this.state.pageNumber)
    }
    if (this.props.userList && !this.props.userList.prevData) {
      this.props.GetUserPrivilege(true)
    }
  }

  handleDuoChange = (e, row) => {
    var currValue = e.target.checked
    let duoData = {}
    if (currValue) {
      duoData.duo_flag = 1
    } else {
      duoData.duo_flag = 0
    }
    if (duoData) {
      this.props.updateUserDuo(duoData, row.id).then(() => {
    
        if (this.props.userList && this.props.userList.updatedUserDuo) {
          if (currValue) {
            currValue = ""
            duoEnable()
          } else {
            currValue = ""
            duoDisable()
          }
        } else {
          notifyError()
        }
      })
    }
  }
  handleResourceChange = (e, row) => {
    var currValue = e.target.checked
    let resourceData = {}
    if (currValue) {
      resourceData.resource_manager = 1
    } else {
      resourceData.resource_manager = 0
    }
    if (resourceData) {
      this.props.updateUserResource(resourceData, row.id).then(() => {
    
        if (this.props.userList && this.props.userList.updatedUserResource) {
          if (currValue) {
            currValue = ""
            resourceEnable()
          } else {
            currValue = ""
            resourceDisable()
          }
        } else {
          notifyError()
        }
      })
    }
  }
  handleAccessChange = (e, row) => {
    var currValue = e.target.checked

    let acessData = {}
    if (currValue) {
      acessData.login_status = 0
    } else {
      acessData.login_status = 1
    }
    if (acessData) {
      this.props.updateUserAccess(acessData, row.id).then(() => {

        if (this.props.userList && this.props.userList.updatedUserAccess) {
          if (currValue) {
            currValue = ""
            accessEnable()
          } else {
            currValue = ""
            accessDisable()
          }
        } else {
          notifyError()
        }
      })
    }
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  handleDelete = row => {
    this.setState({ userObj: row }, () => this.child.current.toggleModal());
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  // User Pagination On Change
  onUserPageChange = (currentPage) => {
    let page_number = currentPage.selected + 1
    this.props.getUserData(false, page_number).then(() => {
      window.scrollTo(0, 0)
    })
    this.setState({ pageNumber: page_number })
  }

  countTotalPages = (totalData) => {
    if (parseInt(totalData)) {
      var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
      return pageCount;
    }
  }

  render() {
    let {
      columns,
      currentData,
      sidebar,
      pageNumber
    } = this.state

    const { allData, prevData } = this.props.userList
    return (
      <div
        className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
          }`}>
        <Card>
          <CardBody>
            <DataTable
              columns={columns}
              data={allData && allData.data}
              noHeader
              subHeader
              subHeaderComponent={
                <CustomHeader
                  handleSidebar={this.handleSidebar}
                />
              }
            />
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={allData && allData.total && this.countTotalPages(allData.total)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              containerClassName={
                "vx-pagination icon-pagination pagination-end mt-2"
              }
              activeClassName={"active"}
              onPageChange={this.onUserPageChange}
              forcePage={pageNumber - 1}
            />
          </CardBody>
        </Card>
        <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getInitialData={this.props.getInitialData}
          getUserData={this.props.getUserData}
          addNew={this.state.addNew}
          locationData={this.props.dataList && this.props.dataList.allData}
          AddMessage={notifyBounce}
          UpdateMessage={notifyInfo}
          ErrorMessage={notifyError}
          inCompleteData={notifyWarning}
          userAdderrorWarning={userAdderrorWarning}
          previlegeData={prevData && prevData.length ? this.props.userList.prevData : []}
          pageNumber={pageNumber}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        <ToastContainer />
        <UserDeleteModal
          ref={this.child}
          userObj={this.state.userObj}
          notifyDeleted={notifyDeleted}
          notifyError={notifyError}
          pageNumber={pageNumber}
          {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList,
    userList: state.userList,
    paginateData: state.paginateData
  }
}

export default connect(mapStateToProps, {
  getInitialData,
  getUserData,
  DeleteUser,
  GetUserPrivilege,
  updateUserDuo,
  getPaginateData,
  updateUserAccess,
  updateUserResource,
})(UserListConfig)
