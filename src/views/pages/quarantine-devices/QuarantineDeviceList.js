import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Form, Row, Col, Button } from "reactstrap";
import { Trash, FileText } from "react-feather";
import { connect } from "react-redux";
import { getDeviceList, deleteDevice, deleteAllDeviceData, getQuarantineLog } from "../../../redux/actions/qarentine-devices";
import { Table } from "reactstrap";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import QuarentineDeleteDevice from "./QuarentineDeleteDevice";

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}


const deviceDeletedSuccess = () => toast.success("Device Deleted Successfully", { transition: Zoom });
const allDeviceDeletedSuccess = () => toast.success("All Devices Deleted Successfully", { transition: Zoom });
const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom });
const deleteError = () => toast.warning("Device not active", { transition: Zoom });

const marginStyle = { marginLeft: "10px" };

const CustomHeader = props => {
    return (
        <Fragment>
            <Form>
                <Row /*style={{ marginBottom: "1.5rem" }}*/>
                    <Col sm="4">
                        <FormGroup>
                            <div className="data-list-header d-flex justify-content-between flex-wrap" >
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.handleActivityLogView()}
                                        outline>
                                        <FileText size={15}
                                        />
                                        <span className="align-middle" style={{ marginLeft: "5px" }}>{props.toggleValue ? "Device List" : "Activity Log"}</span>
                                    </Button>
                                    <Button
                                        style={marginStyle}
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.deleteAlldevice("", "", true)}
                                        outline>
                                        <Trash size={15} />
                                        <span className="align-middle" style={{ marginLeft: "5px" }}>Delete All</span>
                                    </Button>
                                </div>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col sm="8">
                        {/* <FormGroup>
                            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        // onClick={() => props.toggleShipmentAddModal()}
                                        outline>
                                        <Plus size={15}
                                        />
                                        <span className="align-middle">Add Shipment</span>
                                    </Button>
                                </div>
                            </div>
                        </FormGroup> */}
                    </Col>

                </Row>
            </Form>
        </Fragment>
    )
}


class QuarantineDeviceList extends React.Component {

    state = {
        isLoading: false,
        toggleDeleteModal: false,
        deletedeviceid: "",
        result: "",
        deleteindex: "",
        deleteAll: false,
        toggleActivityLog: false,
        activityLogResult: ""
    }

