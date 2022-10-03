import React from "react"
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup, Table, ModalFooter, Button
} from "reactstrap"
import { Edit, Trash, Info, Eye, Server, XSquare, ChevronLeft, ChevronRight, Settings, Search, File, Check, X, EyeOff } from "react-feather";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import {addPasswordLog} from "../../../redux/actions/servers";
class ServerInfo extends React.Component {
    state = {
        modal: false,
        logmodal: false,
        showpass:false,
    }
    handlePassView=(props)=>{
        if(this.state.showpass === false) {

            this.setState({showpass:true})

            let addPasslog={};

            //for main ports
             if ( this.props.selectedPort.switchIds || this.props.selectedPort.switchIds == ""){
              
                let switchvalue = this.props.selectedPort.switchIds;
                let portvalue = this.props.selectedPort.port_ids;
    
                //for comma seperated switches
                if (switchvalue.indexOf(',') > -1) { 
                let commaswitch = switchvalue.split(',') 
                let swtichid = commaswitch[0]
                addPasslog.switch_id = swtichid;
                 }else if (switchvalue=""){
                    addPasslog.switch_id = null;
                 }
                 else {
                addPasslog.switch_id = this.props.selectedPort.switchIds;
                 }
    
                  //for comma seperated port values
                  if (portvalue.indexOf(',') > -1) { 
                    let commaport = portvalue.split(',') 
                    let portid = commaport[0]
                    addPasslog.port_id = portid;
                     }else if (portvalue=""){
                        addPasslog.port_id = null;
                     }
                     else {
                    addPasslog.port_id = this.props.selectedPort.port_ids;
                     }
                 addPasslog.user_id = localStorage.getItem("user_id");
                 addPasslog.location_id = this.props.selectedLocation.value;
                 addPasslog.server_label = this.props.selectedPort.label;              
                 this.props.addPasswordLog(addPasslog)
    
             } 
    
             //for sub ports
             else if (this.props.selectedPort.switch_ids || this.props.selectedPort.switch_ids == "" ){
    
                let switchvalue = this.props.selectedPort.switch_ids;
                let portvalue = this.props.selectedPort.port_ids;
    
                //for comma seperated switches
                if (switchvalue.indexOf(',') > -1) { 
                let commaswitch = switchvalue.split(',') 
                let swtichid = commaswitch[0]
                addPasslog.switch_id = swtichid;
                 } else if (switchvalue=""){
                    addPasslog.switch_id = null;
                 }
                 else {
                addPasslog.switch_id = this.props.selectedPort.switch_ids;
                 }
    
                 //for comma seperated port values
                 if (portvalue.indexOf(',') > -1) { 
                    let commaport = portvalue.split(',') 
                    let portid = commaport[0]
                    addPasslog.port_id = portid;
                     }else if (portvalue=""){
                        addPasslog.port_id = null;
                     }
                     else {
                    addPasslog.port_id = this.props.selectedPort.port_ids;
                     }
                 addPasslog.user_id = localStorage.getItem("user_id");
                 addPasslog.location_id = this.props.selectedLocation.value;
                 addPasslog.server_label = this.props.selectedPort.label;               
                 this.props.addPasswordLog(addPasslog)
    
             } 

        
            
        } else{
            this.setState({showpass:false})
        }
    
    }
    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }

    goLogView = () => {
        // this.toggleModal()
        this.props.logtoggleModal()
    }
   
    render() {
      
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.toggleInfoModal}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-info">
                        Info
                    </ModalHeader>
                    <ModalBody >
                        {!this.props.changeColumns &&
                            <FormGroup>
                                <h2>Port Info</h2>
                                <Table bordered responsive style={{ width: "99%" }}>
                                    <tbody>
                                        <tr>
                                            <th>Location</th><td>{this.props.selectedLocation && this.props.selectedLocation.label}</td>
                                        </tr>
                                        <tr>
                                            <th>Switch</th><td>{this.props.selectedTab && this.props.selectedTab.label}</td>
                                        </tr>
                                        <tr>
                                            <th>Port</th><td>{this.props.selectedPort && this.props.selectedPort.port_no}</td>
                                        </tr>
                                        <tr>
                                            <th>Bandwidth</th><td>{this.props.selectedPort && this.props.selectedPort.bw}</td>
                                        </tr>
                                        <tr>
                                            <th>VLAN</th><td>{this.props.selectedPort && this.props.selectedPort.vlan}</td>
                                        </tr>
                                        <tr>
                                            <th>IP</th><td>{this.props.selectedPort && this.props.selectedPort.ip}</td>
                                        </tr>
                                        <tr>
                                            <th>Port info</th><td>{this.props.selectedPort && this.props.selectedPort.port_info}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </FormGroup>
                        }

                        <FormGroup>
                            <h2>Server Info</h2>
                            <Table bordered responsive style={{ width: "99%" }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "150px" }}>Label</th><td>{this.props.selectedPort && this.props.selectedPort.label}</td>
                                    </tr>
                                    <tr>
                                        <th>IPMI Port</th><td>{this.props.selectedPort && this.props.selectedPort.ipmi_port}</td>
                                    </tr>
                                    <tr>
                                        <th>IPMI IP</th><td>{this.props.selectedPort && this.props.selectedPort.ipmi_ip}</td>
                                    </tr>
                                    {
                                        (localStorage.getItem("user_role") === "Sales") || (localStorage.getItem("user_role") === "Senior Sales")
                                            ?
                                            null
                                            :

                                            <tr>
                                                <th>IPMI Password</th><td>
                                                {this.props.selectedPort && this.props.selectedPort.ipmi_pwd === null || this.props.selectedPort && this.props.selectedPort.ipmi_pwd === "" ? " " :
                                                <span>
                                                {this.state.showpass === false ? 
                                                    <span>
                                                            <b> **********</b>
                                                            <Tooltip title="Show Password" placement="right">
                                                            <Eye tag="a" className="ml-1" size={15} style={{cursor:'pointer'}}  onClick={() => this.handlePassView()}/>
                                                            </Tooltip>
                                                            </span>
                                                           : 
                                                           <span>
                                                            <b> {this.props.selectedPort && this.props.selectedPort.ipmi_pwd}</b>
                                                            <Tooltip title="Hide Password" placement="right">
                                                            <EyeOff tag="a" className="ml-1" size={15} style={{cursor:'pointer'}} onClick={() => this.handlePassView()} />
                                                            </Tooltip>
                                                            </span>
                                                            
                                                 } </span> }        
                                               
                                                </td>
                                            </tr>
                                    }

                                    <tr>
                                        <th>Server</th><td>{this.props.selectedPort && this.props.selectedPort.server}</td>
                                    </tr>
                                    <tr>
                                        <th>CPU</th><td>{this.props.selectedPort && this.props.selectedPort.cpu}</td>
                                    </tr>
                                    <tr>
                                        <th>RAM</th><td>{this.props.selectedPort && this.props.selectedPort.ram}</td>
                                    </tr>
                                    <tr>
                                        <th>Disks</th><td>{this.props.selectedPort && this.props.selectedPort.hdd}</td>
                                    </tr>
                                    <tr>
                                        <th>PDU port(s)</th><td>{this.props.selectedPort && this.props.selectedPort.pdu_port}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th><td>{this.props.selectedPort && this.props.selectedPort.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Service ID</th><td>{this.props.selectedPort && this.props.selectedPort.service_id}</td>
                                    </tr>
                                    <tr>
                                        <th>Device ID</th><td>{this.props.selectedPort && this.props.selectedPort.device_id}</td>
                                    </tr>
                                    <tr>
                                        <th>Server info</th><td>{this.props.selectedPort && this.props.selectedPort.server_info}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="add-new-btn" color="info" onClick={this.goLogView}>
                            <Eye size={15} style={{ marginRight: "5px" }} />
                            <span className="align-middle">View Log</span>
                        </Button>
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        serverList: state.ServerList,
        paginateData: state.paginateData
    }
}
export default connect(mapStateToProps, {
   
    addPasswordLog,
    
})(ServerInfo)

