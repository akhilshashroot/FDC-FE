import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
  Label,
  FormGroup,
} from "reactstrap";
import Select from "react-select";

import docs from "../../../assets/img/docs/docs.jpg";
import DocsView from "./documentView";
import DocsAdd from "./documentAdd";
import "./style.scss";
import { Plus } from "react-feather";
import {
  AddNewDocument,
  GetDocumentList,
  GetADocument,
  UpdateDocument,
  deleteDocument,
  AddNewDocumentImage,
} from "../../../redux/actions/documents";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import "../../../assets/scss/pages/knowledge-base.scss";
import { connect } from "react-redux";
import { getInitialData } from "../../../redux/actions/data-list/";
import { GetUserPrivilege } from "../../../redux/actions/user-list";
import DocsDelete from "./documentDelete";

const Added = () =>
  toast.success("Document Added Successfully", { transition: Zoom });
const Error = () =>
  toast.warning("Something went wrong.Please try again..", {
    transition: Zoom,
  });
const Mandatory = () =>
  toast.warning("Please Fill all Mandatory Fields..", { transition: Zoom });
const Duplicate = () =>
  toast.warning("The Document Name has already been taken..", {
    transition: Zoom,
  });
const Updated = () =>
  toast.info("Document Updated Successfully", { transition: Zoom });
const DeletedSuccess = () =>
  toast.success("Document Deleted Successfully.", { transition: Zoom });

const usertype = [
  { label: "All", value: "all" },
  { label: "Admin", value: 1 },
  { label: "Support", value: 2 },
  { label: "Manager", value: 4 },
  { label: "Sales", value: 5 },
  { label: "Remote", value: 3 },
];

class DocumentationConfig extends React.Component {
  state = {
    docsView: false,
    docsAdd: false,
    docsUpdate: false,
    docid: "",
    toggleDeleteModal: false,
    user_role: "",
    loading: false,
    user: "",
    location: "",
    remote: false,
    empty: false,
  };

  convertUser = (data) => {
    var userdata = [];
    userdata.push({ label: "All", value: "all" });
    data &&
      data.forEach((value) => {
        userdata.push({ label: value.name, value: value.id });
      });
    return userdata;
  };

