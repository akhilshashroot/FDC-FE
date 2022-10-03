import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Form, Row, Col, Button } from "reactstrap"
import { Plus, Trash, Edit } from "react-feather"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list/"
import { getShoppingList, addShoppingItem, updateShoppingItem, deleteShoppingItem, GetShoppingLocations } from "../../../redux/actions/ipwatch-shopping/"
import { Table } from "reactstrap"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import WebfinderAddShoppingModal from "./WebfinderShoppingAddModal"
import WebfinderShopingDeleteModal from "./WebfinderShoppingDelete"

const actionrow = { width: "8%" }
const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const shoppingAddedSucsess = () => toast.success("Shopping Item Added Successfully", { transition: Zoom })
const shoppingDeletedSuccess = () => toast.success("Shopping Item Deleted Successfully", { transition: Zoom })
const shoppingItemUpdated = () => toast.info("Shopping Item Updated Successfully", { transition: Zoom })
const emptyAllFields = () => toast.warning("Please Fill All Fields", { transition: Zoom })
const emptyLocationField = () => toast.warning("The location field is required", { transition: Zoom })
const emptyWhatField = () => toast.warning("The What field is required", { transition: Zoom })
const emptyQtyField = () => toast.warning("The Quantity field is required", { transition: Zoom })
const emptyUrlField = () => toast.warning("The URL field is required", { transition: Zoom })
const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom })



const CustomHeader = props => {
    return (
        <Fragment>
            <Form>
                <Row>
                    <Col sm="4">
                        <FormGroup>
                            <Button.Ripple color="primary" onClick={() => props.handleAddModal()} outline>
                                <Plus size={15} style={{ marginRight: "5px" }} />
                                <span className="align-middle">Add New</span>
                            </Button.Ripple>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}
class WebfinderShoppingConfig extends React.PureComponent {

    state = {
        toggleAddModal: false,
        toggleDeleteModal: false,
        data: null,
        deleteitemid: "",
        isLoading: false
    }

    componentDidMount() {
        if (this.props.IpwatchShoppingList && !this.props.IpwatchShoppingList.shoppingList) {
            this.props.getShoppingList().then(() => {
                this.setState({ isLoading: true })
            })
        }
        else {
            this.setState({ isLoading: true })
        }
    }

    // Add Shopping Item
    handleAddModal = () => {
        this.setState({ toggleAddModal: true, data: null })
    }

    closeAddModal = () => {
        this.setState({ toggleAddModal: false })
    }

    // Update Shopping Item
    updateItem = (obj) => {
        this.setState({
            data: obj,
            toggleAddModal: true
        })
    }

    // delete null route

    deleteShoppingItem = (id) => {
        this.setState({ toggleDeleteModal: true, deleteitemid: id })
    }

    closeDeleteModal = () => {
        this.setState({ toggleDeleteModal: false, deleteitemid: "" })
    }

    render() {
        const { IpwatchShoppingList } = this.props
        const { toggleAddModal, toggleDeleteModal, data, deleteitemid } = this.state
        return (
            <React.Fragment>
                <CustomHeader
                    handleAddModal={this.handleAddModal}
                />
                {this.state.isLoading === false ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                        <Fragment>
                            {IpwatchShoppingList && IpwatchShoppingList.shoppingList && IpwatchShoppingList.shoppingList.length !== 0 &&
                                <Card>
                                    <CardHeader style={datastyle}>
                                        <CardTitle style={{ fontSize: "1.1rem" }}>
                                            Shopping List
                                </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table striped responsive>
                                            <thead>
                                                <tr>
                                                    <th >#</th>
                                                    <th>Location</th>
                                                    <th style={{minWidth:"20rem",maxWidth:"20rem"}} >What</th>
                                                    <th>Quantity</th>
                                                    <th style={{minWidth:"40rem",maxWidth:"40rem"}}>URL</th>
                                                    <th style={{minWidth:"10rem",maxWidth:"10rem"}}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="unpadding striped hover">
                                                {IpwatchShoppingList && IpwatchShoppingList.shoppingList && IpwatchShoppingList.shoppingList.map((value, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {value.loc_name ? <span>{value.loc_name}</span> : "No Location"}
                                                        </td>
                                                        <td >{value.what}</td>
                                                        <td>{value.quantity}</td>
                                                        <td style={{minWidth:"40rem",maxWidth:"40rem"}}>{value.url}</td>
                                                        <td style={actionrow}>
                                                            <Edit className="cursor-pointer mr-1" size={15}
                                                                onClick={() => { this.updateItem(value) }} />
                                                            <Trash className="cursor-pointer mr-1" size={15}
                                                                onClick={() => { this.deleteShoppingItem(value.id) }} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            }
                            {IpwatchShoppingList && IpwatchShoppingList.shoppingList && IpwatchShoppingList.shoppingList.length === 0 &&
                                <Card>
                                    <CardBody style={datastyle}>
                                        <CardTitle style={{ fontSize: "1.1rem" }}>There is No Results Found!</CardTitle>
                                    </CardBody>
                                </Card>
                            }
                        </Fragment>
                    )}
                {toggleAddModal &&
                    <WebfinderAddShoppingModal toggleAddModal={toggleAddModal} closeAddModal={this.closeAddModal}
                        GetShoppingLocations={this.props.GetShoppingLocations} IpwatchShoppingList={this.props.IpwatchShoppingList}
                        addShoppingItem={this.props.addShoppingItem} updateShoppingItem={this.props.updateShoppingItem}
                        data={data} shoppingItemUpdated={shoppingItemUpdated} shoppingAddedSucsess={shoppingAddedSucsess}
                        dataList={this.props.dataList} emptyAllFields={emptyAllFields} emptyLocationField={emptyLocationField}
                        emptyWhatField={emptyWhatField} emptyQtyField={emptyQtyField} emptyUrlField={emptyUrlField}
                        wentWrong={wentWrong} />
                }

                {toggleDeleteModal &&
                    <WebfinderShopingDeleteModal toggleDeleteModal={toggleDeleteModal} deleteitemid={deleteitemid}
                        closeDeleteModal={this.closeDeleteModal} deleteShoppingItem={this.props.deleteShoppingItem}
                        shoppingDeletedSuccess={shoppingDeletedSuccess} wentWrong={wentWrong} />
                }
                <ToastContainer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        IpwatchShoppingList: state.IpwatchShoppingList,
    }
}

export default connect(mapStateToProps, {
    getShoppingList,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    getInitialData,
    GetShoppingLocations
})(WebfinderShoppingConfig)