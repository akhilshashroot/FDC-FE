import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { Plus, Edit, Trash } from "react-feather";
import "../../../assets/scss/pages/knowledge-base.scss";
import { connect } from "react-redux";
import {
  AddNewArticle,
  GetArticleList,
  GetKbaseArticle,
  UpdateArticle,
  deleteArticle,
  AddNewCategory,
  GetCategoryList,
  UpdateCategory,
  deleteCategory,
  AddNewKbaseImage 
} from "../../../redux/actions/kbase";

import KbaseEditor from "./KbaseEditor";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import classnames from "classnames";
import KbaseDelete from "./KbaseDelete";
import KbaseCategory from "./KbaseCategory";
import "./style.scss";

const Added = () =>
  toast.success("Article Added Successfully", { transition: Zoom });
const Error = () =>
  toast.warning("Something went wrong.Please try again..", {
    transition: Zoom,
  });
const Mandatory = () =>
  toast.warning("Please Fill all Mandatory Fields..", { transition: Zoom });
const Duplicate = () =>
  toast.warning("The topic has already been taken..", { transition: Zoom });
const Updated = () =>
  toast.info("Article Updated Successfully", { transition: Zoom });
const articleDeletedSuccess = () =>
  toast.success("Article Deleted Successfully.", { transition: Zoom });
const CategoryAdded = () =>
  toast.success("Category Added Successfully", { transition: Zoom });
const CategoryDuplicate = () =>
  toast.warning("The Category has already been taken..", { transition: Zoom });
const CategoryUpdated = () =>
  toast.info("Category Updated Successfully", { transition: Zoom });
const CategoryDeleted = () =>
  toast.success("Category Deleted Successfully.", { transition: Zoom });

class KbaseView extends React.Component {
  state = {
    addnew: false,
    editerValue: null,
    editorState: "",
    activeList: 1,
    toggleDeleteModal: false,
    toggleCategoryModal: false,
    articleId: "",
  };

  isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  async componentDidMount() {
    if (this.props.kbaseList && !this.props.kbaseList.allCategory) {
      this.props.GetCategoryList(true);
    }

    if (this.props.kbaseList && !this.props.kbaseList.allKbaseData) {
      this.props.GetArticleList(true);
    }
    if (this.props.kbaseList && !this.props.kbaseList.allKbaseArticleData) {
      this.props.GetKbaseArticle(1, true).then(() => {
        if (this.props.kbaseList && this.props.kbaseList.allKbaseArticleData) {
          if (this.isJson(this.props.kbaseList.allKbaseArticleData.article)) {
            this.setState({
              editorState: EditorState.createWithContent(
                convertFromRaw(
                  JSON.parse(this.props.kbaseList.allKbaseArticleData.article)
                )
              ),
            });
          } else {
            this.setState({
              editorState: EditorState.createWithContent(
                ContentState.createFromText(
                  this.props.kbaseList.allKbaseArticleData.article
                )
              ),
            });
          }
        }
      });
    }
    if (
      this.props.kbaseList &&
      this.props.kbaseList.allKbaseArticleData &&
      !this.state.editorState
    ) {
      if (this.isJson(this.props.kbaseList.allKbaseArticleData.article)) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(this.props.kbaseList.allKbaseArticleData.article)
            )
          ),
        });
      } else {
        this.setState({
          editorState: EditorState.createWithContent(
            ContentState.createFromText(
              this.props.kbaseList.allKbaseArticleData.article
            )
          ),
        });
      }
    }
  }

  GetArticle = (data) => {
    this.setState({ addnew: false, editerValue: null });
    if (this.state.activeList !== data) {
      this.setState({ activeList: data });
    }
    this.props.GetKbaseArticle(data, true).then(() => {
      if (this.props.kbaseList && this.props.kbaseList.allKbaseArticleData) {
        if (this.isJson(this.props.kbaseList.allKbaseArticleData.article)) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(this.props.kbaseList.allKbaseArticleData.article)
              )
            ),
          });
        } else {
          this.setState({
            editorState: EditorState.createWithContent(
              ContentState.createFromText(
                this.props.kbaseList.allKbaseArticleData.article
              )
            ),
          });
        }
      }
    });
  };

  AddNew = () => {
    this.setState({ addnew: true, editerValue: null });
  };
  Edit = () => {
    this.setState({
      addnew: true,
      editerValue:
        this.props.kbaseList && this.props.kbaseList.allKbaseArticleData,
    });
  };
  Cancel = () => {
    this.setState({ addnew: false, editerValue: null });
  };

  toggleArticleDeleteModal = (id = false) => {
    if (id) {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        articleId: id,
      });
    } else {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        articleId: "",
      });
    }
  };

  CategoryModal = () => {
    this.setState({ toggleCategoryModal: !this.state.toggleCategoryModal });
  };

  UpdatedDetails = () => {
    this.props.GetArticleList(true).then(() => {
      this.setState({ activeList: 1 });
      this.props.GetKbaseArticle(1, true).then(() => {
        if (this.props.kbaseList && this.props.kbaseList.allKbaseArticleData) {
          if (this.isJson(this.props.kbaseList.allKbaseArticleData.article)) {
            this.setState({
              editorState: EditorState.createWithContent(
                convertFromRaw(
                  JSON.parse(this.props.kbaseList.allKbaseArticleData.article)
                )
              ),
            });
          } else {
            this.setState({
              editorState: EditorState.createWithContent(
                ContentState.createFromText(
                  this.props.kbaseList.allKbaseArticleData.article
                )
              ),
            });
          }
        }
      });
    });
  };

  render() {
    const {
      addnew,
      editorState,
      toggleDeleteModal,
      articleId,
      toggleCategoryModal,
    } = this.state;
    const cardheader = {
      // paddingTop: "5px",
      // paddingBottom: "5px",
      // height: "42px",
      paddingTop: "5px",
      paddingLeft: "20px",
      paddingRight: "5px",
      paddingBottom: "5px",
      // padding: "0px 20px !important",
      background: "#dcdbdb",
      // maxHeight: "10%"
    };
    const cardtitle = {
      // marginBottom: "26px"
      // maxWidth: "0%"
      maxWidth: "60%",
      marginBottom: "0px !important",
    };
    const cardbody = {
      paddingTop: "5px",
      paddingBottom: "5px",
    };
    return (
      <Fragment>
        <Row>
          <Col lg="3" md="5" sm="12">
            <Card>
              <CardHeader>
                <Button
                  className="add-new-btn btn-block"
                  color="warning"
                  onClick={this.CategoryModal}
                  outline
                >
                  <span className="align-middle">Category</span>
                </Button>
                <Button
                  className="add-new-btn btn-block"
                  color="primary"
                  onClick={this.AddNew}
                  outline
                >
                  <Plus size={15} />
                  <span className="align-middle">Add New Data</span>
                </Button>
              </CardHeader>
              <CardBody>
                <ListGroup tag="div">
                  {this.props.kbaseList &&
                    this.props.kbaseList.allKbaseData &&
                    this.props.kbaseList.allKbaseData.length > 0 &&
                    this.props.kbaseList.allKbaseData.map((value, index) => (
                      <ListGroupItem
                        tag="a"
                        key={index}
                        className={classnames({
                          active: this.state.activeList === value.id,
                        })}
                        onClick={() => this.GetArticle(value.id)}
                      >
                        {value.topic} <br />{" "}
                        <small className="text-muted">
                          {value.categoryName}
                        </small>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          {this.props.kbaseList && this.props.kbaseList.allArticleLoading ? (
            <Spinner color="primary" className="reload-spinner" />
          ) : (
            ""
          )}
          {addnew ? (
            <Col lg="9" md="7" sm="12">
              <KbaseEditor
                Cancel={this.Cancel}
                AddedNotify={Added}
                ErrorNotify={Error}
                MandatoryNotify={Mandatory}
                DuplicateNotify={Duplicate}
                UpdateNotify={Updated}
                toggleInfoEditor={this.state.addnew}
                Obj={this.state.editerValue}
                categoryList={
                  this.props.kbaseList && this.props.kbaseList.allCategory
                }
                GetArticle={this.GetArticle}
                {...this.props}
              />
            </Col>
          ) : (
            <Col lg="9" md="7" sm="12">
              {this.props.kbaseList &&
                this.props.kbaseList.allKbaseArticleData && (
                  <>
                    {this.props.kbaseList &&
                    this.props.kbaseList.articleDataLoading ? (
                      <Spinner color="primary" className="reload-spinner" />
                    ) : (
                      <Card>
                        <CardHeader style={cardheader}>
                          <CardTitle style={cardtitle}>
                            <div className="module">
                              <p className="line-clamp">
                                {this.props.kbaseList.allKbaseArticleData.topic}
                              </p>
                            </div>
                          </CardTitle>
                          <p className="actions">
                            <Button
                              color="flat-primary"
                              style={{ marginRight: "15px" }}
                              className="actionbutton"
                              onClick={this.Edit}
                            >
                              <Edit size={17} />
                            </Button>
                            <Button
                              color="flat-danger"
                              className="actionbutton"
                              onClick={() =>
                                this.toggleArticleDeleteModal(
                                  this.props.kbaseList.allKbaseArticleData.id
                                )
                              }
                            >
                              <Trash size={17} />
                            </Button>
                          </p>
                        </CardHeader>
                        <div className="chip mb-0 ml-1 mt-1">
                          <div className="chip-body">
                            <span className="chip-text">
                              <span
                                className={`bullet bullet-success bullet-xs`}
                              />
                              <span className="text-capitalize ml-25">
                                Category -{" "}
                                {
                                  this.props.kbaseList.allKbaseArticleData
                                    .categoryName
                                }
                              </span>
                            </span>
                          </div>
                        </div>
                        <CardBody style={cardbody}>
                          <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="kbase-editor"
                            toolbarHidden={true}
                            readOnly={true}
                          />
                        </CardBody>
                      </Card>
                    )}
                  </>
                )}
            </Col>
          )}
        </Row>
        {toggleDeleteModal && (
          <KbaseDelete
            toggleDeleteModal={toggleDeleteModal}
            toggleArticleDeleteModal={this.toggleArticleDeleteModal}
            articleId={articleId}
            deleteArticle={this.props.deleteArticle}
            articleDeletedSuccess={articleDeletedSuccess}
            kbaseList={this.props.kbaseList}
            warningMessage={Error}
            UpdatedDetails={this.UpdatedDetails}
          />
        )}
        {toggleCategoryModal && (
          <KbaseCategory
            toggleCategoryModal={toggleCategoryModal}
            kbaseList={this.props.kbaseList}
            CategoryModal={this.CategoryModal}
            categoryAddedSuccess={CategoryAdded}
            warningMessage={Error}
            CategoryDuplicate={CategoryDuplicate}
            CategoryUpdated={CategoryUpdated}
            CategoryDeleted={CategoryDeleted}
            Mandatory={Mandatory}
            AddNewCategory={this.props.AddNewCategory}
            GetCategoryList={this.props.GetCategoryList}
            UpdateCategory={this.props.UpdateCategory}
            deleteCategory={this.props.deleteCategory}
            categoryList={
              this.props.kbaseList && this.props.kbaseList.allCategory
            }
            UpdatedDetails={this.UpdatedDetails}
          />
        )}
        <ToastContainer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    kbaseList: state.KbaseList,
  };
};
export default connect(mapStateToProps, {
  AddNewArticle,
  GetArticleList,
  GetKbaseArticle,
  UpdateArticle,
  deleteArticle,
  AddNewCategory,
  GetCategoryList,
  UpdateCategory,
  deleteCategory,
  AddNewKbaseImage 
})(KbaseView);
