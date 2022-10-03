import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Row,
    Col,
    Label, Input, FormGroup
} from "reactstrap"
import {
    Edit,
    Save,
    XCircle,
    Trash
} from "react-feather"
import CategoryDelete from './CategoryDelete';
class KbaseCategory extends React.PureComponent {

    state = {
        category: "",
        categoryvalid: false,
        editmode: false,
        catid: "",
        toggleDeleteModal: false,
    }

    toggleModal = () => {
        this.props.CategoryModal()
    }

    Edit = (category) => {
        this.setState({
            category: category.categoryName,
            catid: category.id,
            editmode: true
        })
    }

    Cancel = () => {
        this.setState({
            category: "",
            editmode: false
        })
    }

    KeyDown = (e) => {
        if (e.key === 'Enter') {
            if (this.state.editmode === false) {
                this.Add()
            }
            else {
                this.Update()
            }
        }
    }

    Add = () => {
        if (this.state.category === "" || this.state.category == null) {
            this.props.Mandatory()
            this.setState({ categoryvalid: true })
        }
        else {
            let data = { "categoryName": this.state.category }
            this.props.AddNewCategory(data).then(() => {
                if (this.props.kbaseList && this.props.kbaseList.addedCategory) {
                    this.props.categoryAddedSuccess()
                    this.setState({ category: "" })
                } else {
                    this.props.warningMessage()
                }

            })
        }

    }

    Update = () => {
        if (this.state.category === "" || this.state.category == null) {
            this.props.Mandatory()
            this.setState({ categoryvalid: true })
        }
        else {
            let data = { "categoryName": this.state.category }
            this.props.UpdateCategory(this.state.catid, data).then(() => {
                if (this.props.kbaseList && this.props.kbaseList.categoryUpdatedSuccess) {
                    this.props.CategoryUpdated()
                    this.setState({ categoryvalid: false })
                    this.Cancel()
                } else {
                    this.props.warningMessage()
                }

            })
        }
    }

    toggleCategoryDeleteModal = (id = false) => {
        if (id) {
            this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, catid: id })
        } else {
            this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, catid: "" })
        }
    }

    Delete = () => {
        this.props.deleteCategory(this.state.catid).then(() => {
            if (this.props.kbaseList && this.props.kbaseList.categoryDeleted) {
                this.toggleCategoryDeleteModal()
                this.props.CategoryUpdated()
                this.props.UpdatedDetails()
            } else {
                this.props.warningMessage()
            }

        })
    }


    render() {
        const datalisthieght = window.screen.height - 353
        const responsiveheight = datalisthieght + "px"
        const tablebody = {
            maxHeight: responsiveheight
        }
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "18px"
        }

        const updatebutton = {
            cursor: "pointer",
            width: "40px",
            marginLeft: "0px",
            marginRight: "0px",
            paddingLeft: "0px",
            marginTop: "18px",
            paddingRight: "0px",
            paddingTop: "10px",
            paddingBottom: "11px",
            height: "40px"
        }
        const { category, editmode, toggleDeleteModal } = this.state
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleCategoryModal}
                    toggle={this.toggleModal}
                    className="modal-l"
                >
                    <ModalHeader
                        toggle={this.toggleModal}
                        className="bg-primary"
                    >
                        Categories
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg="9" md="9" sm="12">
                                <FormGroup>
                                    <Label for="data-topic">Category <span style={{ color: "red" }}>*</span></Label>
                                    <Input
                                        type="text"
                                        value={category}
                                        placeholder="Topic"
                                        onChange={e => this.setState({ category: e.target.value })}
                                        id="data-topic"
                                        invalid={this.state.categoryvalid}
                                        onKeyDown={this.KeyDown}
                                    />
                                </FormGroup>
                            </Col>
                            {editmode === false &&
                                <Col lg="3" md="3" sm="12">
                                    <Button style={buttonstyle} onClick={() => this.Add()} outline color="primary">
                                        Add
                                </Button>
                                </Col>
                            }
                            {editmode === true &&
                                <>
                                    <Col lg="3" md="3" sm="2">
                                        <Button style={updatebutton} onClick={(e) => this.Update()} outline color="warning">
                                            <Save size={20} />
                                        </Button>

                                        <Button style={updatebutton} className="ml-1" onClick={(e) => this.Cancel()} outline color="danger">
                                            <XCircle size={20} />
                                        </Button>
                                    </Col>
                                </>
                            }
                        </Row>
                        <Row>
                            <Col lg="12" md="12" sm="12">
                                <div className="card-btns d-flex justify-content-between mt-2" style={tablebody}>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Categories</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="unpadding striped hover">
                                            {(this.props.categoryList && this.props.categoryList.length > 0) &&
                                                this.props.categoryList.map((value, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{value.categoryName}</td>
                                                        <td>
                                                            <Edit className="vx-icon cursor-pointer" size={15} onClick={(e) => this.Edit(value)} />
                                                            <Trash className="vx-icon cursor-pointer ml-1" size={15} onClick={(e) => this.toggleCategoryDeleteModal(value.id)} />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {toggleDeleteModal &&
                    <CategoryDelete
                        toggleDeleteModal={toggleDeleteModal}
                        toggleArticleDeleteModal={this.toggleCategoryDeleteModal}
                        Delete={this.Delete}
                    />
                }
            </Fragment>
        )
    }
}

export default KbaseCategory