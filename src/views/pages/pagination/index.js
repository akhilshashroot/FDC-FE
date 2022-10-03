import React from 'react';
import { connect } from "react-redux";
import { getPaginateData, setPaginateData } from '../../../redux/actions/pagination';
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss"
import {
    Card,
    CardBody,
    CardImg,
    Row,
    Col,
    Button,
    FormGroup, Label, Input
} from "reactstrap"
import img1 from "../../../assets/gif/pagination1.gif"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

const Success = () => toast.success("Pagination Count Updated Successfully.", { transition: Zoom })
const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })

class Pagination extends React.Component {

    state = {
        count: null,
        editMode: false,
        loading: false,
        update: true
    }
    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ count: this.props.paginateData.perPageCount, loading: true })
            }
        });
    }

    Edit = () => {
        this.setState({ editMode: true })
    }

    Update = () => {
        this.setState({ update: false })
        this.props.setPaginateData(this.state.count).then(() => {
            if (this.props.paginateData && this.props.paginateData.setPageCount) {
                Success()
                this.setState({
                    count: this.state.count,
                    editMode: false,
                    update: true
                })
                this.props.getPaginateData()
            }
            else {
                this.setState({
                    update: true
                })
                warningMessage()
            }
        });
    }

    Cancel = () => {
        this.setState({ editMode: false })
    }

    render() {
        const { perPageCount } = this.props.paginateData;
        const { count, editMode, loading, update } = this.state
        return (
            <>
                {loading === false ?
                    <Spinner />
                    :
                    <>
                        <Row>
                            <Col lg="4" md="6" sm="12">
                            </Col>
                            <Col lg="4" md="6" sm="12">
                                <Card>
                                    <CardImg
                                        top
                                        className="img-fluid"
                                        src={img1}
                                        alt="card image cap"
                                    />
                                    {update === false ?
                                        <Spinner />
                                        :
                                        <CardBody className="text-center">
                                            <h4>Pagination Count</h4>
                                            <div className="icon-section">
                                                <div className="avatar avatar-xl avatar-stats p-50 mt-1 bg-rgba-success">
                                                    <div className="avatar-content"><h2>{perPageCount}</h2></div>
                                                </div>
                                            </div>
                                            {editMode === false &&
                                                <Button.Ripple className="btn-block gradient-light-primary mt-2"
                                                    onClick={() => this.Edit()}>
                                                    Edit
                                </Button.Ripple>
                                            }
                                            {editMode === true &&
                                                <div className="d-flex justify-content-between mt-2">
                                                    <Row>
                                                        <Col lg="12" md="12" sm="12">
                                                            <FormGroup className="mb-0">
                                                                <Label for="value">Count <span style={{ color: "red" }}>*</span></Label>
                                                                <Input
                                                                    type="text"
                                                                    className="text-center"
                                                                    id="count"
                                                                    value={count || ""}
                                                                    onChange={e => this.setState({ count: e.target.value })}
                                                                // onKeyDown={this.handleSearchKeyDown}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6" md="6" sm="12">
                                                            <Button.Ripple className="btn-block gradient-light-primary mt-2"
                                                                onClick={() => this.Update()}>
                                                                Update
                                        </Button.Ripple>
                                                        </Col>
                                                        <Col lg="6" md="6" sm="12">
                                                            <Button.Ripple className="btn-block gradient-light-primary mt-2"
                                                                onClick={() => this.Cancel()}>
                                                                Cancel
                                        </Button.Ripple>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            }
                                        </CardBody>
                                    }
                                </Card>
                            </Col>
                        </Row>
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


export default connect(mapStateToProps, { getPaginateData, setPaginateData })(Pagination)