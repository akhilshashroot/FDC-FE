import React from 'react';
import { Card, CardBody, Table } from "reactstrap";
import { Edit, Trash, ChevronLeft, ChevronRight } from "react-feather";
import { fetchPduDetails } from "../../../redux/actions/pdu";
import { connect } from "react-redux";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import PduAction from './PduAction';
import { getPaginateData } from '../../../redux/actions/pagination';
import ReactPaginate from "react-paginate";


class PduDetails extends React.Component {
    state = {
        deletModal: false,
        pduData: "",
        type: "",
        perPageData: 30,
        pageNumber: 1,

    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.perPageCount) {
                this.setState({ perPageData: this.props.perPageCount })
            }

        });

        this.props.fetchPduDetails(true, this.props.sel_loc_id, this.state.pageNumber);

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.sel_loc_id !== prevProps.sel_loc_id) {
            this.props.fetchPduDetails(true, this.props.sel_loc_id, 1);
        }
        if (this.props.setPageToOne !== prevProps.setPageToOne) {
            this.setState({ pageNumber: 1 })
        }

    }
    // getPdudetails = (loading, type, pageNumber) => {
    //     this.props.fetchPduDetails(true, this.state.locType, this.state.pageNumber);
    // }

    toggleDeleteModal = (e, row = false, type) => {
        if (row) {
            this.setState({ deletModal: !this.state.deletModal, pduData: row, type: type });
        } else {
            this.setState({ deletModal: !this.state.deletModal, pduData: "", type: "" });
        }
    }


    countTotalPages = (totalData) => {
        if (parseInt(totalData)) {
            var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return pageCount;
        }
    }

    // pagination null route log
    onPDUPageChange = (currentPage) => {
        let page_number = currentPage.selected + 1
        this.props.fetchPduDetails(false, this.props.sel_loc_id, page_number).then(() => {
            window.scrollTo(0, 0)
        })
        this.setState({ pageNumber: page_number })
    }

    render() {
        const { deletModal, pduData, type, pageNumber } = this.state;
        const { pduDetails, isPduDetails } = this.props;
        return (
            <>
                {
                    isPduDetails ?
                        <Spinner />
                        :

                        <>
                            <Card>
                                {/* <CardHeader style={datastyle}>
                                    <CardTitle style={{ fontSize: "1.1rem" }}>
                                        {this.props.pdu && this.props.pdu.location && this.props.pdu.location} - Pdu Details
                            </CardTitle>
                                </CardHeader> */}
                                <CardBody>
                                    <Table striped style={{ width: "100%", tableLayout: "fixed" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "5%" }}>#</th>
                                                <th style={{ width: "15%" }}>Port</th>
                                                <th style={{ width: "15%" }}>Location</th>
                                                <th style={{ width: "20%" }}>Server</th>
                                                <th style={{ width: "10%" }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="unpadding striped hover">
                                            {
                                                pduDetails && pduDetails.data && pduDetails.data.length
                                                    ?
                                                    pduDetails.data.map((val, index) =>
                                                        <tr key={index}>
                                                            {/* <td>{(perPageData * (pageNumber -1))+ index+1}</td> */}
                                                            <td>{val.index}</td>
                                                            <td>{val.port}</td>
                                                            <td>{val.location ? val.location : "N/A"}</td>
                                                            <td>{val.label ? val.label : "N/A"}</td>
                                                            <td>
                                                                <Edit
                                                                    className="cursor-pointer mr-1"
                                                                    size={15}
                                                                    onClick={(e) => this.toggleDeleteModal(e, val, "update")}
                                                                />
                                                                <Trash
                                                                    className="cursor-pointer mr-1"
                                                                    size={15}
                                                                    onClick={(e) => this.toggleDeleteModal(e, val, "delete")}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                    :
                                                    <tr>
                                                        <td colSpan={5}>No Records To Display</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </Table>

                                    {/* <DataTable
                                        columns={columns}
                                        data={pduDetails ? pduDetails : []}
                                        noHeader
                                    /> */}
                                    <ReactPaginate
                                        previousLabel={<ChevronLeft size={15} />}
                                        nextLabel={<ChevronRight size={15} />}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={pduDetails && pduDetails.total && this.countTotalPages(pduDetails.total)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        containerClassName={
                                            "vx-pagination icon-pagination pagination-end mt-2"
                                        }
                                        activeClassName={"active"}
                                        onPageChange={this.onPDUPageChange}
                                        forcePage={pageNumber - 1}
                                    />
                                </CardBody>
                            </Card>


                        </>
                }
                {
                    deletModal &&
                    <PduAction
                        deletModal={deletModal}
                        pduData={pduData}
                        toggleDeleteModal={this.toggleDeleteModal}
                        type={type}
                        pageNumber={pageNumber}
                        sel_loc_id={this.props.sel_loc_id} />
                }
            </>
        )
    }

}

const mapStateToProps = state => {
    const { isPduDetails, pduDetails } = state.pduList;
    const { perPageCount } = state.paginateData;
    return {
        pduDetails,
        isPduDetails,
        perPageCount

    }
}

export default connect(mapStateToProps, { fetchPduDetails, getPaginateData })(PduDetails)