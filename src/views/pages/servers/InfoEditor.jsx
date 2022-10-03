import React from "react"
import {
    Row, Col, Card, CardBody, Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../assets/scss/plugins/extensions/editor.scss"
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg"

class InfoEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        modal: false,
        firstRender: true
    }

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    componentDidMount() {
        this.props.toggleInfoEditor && this.setState({ modal: true })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.serverObj && prevState.firstRender) {
            if (this.isJson(this.props.serverObj)) {
                this.setState({
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.serverObj))),
                    firstRender: false
                })
            } else {
                this.setState({
                    editorState: EditorState.createWithContent(ContentState.createFromText(this.props.serverObj)),
                    firstRender: false
                })
            }

        }
        if (this.props.serverObj === null && prevProps.serverObj !== null) {
            this.setState({ editorState: EditorState.createEmpty() })
        }
    }

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
        this.props.closeInfoEditorModal();
    }

    updateLocationInfo = () => {
        var content = this.state.editorState.getCurrentContent();
        var sendData = JSON.stringify(convertToRaw(content));
        var loc_id = this.props.selectedLocation && this.props.selectedLocation.value
        let updateData = {}
        updateData.data = sendData
        this.props.updateInfoVpsData("info", loc_id, updateData).then(() => {
            if (this.props.serverList && this.props.serverList.info_vps_update_success) {
                this.toggleModal()
                this.props.notifyInfoUpdated();
            } else {
                this.props.notifyError()
            }
        })
    }

    render() {
        const { editorState } = this.state

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-xl"
                >
                    <ModalHeader className="bg-primary" toggle={this.toggleModal}>
                        Edit Info
                </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm="12">
                                <Card>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.toggleModal()}>
                            Cancel
                    </Button>{" "}
                        <Button color="primary" onClick={(e) => this.updateLocationInfo(this.props.serverObj)}>
                            Update
                    </Button>{" "}
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        )
    }
}

export default InfoEditor