  convertLocation = (data) => {
    var locationData = [];
    locationData.push({ label: "Global", value: -1 });
    data &&
      data.forEach((value) => {
        locationData.push({ label: value.location, value: value.id });
      });
    return locationData;
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  handleUserChange = (user) => {
    this.setState({ user });
    if (user.value === 3) {
      this.setState({ remote: true });
      this.setState({ location: { label: "Global", value: -1 } });
    } else {
      this.setState({ remote: false });
    }
    if (user.value !== "all") {
      let templist = [];
      templist =
        this.props.DocumentationList &&
        this.props.DocumentationList.allDocumentData.filter(
          (value) => value.user_role_id == user.value
        );
      if (templist.length === 0) {
        this.setState({ empty: true });
      } else {
        this.setState({ empty: false });
      }
    }
  };

  componentDidMount() {
    let user_role = localStorage.getItem("user_role");
    this.setState({ user_role: user_role });

    if (
      this.props.dataList &&
      this.props.dataList.allData &&
      !this.props.dataList.allData.length > 0
    ) {
      this.props.getInitialData();
    }
    if (
      this.props.DocumentationList &&
      !this.props.DocumentationList.allDocumentData
    ) {
      this.setState({ loading: true });
      this.props.GetDocumentList().then(() => {
        if (this.props.userList && !this.props.userList.prevData) {
          this.props.GetUserPrivilege().then(() => {
            this.setState({ user: { label: "All", value: "all" } });
            this.setState({ loading: false });
          });
        } else {
          this.setState({ user: { label: "All", value: "all" } });
          this.setState({ loading: false });
        }
      });
    } else {
      this.setState({ user: { label: "All", value: "all" } });
      this.setState({ loading: false });
    }
  }

  docsClick = (id = false) => {
    if (id) {
      this.setState({ docsView: !this.state.docsView, docid: id });
    } else {
      this.setState({ docsView: !this.state.docsView, docid: "" });
    }
  };

  docsAdd = () => {
    this.setState({ docsAdd: !this.state.docsAdd });
  };

  toggleDocDeleteModal = (id = false) => {
    if (id) {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        docid: id,
      });
    } else {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        docid: "",
      });
    }
  };

  render() {
    const {
      docsView,
      docsAdd,
      docid,
      docsUpdate,
      toggleDeleteModal,
      user_role,
      loading,
      user,
      remote,
      empty,
    } = this.state;
    const norecord = {
      background: "#dcdbdb",
      minHeight: "50px",
    };

    return (
      <>
        {loading === true ? (
          <Spinner color="primary" className="reload-spinner" />
        ) : (
          <>
            {docsView === false && docsAdd === false && docsUpdate === false && (
              <Row>
                <>
                  {(user_role === "Admin" || "Senior Sales") && (
                    <>
                      <Col sm="4">
                        <FormGroup>
                          <Label for="data-category">Filter</Label>
                          <Select
                            styles={{
                              // Fixes the overlapping problem of the component
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                              }),
                            }}
                            value={user}
                            onChange={this.handleUserChange}
                            options={this.convertUser(
                              this.props.userList &&
                                this.props.userList.prevData
                            )}
                            isSearchable={true}
                          />
                        </FormGroup>
                      </Col>
                      {/* {remote &&
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label for="data-category">Location</Label>
                                                            <Select
                                                                styles={{
                                                                    // Fixes the overlapping problem of the component
                                                                    menu: provided => ({ ...provided, zIndex: 9999 })
                                                                }}
                                                                value={this.state.location}
                                                                onChange={this.handleLocationChange}
                                                                options={this.convertLocation(this.props.dataList && this.props.dataList.allData)}
                                                                isSearchable={true}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                } */}
                      <Col sm={`${remote ? "8" : "8"}`}>
                        <div
                          className="data-list-header d-flex justify-content-between flex-wrap mb-1 mt-2"
                          style={{ float: "right" }}
                        >
                          <div className="actions-left d-flex flex-wrap">
                            <Button
                              className="add-new-btn"
                              color="primary"
                              onClick={() => this.docsAdd()}
                              outline
                            >
                              <Plus size={15} />
                              <span className="align-middle">Add New</span>
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </>
                  )}
                </>
              </Row>
            )}
            {docsView === false && docsAdd === false && docsUpdate === false && (
              <Row>
                {this.props.DocumentationList &&
                  this.props.DocumentationList.allDocumentData &&
                  this.props.DocumentationList.allDocumentData.length > 0 &&
                  this.props.DocumentationList.allDocumentData.map(
                    (value, index) => (
                      <>
                        {user.value === value.user_role_id && (
                          <Col
                            md="4"
                            sm="6"
                            className="search-content"
                            key={index}
                          >
                            <Card>
                              <CardBody className="text-center">
                                <span
                                  className="link"
                                  onClick={() => this.docsClick(value.id)}
                                >
                                  <img
                                    src={docs}
                                    alt="documentation"
                                    className="mx-auto mb-2"
                                    width="180"
                                  />
                                  <h4>{value.doc_name}</h4>
                                  <Badge
                                    className="badge-glow"
                                    color={`${
                                      value.user_role_id === 1
                                        ? "primary"
                                        : value.user_role_id === 2
                                        ? "success"
                                        : value.user_role_id === 3
                                        ? "warning"
                                        : value.user_role_id === 4
                                        ? "info"
                                        : "danger"
                                    }`}
                                  >
                                    {value.alias}
                                  </Badge>
                                </span>
                              </CardBody>
                            </Card>
                          </Col>
                        )}
                        {user.value === "all" && (
                          <Col
                            md="4"
                            sm="6"
                            className="search-content"
                            key={index}
                          >
                            <Card>
                              <CardBody className="text-center">
                                <span
                                  className="link"
                                  onClick={() => this.docsClick(value.id)}
                                >
                                  <img
                                    src={docs}
                                    alt="documentation"
                                    className="mx-auto mb-2"
                                    width="180"
                                  />
                                  <h4>{value.doc_name}</h4>
                                  <Badge
                                    className="badge-glow"
                                    color={`${
                                      value.user_role_id === 1
                                        ? "primary"
                                        : value.user_role_id === 2
                                        ? "success"
                                        : value.user_role_id === 3
                                        ? "warning"
                                        : value.user_role_id === 4
                                        ? "info"
                                        : "danger"
                                    }`}
                                  >
                                    {value.alias}
                                  </Badge>
                                </span>
                              </CardBody>
                            </Card>
                          </Col>
                        )}
                      </>
                    )
                  )}
              </Row>
            )}
            {docsView === true && (
              <DocsView
                docsClick={this.docsClick}
                DocumentationList={this.props.DocumentationList}
                GetADocument={this.props.GetADocument}
                docid={docid}
                locationList={this.props.dataList}
                userList={this.props.userList && this.props.userList.prevData}
                UpdateDocument={this.props.UpdateDocument}
                AddNewDocumentImage={this.props.AddNewDocumentImage}
                Updated={Updated}
                Error={Error}
                Mandatory={Mandatory}
                Duplicate={Duplicate}
                DeletedSuccess={DeletedSuccess}
                deleteDocument={this.props.deleteDocument}
                toggleDocDeleteModal={this.toggleDocDeleteModal}
                user_role={user_role}
              />
            )}
            {docsAdd === true && (
              <DocsAdd
                docsAdd={this.docsAdd}
                locationList={this.props.dataList}
                userList={this.props.userList && this.props.userList.prevData}
                DocumentationList={this.props.DocumentationList}
                AddNewDocument={this.props.AddNewDocument}
                AddNewDocumentImage={this.props.AddNewDocumentImage}
                Added={Added}
                Error={Error}
                Mandatory={Mandatory}
                Duplicate={Duplicate}
              />
            )}
            {toggleDeleteModal && (
              <DocsDelete
                toggleDeleteModal={toggleDeleteModal}
                toggleDocDeleteModal={this.toggleDocDeleteModal}
                docId={docid}
                deleteDoc={this.props.deleteArticle}
                DeletedSuccess={DeletedSuccess}
                deleteDocument={this.props.deleteDocument}
                DocumentationList={this.props.DocumentationList}
                Error={Error}
                docsClick={this.docsClick}
              />
            )}
            {this.props.DocumentationList &&
              this.props.DocumentationList.allDocumentData &&
              this.props.DocumentationList.allDocumentData.length === 0 && (
                <Row>
                  <Col sm="12">
                    <Card style={norecord}>
                      <CardBody className="text-center">
                        <h4 style={{ color: "red" }}>
                          Sorry there are no documents to display!
                        </h4>
                        <ToastContainer />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}
            {empty && (
              <Row>
                <Col sm="12">
                  <Card style={norecord}>
                    <CardBody className="text-center">
                      <h4 style={{ color: "red" }}>
                        Sorry there are no documents to display!
                      </h4>
                      <ToastContainer />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
            <ToastContainer />
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    DocumentationList: state.DocumentationList,
    dataList: state.dataList,
    userList: state.userList,
  };
};
export default connect(mapStateToProps, {
  AddNewDocument,
  GetDocumentList,
  GetADocument,
  UpdateDocument,
  deleteDocument,
  getInitialData,
  GetUserPrivilege,
  AddNewDocumentImage,
})(DocumentationConfig);
