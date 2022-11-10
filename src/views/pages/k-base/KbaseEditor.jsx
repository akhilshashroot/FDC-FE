import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Label,
  Input,
  FormGroup,
  CardFooter,
} from "reactstrap";
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class KbaseEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    modal: false,
    firstRender: true,
    topic: "",
    category: "",
    topicvalid: false,
    categoryvalid: false,
  };

  isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  convertCategory = (data) => {
    var locationData = [];
    data &&
      data.forEach((value) => {
        locationData.push({ label: value.categoryName, value: value.id });
      });
    return locationData;
  };

  componentDidMount() {
    this.props.toggleInfoEditor && this.setState({ modal: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.Obj && prevState.firstRender) {
      if (this.isJson(this.props.Obj.article)) {
        if (this.props.categoryList) {
          let selectedCategory = {};
          selectedCategory = this.props.categoryList.find(
            (value) => value.id === this.props.Obj.catId
          );
          let category = {
            label: selectedCategory.categoryName,
            value: selectedCategory.id,
          };
          this.setState({ category: category });
        }
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(this.props.Obj.article))
          ),
          firstRender: false,
          topic: this.props.Obj.topic,
        });
      } else {
        if (this.props.categoryList) {
          let selectedCategory = {};
          selectedCategory = this.props.categoryList.find(
            (value) => value.id === this.props.Obj.catId
          );
          let category = {
            label: selectedCategory.categoryName,
            value: selectedCategory.id,
          };
          this.setState({ category: category });
        }
        this.setState({
          editorState: EditorState.createWithContent(
            ContentState.createFromText(this.props.Obj.article)
          ),
          firstRender: false,
          topic: this.props.Obj.topic,
        });
      }
    }
    if (this.props.Obj === null && prevProps.Obj !== null) {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleCategoryChange = (category) => {
    this.setState({ category });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.props.Cancel();
  };

  handleSubmit = () => {
    var content = this.state.editorState.getCurrentContent();
    var sendData = JSON.stringify(convertToRaw(content));

    if (this.props.Obj === null) {
      let Data = {};
      Data.catId = this.state.category.value;
      Data.article = sendData;
      Data.topic = this.state.topic;
      this.props.AddNewArticle(Data).then(() => {
        if (this.props.kbaseList && this.props.kbaseList.addedArticle) {
          this.props.GetArticleList();
          this.toggleModal();
          this.props.AddedNotify();
        } else {
          if ((this.state.topic && this.state.category) === "") {
            this.state.category
              ? this.setState({ categoryvalid: false })
              : this.setState({ categoryvalid: true });
            this.state.topic
              ? this.setState({ topicvalid: false })
              : this.setState({ topicvalid: true });
            this.props.MandatoryNotify();
          } else if (
            this.props.kbaseList &&
            this.props.kbaseList.addArticleError &&
            this.props.kbaseList.addArticleError.response &&
            this.props.kbaseList.addArticleError.response.data &&
            this.props.kbaseList.addArticleError.response.data.errors &&
            this.props.kbaseList.addArticleError.response.data.errors
              .topic[0] === "The topic has already been taken."
          ) {
            this.props.DuplicateNotify();
          } else {
            this.props.ErrorNotify();
          }
        }
      });
    } else {
      let Data = {};
      if (this.state.topic !== this.props.Obj.topic) {
        Data.topic = this.state.topic;
        Data.catId = this.state.category.value;
        Data.article = sendData;
      } else {
        Data.catId = this.state.category.value;
        Data.article = sendData;
      }
      var id = this.props.Obj.id;
      this.props.UpdateArticle(id, Data).then(() => {
        if (
          this.props.kbaseList &&
          this.props.kbaseList.articleUpdatedSuccess
        ) {
          this.props.GetArticleList();
          this.props.GetArticle(id);
          this.toggleModal();
          this.props.UpdateNotify();
        } else {
          if ((this.state.topic && this.state.category) === "") {
            this.state.category
              ? this.setState({ categoryvalid: false })
              : this.setState({ categoryvalid: true });
            this.state.topic
              ? this.setState({ topicvalid: false })
              : this.setState({ topicvalid: true });
            this.props.MandatoryNotify();
          } else if (
            this.props.kbaseList &&
            this.props.kbaseList.articleUpdatedError &&
            this.props.kbaseList.articleUpdatedError.response &&
            this.props.kbaseList.articleUpdatedError.response.data &&
            this.props.kbaseList.articleUpdatedError.response.data.errors &&
            this.props.kbaseList.articleUpdatedError.response.data.errors
              .topic[0] === "The topic has already been taken."
          ) {
            this.props.DuplicateNotify();
          } else {
            this.props.ErrorNotify();
          }
        }
      });
    }
  };

  uploadImageCallBack = async (file) => {
    const res = await this.props.AddNewKbaseImage(file);
    if (res?.data?.data) {
      return new Promise((resolve, reject) => {
        resolve({ data: { link: res.data?.data } });
      });
    }
  };

  render() {
    const { editorState, topic } = this.state;
    const modalbody = {
      paddingBottom: "0px",
    };
    const modalfooter = {
      paddingBottom: "10px",
      paddingTop: "10px",
    };
    const header = {
      paddingBottom: "10px",
      paddingTop: "10px",
    };
    return (
      <React.Fragment>
        <Card>
          <CardHeader style={header} className="bg-primary">
            <CardTitle>
              {this.props.Obj !== null ? "Update Article" : "Add New Article"}
            </CardTitle>
          </CardHeader>
          <CardBody style={modalbody}>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="data-category">
                    Category <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Select
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                    options={this.convertCategory(
                      this.props.categoryList && this.props.categoryList
                    )}
                    //   isMulti={true}
                    isSearchable={true}
                  />
                  {/* <Input type="select" name="category" id="data-category" invalid={this.state.categoryvalid} value={this.state.category} onChange={this.handleCategoryChange}>
                                        <option value="">Select Category</option>
                                        <option value="main">Main</option>
                                    </Input> */}
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="data-topic">
                    Topic <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={topic}
                    placeholder="Topic"
                    onChange={(e) => this.setState({ topic: e.target.value })}
                    id="data-topic"
                    invalid={this.state.topicvalid}
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <CardTitle>Article</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      toolbar={{
                        image: {
                          uploadCallback: this.uploadImageCallBack,
                          previewImage: true,
                        },
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
          <CardFooter style={modalfooter}>
            <Button color="primary" onClick={this.handleSubmit}>
              {this.props.Obj !== null ? "Update" : "Add"}
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              color="primary"
              onClick={this.toggleModal}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

export default KbaseEditor;