import React, { useState, useEffect, Fragment } from 'react';
import { Table, Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup, Button } from 'reactstrap';
import { Plus, Trash, Edit } from "react-feather";
import { getIpTransistProviders, addIpTransistProvider, updateIpTransitItem, deleteIpTransitItem } from "../../../redux/actions/ip-transist-settings";
import { connect } from 'react-redux';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import IpProviderModal from './IpProviderModal';
import IpTransistDeleteModal from './IpTransistDeleteModal';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

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

const IpTransistSetingsView = (props) => {


    const [toggleModal, setToggleModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [data, selectedData] = useState("");

    // Add Shopping Item
    const handleToggleModal = (providerData = "") => {
        setToggleModal(!toggleModal)
        if (providerData) {
            selectedData(providerData)
        } else {
            selectedData("")
        }
    }
    const handleDeleteModal = (providerData = "") => {
        setToggleDeleteModal(!toggleDeleteModal)
        if (providerData) {
            selectedData(providerData)
        } else {
            selectedData("")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        props.getIpTransistProviders();
    }


    const { isIpTransitProviderLoading, ipTransitProviderList, ipTransitProviderAdd,
        ipTransitProviderUpdate } = props.providers
    return (
        <>
            <CustomHeader
                handleAddModal={handleToggleModal}
            />

            {
                isIpTransitProviderLoading ?
                    <Spinner />
                    :

                    <Card>
                        <CardHeader style={datastyle}>
                            <CardTitle style={{ fontSize: "1.1rem" }}>
                                Ip Transist Providers
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table striped responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Provider Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ipTransitProviderList && ipTransitProviderList.length ?
                                            ipTransitProviderList.map((value, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{value.name}</td>
                                                    <td>
                                                        <Edit size={15} style={{ cursor: "pointer" }} className="mr-1" onClick={() => handleToggleModal(value)} />
                                                        <Trash size={15} style={{ cursor: "pointer" }} className="mr-1" onClick={() => handleDeleteModal(value)} />
                                                    </td>
                                                </tr>)
                                            :
                                            <tr>
                                                <td colSpan={2}>No Records To Show</td>
                                            </tr>

                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
            }

            {
                toggleModal &&
                <IpProviderModal
                    toggleModal={toggleModal}
                    handleToggleModal={handleToggleModal}
                    data={data}
                    addIpTransistProvider={props.addIpTransistProvider}
                    ipTransitProviderAdd={ipTransitProviderAdd}
                    updateIpTransitItem={props.updateIpTransitItem}
                    ipTransitProviderUpdate={ipTransitProviderUpdate}
                />

            }

            {toggleDeleteModal &&
                <IpTransistDeleteModal
                    toggleDeleteModal={toggleDeleteModal}
                    handleDeleteModal={handleDeleteModal}
                    deleteIpTransitItem={props.deleteIpTransitItem}
                    data={data}
                />
            }

            <ToastContainer />

        </>
    )
}

const mapStateToProps = state => {
    return {
        providers: state.IpTransistProvider,
    }
}

export default connect(mapStateToProps,
    {
        getIpTransistProviders,
        addIpTransistProvider,
        updateIpTransitItem,
        deleteIpTransitItem
    })(IpTransistSetingsView)