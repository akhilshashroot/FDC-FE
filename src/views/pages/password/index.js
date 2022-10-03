import React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { Table } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import ReactPaginate from "react-paginate";
import { performRequest } from '../../../services/index';
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getPaginateData } from '../../../redux/actions/pagination';
import { connect } from "react-redux";

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px",
   
}

const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })

class PasswordLog extends React.Component {
    state = {
        pageNumber: 1,
        PassLogData: "",
        loading: false,
        perPageData: 30,
        
    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
        });
        this.getPasslogData(this.state.pageNumber, true)
    }

    getPasslogData = (page_no, loading_value = false) => {
        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        let url = `/api/docs/server/ipmi_pwd_log/list?page=${page_no}`;
        loading_value && this.setState({ loading: true });
        performRequest('get', url, headers)
            .then(res => {
                if (res.status === 200 && res.data && res.data.response_code === 200) {

                    window.scrollTo(0, 0)
                    this.setState({ PassLogData: res.data.data, loading: false })
                    
                } else {
                    warningMessage();
                }
            })
            .catch(error => {
                this.setState({ loading: false })
                
                warningMessage();
            })
    }


    // pagination null route log
    onPassLogChange = (currentPage) => {
        let page_number = currentPage.selected + 1;
        this.getPasslogData(page_number, false)
        this.setState({ pageNumber: page_number })
    }

    countTotalPages = (totalData) => {
        if (parseInt(totalData)) {
            var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
           
     
            return parseInt(pageCount);
        }
    }

    
    render() {
        
        const { PassLogData, pageNumber, loading } = this.state;
        
    //    console.log(PassLogData)
        let start=PassLogData.from
       
    
   

        return (
            <>
                {loading ?
                    <Spinner />
                    :
                    <>
                        <Card>
                            <CardHeader style={datastyle}>
                                <CardTitle style={{ fontSize: "1.1rem" }}>
                                    Password Reveal Logs
                        </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <>
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Location</th>
                                                <th>Switch Label</th>
                                                <th>Port ID</th>
                                                <th>Server Label</th>
                                                <th>Time Revealed</th>
                                                <th>User</th>
                                            </tr>
                                        </thead>
                                        <tbody className="unpadding striped hover">
                                            {PassLogData && PassLogData.data &&  PassLogData.data.length > 0 ?
                                                PassLogData.data.map((value, index) => (
                                                    <tr key={index}>
                                                        <td>{index+start}</td>
                                                        <td>{value.location}</td>
                                                        <td>{value.switch_label}</td>
                                                        <td>{value.port_no}</td>
                                                        <td>{value.server_label}</td>
                                                        <td>{value.updated_at}</td>
                                                         <td>{value.user}</td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td>There are no records to display</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </Table>
                                    <ReactPaginate
                                        previousLabel={<ChevronLeft size={15} />}
                                        nextLabel={<ChevronRight size={15} />}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        // pageCount={PassLogData.total ? this.countTotalPages(PassLogData.total) : 1}
                                        pageCount={PassLogData.last_page}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={PassLogData.last_page}
                                        containerClassName={
                                            "vx-pagination icon-pagination pagination-end mt-2"
                                        }
                                        activeClassName={"active"}
                                        onPageChange={this.onPassLogChange}
                                      
                                        forcePage={pageNumber - 1}
                                    />
                                </>
                            </CardBody>
                        </Card>
                        <ToastContainer />
                    </>
                }
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        paginateData: state.paginateData
    }
}

export default connect(mapStateToProps, { getPaginateData })(PasswordLog);