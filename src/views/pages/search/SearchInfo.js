import React from "react"
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup, Table
} from "reactstrap"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../assets/scss/plugins/extensions/editor.scss"

class SearchInfo extends React.Component {
    state = {
        modal: false,
    }
    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-info">
                        Info
                    </ModalHeader>
                    <ModalBody >
                        <FormGroup>
                            <h2>Port Info</h2>
                            <Table bordered responsive style={{ width: "99%" }}>
                                <tbody>
                                    <tr>
                                        <th>Location</th><td>{this.props.data && this.props.data.loc_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Switch</th><td>{this.props.data && this.props.data.switch_label}</td>
                                    </tr>
                                    <tr>
                                        <th>Port</th><td>{this.props.data && this.props.data.port_no}</td>
                                    </tr>
                                    <tr>
                                        <th>Bandwidth</th><td>{this.props.data && this.props.data.bw}</td>
                                    </tr>
                                    <tr>
                                        <th>VLAN</th><td>{this.props.data && this.props.data.vlan}</td>
                                    </tr>
                                    <tr>
                                        <th>IP</th><td>{this.props.data && this.props.data.ip}</td>
                                    </tr>
                                    <tr>
                                        <th>Port info</th><td>{this.props.data && this.props.data.port_info}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </FormGroup>
                        <FormGroup>
                            <h2>Server Info</h2>
                            <Table bordered responsive style={{ width: "99%" }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "150px" }}>Label</th><td>{this.props.data && this.props.data.label}</td>
                                    </tr>
                                    <tr>
                                        <th>IPMI Port</th><td>{this.props.data && this.props.data.ipmi_port}</td>
                                    </tr>
                                    <tr>
                                        <th>IPMI IP</th><td>{this.props.data && this.props.data.ipmi_ip}</td>
                                    </tr>
                                    {
                                        (localStorage.getItem("user_role") === "Sales") || (localStorage.getItem("user_role") === "Senior Sales")
                                            ?
                                            null
                                            :

                                            <tr>
                                                <th>IPMI Password</th><td>{this.props.data && this.props.data.ipmi_pwd}</td>
                                            </tr>
                                    }

                                    <tr>
                                        <th>Server</th><td>{this.props.data && this.props.data.server}</td>
                                    </tr>
                                    <tr>
                                        <th>CPU</th><td>{this.props.data && this.props.data.cpu}</td>
                                    </tr>
                                    <tr>
                                        <th>RAM</th><td>{this.props.data && this.props.data.ram}</td>
                                    </tr>
                                    <tr>
                                        <th>Disks</th><td>{this.props.data && this.props.data.hdd}</td>
                                    </tr>
                                    <tr>
                                        <th>PDU port(s)</th><td>{this.props.data && this.props.data.pdu_port}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th><td>{this.props.data && this.props.data.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Service ID</th><td>{this.props.data && this.props.data.service_id}</td>
                                    </tr>
                                    <tr>
                                        <th>Server info</th><td>{this.props.data && this.props.data.server_info}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </FormGroup>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default SearchInfo
