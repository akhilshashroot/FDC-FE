import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { ArrowLeft, Edit, Trash } from "react-feather";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { EditorState, ContentState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./style.scss";
import DocsUpdate from "./documentUpdate";

class DocumentationView extends React.Component {
  state = {
    addnew: false,
    editerValue: null,
    editorState: "",
    activeList: 1,
    toggleDeleteModal: false,
    toggleCategoryModal: false,
    docId: "",
    loading: false,
    docsUpdate: false,
  };
  isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.GetADocument(this.props.docid, false).then(() => {
      if (
        this.props.DocumentationList &&
        this.props.DocumentationList.particularDocumentData
      ) {
        this.setState({ loading: false });
        if (
          this.isJson(
            this.props.DocumentationList.particularDocumentData.doc_description
          )
        ) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(
                  this.props.DocumentationList.particularDocumentData
                    .doc_description
                )
              )
            ),
          });
        } else {
          this.setState({
            editorState: EditorState.createWithContent(
              ContentState.createFromText(
                this.props.DocumentationList.particularDocumentData
                  .doc_description
              )
            ),
          });
        }
      } else if (
        this.props.DocumentationList &&
        this.props.DocumentationList.particularDocumentDataFailure
      ) {
        this.setState({ loading: false });
        this.props.Error();
      }
    });
  }

  Edit = (id) => {
    this.docsUpdate(id);
  };

  docsUpdate = (id) => {
    if (id) {
      this.setState({
        docsUpdate: !this.state.docsUpdate,
        editerValue:
          this.props.DocumentationList &&
          this.props.DocumentationList.particularDocumentData,
      });
    } else {
      this.setState({ docsUpdate: !this.state.docsUpdate, editerValue: null });
    }
  };

  Reload = () => {
    this.setState({ loading: true });
    this.props.GetADocument(this.props.docid, false).then(() => {
      if (
        this.props.DocumentationList &&
        this.props.DocumentationList.particularDocumentData
      ) {
        this.setState({ loading: false });
        if (
          this.isJson(
            this.props.DocumentationList.particularDocumentData.doc_description
          )
        ) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(
                  this.props.DocumentationList.particularDocumentData
                    .doc_description
                )
              )
            ),
          });
        } else {
          this.setState({
            editorState: EditorState.createWithContent(
              ContentState.createFromText(
                this.props.DocumentationList.particularDocumentData
                  .doc_description
              )
            ),
          });
        }
      } else if (
        this.props.DocumentationList &&
        this.props.DocumentationList.particularDocumentDataFailure
      ) {
        this.setState({ loading: false });
        this.props.Error();
      }
    });
  };

  render() {
    const { editorState, loading, docsUpdate } = this.state;
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
        {docsUpdate === false && (
          <Row>
            <Col sm="12">
              <div style={{ float: "right" }}>
                <Button.Ripple
                  className="btn-block mb-1"
                  color="flat-primary"
                  onClick={() => this.props.docsClick()}
                >
                  <ArrowLeft size={15} style={{ marginLeft: "5px" }} />
                  <span className="align-middle">Back</span>
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        )}
        {loading === true ? (
          <Spinner color="primary" className="reload-spinner" />
        ) : (
          <>
            {docsUpdate === false && (
              <Card>
                <CardHeader style={cardheader}>
                  <CardTitle style={cardtitle}>
                    <div className="module">
                      <p className="line-clamp">
                        {this.props.DocumentationList &&
                          this.props.DocumentationList.particularDocumentData &&
                          this.props.DocumentationList.particularDocumentData
                            .doc_name}
                      </p>
                    </div>
                  </CardTitle>
                  {(this.props.user_role === "Admin" ||
                    this.props.user_role === "Senior Sales") && (
                    <p className="actions">
                      <Button
                        color="flat-primary"
                        style={{ marginRight: "15px" }}
                        className="actionbutton"
                        onClick={() =>
                          this.Edit(
                            this.props.DocumentationList &&
                              this.props.DocumentationList
                                .particularDocumentData &&
                              this.props.DocumentationList
                                .particularDocumentData.id
                          )
                        }
                      >
                        <Edit size={17} />
                      </Button>
                      <Button
                        color="flat-danger"
                        className="actionbutton"
                        onClick={() =>
                          this.props.toggleDocDeleteModal(
                            this.props.DocumentationList &&
                              this.props.DocumentationList
                                .particularDocumentData &&
                              this.props.DocumentationList
                                .particularDocumentData.id
                          )
                        }
                      >
                        <Trash size={17} />
                      </Button>
                    </p>
                  )}
                </CardHeader>
                <div className="chip-wrapper">
                  <div className="chip mb-0 ml-1 mt-1">
                    <div className="chip-body">
                      <span className="chip-text">
                        <span className={`bullet bullet-success bullet-xs`} />
                        <span className="text-capitalize ml-25">
                          {this.props.DocumentationList &&
                            this.props.DocumentationList
                              .particularDocumentData &&
                            this.props.DocumentationList.particularDocumentData
                              .alias}
                          {this.props.DocumentationList &&
                            this.props.DocumentationList
                              .particularDocumentData &&
                            this.props.DocumentationList.particularDocumentData
                              .user_role_id === 3 &&
                            this.props.DocumentationList.particularDocumentData
                              .location === null &&
                            " - Global"}
                          {this.props.DocumentationList &&
                            this.props.DocumentationList
                              .particularDocumentData &&
                            this.props.DocumentationList.particularDocumentData
                              .user_role_id === 3 &&
                            this.props.DocumentationList.particularDocumentData
                              .location !== null &&
                            " - " +
                              this.props.DocumentationList
                                .particularDocumentData.location}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="chip mb-0 ml-1 mt-1">
                    <div className="chip-body">
                      <span className="chip-text">
                        <span className={`bullet bullet-danger bullet-xs`} />
                        <span className="text-capitalize ml-25">
                          {" "}
                          Written By -
                          {this.props.DocumentationList &&
                            this.props.DocumentationList
                              .particularDocumentData &&
                            this.props.DocumentationList.particularDocumentData
                              .name}
                        </span>
                      </span>
                    </div>
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
        {docsUpdate === true && (
          <DocsUpdate
            Obj={this.state.editerValue}
            docsUpdate={this.docsUpdate}
            locationList={this.props.locationList}
            userList={this.props.userList}
            DocumentationList={this.props.DocumentationList}
            UpdateDocument={this.props.UpdateDocument}
            Updated={this.props.Updated}
            Error={this.props.Error}
            Mandatory={this.props.Mandatory}
            Duplicate={this.props.Duplicate}
            Reload={this.Reload}
            docid={this.props.docid}
            AddNewDocumentImage={this.props.AddNewDocumentImage}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.userProfile,
  };
};

export default connect(mapStateToProps, {})(DocumentationView);
