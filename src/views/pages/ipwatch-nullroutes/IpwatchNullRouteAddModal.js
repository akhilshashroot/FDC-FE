import React, { Fragment } from "react"
import {
    Col, Button, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    CustomInput
} from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"

class IpwatchNullRouteAddModal extends React.PureComponent {
    state = {
        firstRender: true,
        logData: [],
        totalPages: 0,
        startPage: 1,
        selectedPage: 0,
        ip: "",
        tag: "",
        expire: "",
        notes: "",
        notify: false
    }


    toggleModal = () => {
        this.props.closeAddModal()
    }

    addNullRouteMethod = () => {
        if (this.state.ip) {
            let data = {};
           
            data.ip = this.state.ip ? this.state.ip.trim() : "";
            // data.tag = this.state.tag ? parseInt(this.state.tag) : 600;
            data.tag = this.state.tag ? this.state.tag : "";
            data.expire = this.state.expire ? this.state.expire : "0";
            data.notes = this.state.notes ? this.state.notes.trim() : null;
            data.notify = this.state.notify ? this.state.notify : false;
            // console.log(data)
            // { "index": 20, "id": 20, "ip_address": "50.7.177.5", "first_seen": "88d 6h 28m 52s", "expires": "Never", "notes": "TICKET #1265115 FDC Abuse Report: 50.7.177.5 (Service #129859)" }
            this.props.addNullRoute(data).then(() => {
                if (this.props.nullRoutes && this.props.nullRoutes.nullRouteAddSuccess) {
                    this.props.nullRouteAddedSucsess()
                    this.props.closeAddModal()
                } else {
                    if(this.props.nullRoutes && this.props.nullRoutes.nullRouteAddError){
                        if(this.props.nullRoutes.nullRouteAddError.ip){
                            this.props.validationMessage(this.props.nullRoutes.nullRouteAddError.ip[0])
                        }
                    }else{
                        this.props.warningMessage()
                    }  
                }

            })
        } else {
            this.props.fillDataWarning()
        }
    }

    render() {
        const { ip, tag, expire, notes } = this.state
        const help_block = {
            display: "block",
            marginTop: "5px",
            marginBottom: "10px",
            color: "#737373"
        }
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleAddModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-lg"
                >
                    <ModalHeader
                        toggle={() => this.toggleModal()}
                        className="bg-primary"
                    >
                        Add Null Route
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Col md="4">
                                    <span>IP<span style={{ color: "red" }}>*</span></span>
                                </Col>
                                <Col md="8">
                                    <Input
                                        type="text"
                                        name="ip"
                                        id="ip"
                                        placeholder="IP"
                                        value={ip || ""}
                                        onChange={(e) => this.setState({ ip: e.target.value })}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="4">
                                    <span>Tag</span>
                                </Col>
                                <Col md="8">
                                    <CustomInput
                                        type="select"
                                        name="tag"
                                        id="tag"
                                        // value={tag || ""}
                                        defaultValue={'DEFAULT'}
                                        onChange={(e) => this.setState({ tag: e.target.value })}  >
                                           <option value="DEFAULT" disabled>Select Tag</option>   
                                        <option value="666">DDoS (Tag 666)</option>
                                        <option value="100">Abuse (Tag 100)</option>
                                        <option value="200">Scans (Tag 200)</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="4">
                                    <span>Expire</span>
                                </Col>
                                <Col md="8">
                                    <CustomInput
                                        type="select"
                                        name="expire"
                                        id="expire"
                                        value={expire || ""}
                                        onChange={(e) => this.setState({ expire: e.target.value })}
                                    >
                                        <option value="0">Never</option>
                                        <option value="6">6 Hours</option>
                                        <option value="12">12 Hours</option>
                                        <option value="24">24 Hours</option>
                                        <option value="48">48 Hours</option>
                                        <option value="72">72 Hours</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="4">
                                    <span>Notes</span>
                                </Col>
                                <Col md="8">
                                    <Input
                                        type="textarea"
                                        name="notes"
                                        rows={3}
                                        id="notes"
                                        placeholder="Notes"
                                        value={notes || ""}
                                        onChange={(e) => { this.setState({ notes: e.target.value }) }}
                                    />
                                    <span style={help_block}>(Optional)</span>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="4">
                                    <span>Notification</span>
                                </Col>
                                <Col md="8">
                                    <Checkbox
                                        color="primary"
                                        icon={<Check className="vx-icon" size={16} />}
                                        label="Send null route notification to client."
                                        onChange={(e) => {this.setState({ notify: e.target.checked }) }}
                                        // onClick={this.handleClick}
                                        defaultChecked={false}
                                    />
                                </Col>
                            </FormGroup>



                            {/* <FormGroup row>
                                <Col md={{ size: 8, offset: 4 }}>
                                    <Button.Ripple
                                        color="primary"
                                        type="submit"
                                        className="mr-1 mb-1"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Submit
                                    </Button.Ripple>
                                    <Button.Ripple
                                        outline
                                        color="warning"
                                        type="reset"
                                        className="mb-1"
                                    >
                                        Reset
                                    </Button.Ripple>
                                </Col>
                            </FormGroup> */}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.addNullRouteMethod}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default IpwatchNullRouteAddModal