    componentDidMount() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
            if (this.props.QarentineDevices && !this.props.QarentineDevices.deviceList) {
                this.props.getDeviceList().then(() => {
                    this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
                })
            }
            else {
                this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
            }
        } else {
            let data = [
                {
                    "dev": "36315",
                    "dev_desc": "\t50.7.250.226",
                    "type": "Dedicated",
                    "fac_name": "Hong Kong",
                    "owner": " ",
                    "address": "50.7.250.224/29/ 50.7.250.224/29/ 50.7.250.224/29/ 50.7.250.224/29/ 50.7.250.224/29",
                    "label": "Service 128730\t",
                    "location": "HKx:24"
                },
                {
                    "dev": "36314",
                    "dev_desc": "\t50.7.250.234\t",
                    "type": "Dedicated",
                    "fac_name": "Hong Kong",
                    "owner": " ",
                    "address": "",
                    "label": "",
                    "location": "HKx:29"
                },
                {
                    "dev": "36887",
                    "dev_desc": " 23.237.4.178",
                    "type": "Dedicated",
                    "fac_name": "Denver",
                    "owner": "Hussain Naveed",
                    "address": "23.237.4.176/29",
                    "label": "Service 130505",
                    "location": "R02.DEN:19"
                },
                {
                    "dev": "37303",
                    "dev_desc": " 23.237.78.18",
                    "type": "Dedicated",
                    "fac_name": "Miami",
                    "owner": " ",
                    "address": "",
                    "label": "",
                    "location": "MIA:15"
                },
                {
                    "dev": "35343",
                    "dev_desc": " 50.7.236.18",
                    "type": "Dedicated",
                    "fac_name": "Amsterdam 2",
                    "owner": "PAUL-CRISTIAN VARGA",
                    "address": "50.7.236.16/29",
                    "label": "125692",
                    "location": "M7.AMS2:3"
                },
                {
                    "dev": "37142",
                    "dev_desc": "192.240.105.186",
                    "type": "Dedicated",
                    "fac_name": "Chicago 2",
                    "owner": "Serg Cano",
                    "address": "192.240.105.184/29",
                    "label": "Service 133006",
                    "location": "CHI 2:5"
                },
                {
                    "dev": "37459",
                    "dev_desc": "192.240.105.58",
                    "type": "Dedicated",
                    "fac_name": "Chicago 2",
                    "owner": " ",
                    "address": "",
                    "label": "",
                    "location": "CHI 2:23"
                }
            ]
            // this.props.getQuarantineLog().then(() => {
            //     let resultObj = this.props.QarentineDevices.logData
            //     let resultArr = [];
            //     var i = 0;
            //     for (i in resultObj) {
            //         resultArr.push(resultObj[i])
            //     }

            //     this.setState({ activityLogResult: resultArr, isLoading: true })
            // })

            // this.setState({ result: data, isLoading: true })
            if (this.props.QarentineDevices && !this.props.QarentineDevices.deviceList) {
                this.props.getDeviceList().then(() => {
                    this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
                })
            }
            else {
                this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
            }
        }
    }

    deviceDelete = (id, index, deleteAll) => {
        this.setState({ toggleDeleteModal: true, deletedeviceid: id, deleteindex: index, deleteAll: deleteAll })
    }

    closeDeleteModal = () => {
        this.setState({ toggleDeleteModal: false, deletedeviceid: "", deleteindex: "", deleteAll: false })
    }


    handleActivityLogView = () => {
        if (this.state.toggleActivityLog) {
            this.setState({ isLoading: true, toggleActivityLog: false })
            this.props.getDeviceList().then(() => {
                this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
            })
        } else {
            this.setState({ isLoading: false, toggleActivityLog: true })
            this.props.getQuarantineLog().then(() => {
                let resultObj = this.props.QarentineDevices.logData
                let resultArr = [];
                var i = 0;
                for (i in resultObj) {
                    resultArr.push(resultObj[i])
                }
                this.setState({ activityLogResult: resultArr, isLoading: true })
            })
        }
        // this.setState({ toggleActivityLog: !this.state.toggleActivityLog }, () => {
        //     if (this.state.toggleActivityLog) {
        //         this.setState({ isLoading: false })
        //         this.props.getQuarantineLog().then(() => {
        //             let resultObj = this.props.QarentineDevices.logData
        //             let resultArr = [];
        //             var i = 0;
        //             for (i in resultObj) {
        //                 resultArr.push(resultObj[i])
        //             }
        //             this.setState({ activityLogResult: resultArr, isLoading: true })
        //         })
        //     } else {
        //         this.props.getDeviceList().then(() => {
        //             this.setState({ result: this.props.QarentineDevices.deviceList, isLoading: true })
        //         })
        //     }
        // })
    }

    render() {
        const { toggleDeleteModal, deletedeviceid, result, deleteindex, deleteAll, toggleActivityLog, activityLogResult } = this.state
        return (
            <>
                <CustomHeader
                    handleActivityLogView={this.handleActivityLogView}
                    toggleListView={false}
                    deleteAlldevice={this.deviceDelete}
                    toggleValue={toggleActivityLog}
                />
                {this.state.isLoading === false ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                    <Fragment>
                        <Card>
                            <CardHeader style={datastyle}>
                                <CardTitle style={{ fontSize: "1.1rem" }}>
                                    {toggleActivityLog ? "Activity Log" : "Device List"}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                {
                                    toggleActivityLog
                                        ?
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Device ID</th>
                                                    <th>Device IP</th>
                                                    <th>Deleted By </th>
                                                    <th>Created At </th>
                                                </tr>
                                            </thead>
                                            <tbody className="unpadding striped hover">
                                                {activityLogResult && activityLogResult.length
                                                    ?
                                                    activityLogResult.map((value, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{value.device}</td>
                                                            <td>{value.device_ip_assignments}</td>
                                                            <td>{value.deleted_by}</td>
                                                            <td>{value.created_at}</td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan="5">No Records Found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
                                        :
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Device ID</th>
                                                    <th>Device Description</th>
                                                    <th>Type </th>
                                                    <th>Location </th>
                                                    <th>Owner </th>
                                                    <th>Address </th>
                                                    <th>Label</th>
                                                </tr>
                                            </thead>
                                            <tbody className="unpadding striped hover">
                                                {result && result.length ?
                                                    result.map((value, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><a href={`https://crm.fdcservers.net/admin/devicemgr/view.php?device=${value.dev}`} target="_blank" rel='noopener noreferrer'>{value.dev}</a></td>
                                                            <td>{value.dev_desc}</td>
                                                            <td>{value.type}</td>
                                                            <td>{value.fac_name}</td>
                                                            <td><a href={`https://crm.fdcservers.net/admin/clientmgr/client_profile.php?clientid=${value.clientid}`} target="_blank" rel='noopener noreferrer'>
                                                                {value.owner} </a>
                                                            </td>
                                                            <td>{value.address}</td>
                                                            <td>{value.label}</td>
                                                            <td >
                                                                <Trash className="cursor-pointer mr-1" size={15}
                                                                    onClick={() => { this.deviceDelete(value.dev, index, false) }} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan="9">No Records Found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
                                }
                            </CardBody>
                        </Card>
                        {result && result.length === 0 &&
                            <Card>
                                <CardBody style={datastyle}>
                                    <CardTitle style={{ fontSize: "1.1rem" }}>There is No Results Found!</CardTitle>
                                </CardBody>
                            </Card>
                        }
                    </Fragment>
                )}

                {toggleDeleteModal &&
                    <QuarentineDeleteDevice
                        toggleDeleteModal={toggleDeleteModal}
                        deletedeviceid={deletedeviceid}
                        deleteindex={deleteindex}
                        closeDeleteModal={this.closeDeleteModal}
                        deleteDevice={this.props.deleteDevice}
                        data={result}
                        deviceDeletedSuccess={deviceDeletedSuccess}
                        wentWrong={wentWrong}
                        deleteError={deleteError}
                        deleteAll={deleteAll}
                        deleteAllDeviceData={this.props.deleteAllDeviceData}
                        allDeviceDeletedSuccess={allDeviceDeletedSuccess}
                    />
                }
                <ToastContainer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        QarentineDevices: state.QarentineDevices,
    }
}

export default connect(mapStateToProps, {
    getDeviceList,
    deleteDevice,
    deleteAllDeviceData,
    getQuarantineLog
})(QuarantineDeviceList)