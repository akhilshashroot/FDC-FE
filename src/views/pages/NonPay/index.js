import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Trash, Plus, Edit, ChevronLeft, ChevronRight } from "react-feather";
import { Button, Card, CardBody, Form, Row, Col, FormGroup, CardHeader, CardTitle, Table } from "reactstrap";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import ReactPaginate from "react-paginate";
import NonPayAddEditModal from './NonPayAddEditModal';
import NonPayDeleteModal from './NonPayDeleteModal';
import { getAllNonPayments, deleteNonPayment } from '../../../redux/actions/nonPay';
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getPaginateData } from '../../../redux/actions/pagination';

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
                                        onClick={() => props.toggleShipmentAddModal()}
                                        outline>
                                        <Plus size={15}
                                        />
                                        <span className="align-middle">Add NonPayment</span>
                                    </Button>
                                </div>
                            </div>
                        </FormGroup>
                    </Col>

                </Row>
            </Form>
        </Fragment>
    )
}

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const shipmentDeletedSuccess = () => toast.success("NonPayment Deleted Successfully.", { transition: Zoom })
const shipmentUpdateMessage = () => toast.success("NonPayment Updated Successfully.", { transition: Zoom })
const shipmentAddedMessage = () => toast.success("NonPayment Added Successfully.", { transition: Zoom })
const requiredFieldMessage = () => toast.warning("Please fill the required fields.", { transition: Zoom })
const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })
const validationMessage = (msg) => toast.warning(msg, { transition: Zoom })


class NonPay extends React.PureComponent {
    state = {
        toggleAddModal: false,
        nonPayment_data: "",
        toggleDeleteModal: false,
        shipmentId: "",
        pageNumber: 1,
        perPageData: 30
    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
        });
        // if (this.props.nonPay && !this.props.nonPay.allNonPayments) {
            this.props.getAllNonPayments(this.state.pageNumber)
        // }

    }

    toggleShipmentAddModal = (showEditModal = false, value) => {
        if (showEditModal) {
            this.setState({ toggleAddModal: !this.state.toggleAddModal, nonPayment_data: value })
        } else {
            this.setState({ toggleAddModal: !this.state.toggleAddModal, nonPayment_data: "" })
        }

    }

    toggleShipmentDeleteModal = (id = false) => {
        if (id) {
            this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, shipmentId: id })
        } else {
            this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, shipmentId: "" })
        }

    }

    // Shipment pagination
    onShipmentPageChange = (currentPage) => {
        let page_number = currentPage.selected + 1
        this.props.getAllNonPayments(page_number, false).then(() => {
            window.scrollTo(0, 0)
        })
        this.setState({ pageNumber: page_number })
    }

    countToatalPages = (totalData) => {
        if (parseInt(totalData)) {
            var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return pageCount;
        }
    }

    handleContents = (content) => {
        var re1 = /Ticket #([0-9]*)/g;
        var re2 = /TICKET #([0-9]*)/g;
        var str = content;
        if (str) {
            var t = str.replace(re1, `<a href="https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=$1" target="_blank" rel='noopener noreferrer'>$&</a>`)
            t = t.replace(re2, `<a href="https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=$1" target="_blank" rel='noopener noreferrer'>$&</a>`)
            return {
                __html: t
            };
        } else {
            return null
        }

    }

    render() {
        const { toggleAddModal, nonPayment_data, toggleDeleteModal, shipmentId, pageNumber } = this.state
        const { nonPay } = this.props
        const statusStyle = {
            color: "#ffffff",
            backgroundColor: "#4cd964",
            paddingLeft: "1em",
            paddingRight: "1em",
            fontWeight: "normal",
            paddingTop: "0.1em",
            paddingBottom: "0.1em",
            borderRadius: ".25em",
        }
        return (
            <Fragment>
                <CustomHeader
                    toggleShipmentAddModal={this.toggleShipmentAddModal} />

                {nonPay && nonPay.isAllNonPayLoading ?
                    <Spinner />
                    :

                    <Card>
                        <CardHeader style={datastyle}>
                            <CardTitle style={{ fontSize: "1.1rem" }}>
                                <h3>NonPayment</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Fragment>
                                <Table striped style={{ width: "100%", tableLayout: "fixed" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "7%" }}>#</th>
                                            <th style={{ width: "10%" }}>Location</th>
                                            <th style={{ width: "10%" }}>Service ID	</th>
                                            <th style={{ width: "66%" }}>Notes</th>
                                            <th style={{ width: "7%" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="unpadding striped hover">
                                        {nonPay && nonPay.allNonPayments && nonPay.allNonPayments.length > 0 ?
                                            nonPay.allNonPayments.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value.index}</td>
                                                    <td>{value.location}</td>
                                                    <td><a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${value.sid}`} target="_blank" rel='noopener noreferrer'>#{value.sid}</a></td>
                                                    <td id={`content_${value.index}`}>
                                                        <span dangerouslySetInnerHTML={this.handleContents(value.notes)} />
                                                        {/* {this.handleContents(value.index,value.contents)} */}
                                                    </td>
                                                    <td>
                                                        <Edit className="cursor-pointer" style={{ marginLeft: "0.5rem" }} size={15} onClick={() => this.toggleShipmentAddModal(true, value)} />
                                                        <Trash className="cursor-pointer" style={{ marginLeft: "0.5rem" }} size={15} onClick={() => this.toggleShipmentDeleteModal(value.id)} /></td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td colSpan={5}>There are no records to display</td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                                <ReactPaginate
                                    previousLabel={<ChevronLeft size={15} />}
                                    nextLabel={<ChevronRight size={15} />}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={nonPay && nonPay.total_count && this.countToatalPages(nonPay.total_count)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    containerClassName={
                                        "vx-pagination icon-pagination pagination-end mt-2"
                                    }
                                    activeClassName={"active"}
                                    onPageChange={this.onShipmentPageChange}
                                    forcePage={pageNumber - 1}
                                />
                            </Fragment>
                        </CardBody>
                    </Card>
                }
                {toggleAddModal &&
                    <NonPayAddEditModal
                        toggleAddModal={toggleAddModal}
                        toggleShipmentAddModal={this.toggleShipmentAddModal}
                        nonPaymentData={nonPayment_data}
                        pageNumber={pageNumber}
                        shipmentUpdateMessage={shipmentUpdateMessage}
                        warningMessage={warningMessage}
                        shipmentAddedMessage={shipmentAddedMessage}
                        requiredFieldMessage={requiredFieldMessage}
                        validationMessage={validationMessage}

                    />
                }

                {toggleDeleteModal &&
                    <NonPayDeleteModal
                        toggleDeleteModal={toggleDeleteModal}
                        toggleShipmentDeleteModal={this.toggleShipmentDeleteModal}
                        shipmentId={shipmentId}
                        deleteNonPayment={this.props.deleteNonPayment}
                        shipmentDeletedSuccess={shipmentDeletedSuccess}
                        warningMessage={warningMessage}
                        nonPay={nonPay}
                        pageNumber={pageNumber}
                    />
                }
                <ToastContainer />

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        nonPay: state.NonPay,
        paginateData: state.paginateData
    }
}

export default connect(mapStateToProps,
    {
        getAllNonPayments,
        deleteNonPayment,
        getPaginateData
    })(NonPay)