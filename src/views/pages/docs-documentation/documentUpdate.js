import React from "react"
import {
    Row, Col, Card, CardHeader, CardBody, CardTitle, Button,
    Label, Input, FormGroup, CardFooter
} from "reactstrap"
import Select from 'react-select';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../assets/scss/plugins/extensions/editor.scss"
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { ArrowLeft } from "react-feather"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

const usertype = [
    { "label": "Admin", "value": 1 },
    { "label": "Support", "value": 2 },
    { "label": "Manager", "value": 4 },
    { "label": "Sales", "value": 5 },
    { "label": "Remote", "value": 3 },
    { "label": "Senor Sales", "value": 6 },
]
class DocumentUpdate extends React.Component {

    state = {
        editorState: EditorState.createEmpty(),
        modal: false,
        firstRender: true,
        templocationlist: null,
        topic: "",
        user: "",
        location: "",
        topicvalid: false,
        uservalid: false,
        loading: false,
        remote: false,

    }

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    convertUser = data => {
        var userdata = []
        data && data.forEach((value) => {
            userdata.push({ "label": value.name, "value": value.id })
        })
        return userdata
    }

    convertLocation = data => {
        var locationData = []
        locationData.push({ "label": "Global", "value": -1 })
        data && data.forEach((value) => {
            locationData.push({ "label": value.location, "value": value.id })
        })
        return locationData
    }

    handleLocationChange = location => {
        this.setState({ location })
    }


