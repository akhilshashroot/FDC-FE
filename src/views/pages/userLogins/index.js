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
    fontSize: "10px"
}

const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })

class UserLogins extends React.Component {
    state = {
        pageNumber: 1,
        loginData: "",
        loading: false,
        perPageData: 30
    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
        });
        this.getUserLoginData(this.state.pageNumber, true)
    }

    getUserLoginData = (page_no, loading_value = false) => {
        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        let url = `/api/user/user_login_data?page=${page_no}`;
        loading_value && this.setState({ loading: true });
        performRequest('get', url, headers)
            .then(res => {
                if (res.status === 200 && res.data && res.data.response_code === 200) {

                    window.scrollTo(0, 0)
                    this.setState({ loginData: res.data.data, loading: false })
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
    onUserLoginPageChange = (currentPage) => {
        let page_number = currentPage.selected + 1;
        this.getUserLoginData(page_number, false)
        this.setState({ pageNumber: page_number })
    }

    countTotalPages = (totalData) => {
        if (parseInt(totalData)) {
            var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return parseInt(pageCount);
        }
    }
    render() {
        const { loginData, pageNumber, loading } = this.state;
        let start=loginData.from;
       
        return (
            <>
                {loading ?
                    <Spinner />
                    :
                    <>
                        <Card>
                            <CardHeader style={datastyle}>
                                <CardTitle style={{ fontSize: "1.1rem" }}>
                                    User Logins
                        </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <>
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>IP Address</th>
                                                <th>Logged Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="unpadding striped hover">
                                            {loginData && loginData.data && loginData.data.length > 0 ?
                                                loginData.data.map((value, index) => (
                                                    <tr key={index}>
                                                        <td>{index + start}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.ip_address}</td>
                                                        <td>{value.logged_at}</td>
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
                                        pageCount={loginData && loginData.total ? this.countTotalPages(loginData.total) : 1}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        containerClassName={
                                            "vx-pagination icon-pagination pagination-end mt-2"
                                        }
                                        activeClassName={"active"}
                                        onPageChange={this.onUserLoginPageChange}
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

export default connect(mapStateToProps, { getPaginateData })(UserLogins);