    componentDidMount() {
        this.setState({ user: { "label": "Admin", "value": 1 } })
        // this.props.toggleInfoEditor && this.setState({ modal: true })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.Obj && prevState.firstRender) {
            if (this.isJson(this.props.Obj.doc_description)) {
                let selectedUser = {}
                selectedUser = this.props.userList.find((value) => value.id === this.props.Obj.user_role_id)
                let user = {"label": selectedUser.name, "value": selectedUser.id}
                this.setState({ user: user })
                if (this.props.Obj.user_role_id === 3) {
                    if (this.props.locationList && this.props.locationList.allData) {
                        var locationData = []
                        locationData.push({ "label": "Global", "value": -1 })
                        this.props.locationList && this.props.locationList.allData && this.props.locationList.allData.forEach((value) => {
                            locationData.push({ "label": value.location, "value": value.id })
                        })
                        let selectedLocation = {}
                        selectedLocation = locationData.find((value) => value.value === this.props.Obj.loc_id)
                        this.setState({ location: selectedLocation, remote: true })
                    }
                }
                this.setState({
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.Obj.doc_description))),
                    firstRender: false,
                    topic: this.props.Obj.doc_name

                })
            } else {
                let selectedUser = {}
                selectedUser = usertype.find((value) => value.id === this.props.Obj.user_role_id)
                this.setState({ user: selectedUser })
                if (this.props.Obj.user_role_id === 3) {
                    if (this.props.locationList && this.props.locationList.allData) {
                        locationData = []
                        locationData.push({ "label": "Global", "value": -1 })
                        this.props.locationList && this.props.locationList.allData && this.props.locationList.allData.forEach((value) => {
                            locationData.push({ "label": value.location, "value": value.id })
                        })
                        let selectedLocation = {}
                        selectedLocation = locationData.find((value) => value.value === this.props.Obj.loc_id)
                        this.setState({ location: selectedLocation, remote: true })
                    }
                }
                this.setState({
                    editorState: EditorState.createWithContent(ContentState.createFromText(this.props.Obj.doc_description)),
                    firstRender: false,
                    topic: this.props.Obj.doc_name
                })
            }

        }
        if (this.props.Obj === null && prevProps.Obj !== null) {
            this.setState({ editorState: EditorState.createEmpty() })
        }
    }

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        })
    }

    handleUserChange = user => {
        this.setState({ user })
        if (user.value === 3) {
            this.setState({ remote: true })
            this.setState({ location: { "label": "Global", "value": -1 } })
        }
        else {
            this.setState({ remote: false })
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
        this.props.Cancel()
    }



    handleSubmit = () => {
        var content = this.state.editorState.getCurrentContent();
        var sendData = JSON.stringify(convertToRaw(content));
        if (this.state.topic === "" || this.state.topic == null) {
            this.props.Mandatory()
        }
        else {
            let Data = {}
            Data.user_role_id = this.state.user.value
            if (Data.user_role_id === 3) {
                Data.loc_id = this.state.location.value
            }
            Data.doc_description = sendData
            Data.doc_name = this.state.topic
            this.props.UpdateDocument(this.props.docid, Data).then(() => {
                if (this.props.DocumentationList && this.props.DocumentationList.documentUpdatedSuccess) {
                    this.props.Updated()
                    this.props.Reload()
                    this.props.docsUpdate()
                } else {
                    if (this.props.DocumentationList && this.props.DocumentationList.documentUpdatedError && this.props.DocumentationList.documentUpdatedError.response
                        && this.props.DocumentationList.documentUpdatedError.response.data && this.props.DocumentationList.documentUpdatedError.response.data.errors
                        && this.props.DocumentationList.documentUpdatedError.response.data.errors.doc_name
                        && this.props.DocumentationList.documentUpdatedError.response.data.errors.doc_name[0] === "The doc name has already been taken.") {
                        this.props.Duplicate()
                    }
                    else {
                        this.props.Error()
                    }
                }
            })
        }
    }

    render() {
        const { editorState, topic, user, remote } = this.state
        const modalbody = {
            paddingBottom: "0px"
        }
        const modalfooter = {
            paddingBottom: "10px",
            paddingTop: "10px"
        }
        const header = {
            paddingBottom: "10px",
            paddingTop: "10px"
        }
        return (
            <React.Fragment>
                {(this.props.locationList.isLoading) ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                        <>
                            <Row>
                                <Col sm="12">
                                    <div style={{ float: "right" }}>
                                        <Button.Ripple
                                            className="btn-block mb-1"
                                            color="flat-primary"
                                            onClick={() => this.props.docsUpdate()}
                                        >
                                            <ArrowLeft size={15} style={{ marginLeft: "5px" }} />
                                            <span className="align-middle">Back</span>
                                        </Button.Ripple>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Card>
                                    <CardHeader style={header} className="bg-primary">
                                        <CardTitle>Update Document</CardTitle>
                                    </CardHeader>
                                    <CardBody style={modalbody}>
                                        <Row>
                                            <Col sm="4">
                                                <FormGroup>
                                                    <Label for="data-category">User <span style={{ color: "red" }}>*</span></Label>
                                                    <Select
                                                      styles={{
                                                        // Fixes the overlapping problem of the component
                                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                                      }}
                                                        value={user}
                                                        onChange={this.handleUserChange}
                                                        options={this.convertUser(this.props.userList)}
                                                        isSearchable={true}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            {remote &&
                                                <Col sm="4">
                                                    <FormGroup>
                                                        <Label for="data-category">Location <span style={{ color: "red" }}>*</span></Label>
                                                        <Select
                                                          styles={{
                                                            // Fixes the overlapping problem of the component
                                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                                          }}
                                                            value={this.state.location}
                                                            onChange={this.handleLocationChange}
                                                            options={this.convertLocation(this.props.locationList && this.props.locationList.allData)}
                                                            isSearchable={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            }
                                            <Col sm="4">
                                                <FormGroup>
                                                    <Label for="data-topic">Document Name <span style={{ color: "red" }}>*</span></Label>
                                                    <Input
                                                        type="text"
                                                        value={topic}
                                                        placeholder="Name"
                                                        onChange={e => this.setState({ topic: e.target.value })}
                                                        id="data-topic"
                                                        invalid={this.state.topicvalid}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Document</CardTitle>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Editor
                                                            editorState={editorState}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor"
                                                            onEditorStateChange={this.onEditorStateChange}
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter style={modalfooter}>
                                        <Button color="primary" onClick={this.handleSubmit}>
                                            Update
                                        </Button>
                                        <Button style={{ marginLeft: "10px" }} color="primary" onClick={() => this.props.docsUpdate()}>
                                            Cancel
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Row></>
                    )}
            </React.Fragment>
        )
    }
}

export default DocumentUpdate