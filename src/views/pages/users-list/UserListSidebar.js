import React, { Component } from "react"
import { Label, Input, FormGroup, Button, Row, Col, Form } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import Select from 'react-select';
import { UpdateUser } from "../../../redux/actions/user-list"
import { connect } from "react-redux"
import { performRequest } from '../../../services/index';

class UserListSidebar extends Component {

  constructor() {
    super()

    this.state = {
      full_name: "",
      email: "",
      username: "",
      selectedPrivilege: "",
      password: "",
      confirm_password: "",
      user_location: "",
      dropdownOpen: false,
      showLocation: false,
      selectedOption: null,
      passwordValidationMessage: "",
      emailValidationMessage: "",
      canSubmit: false,
      confirmPasswordValidation: "",
      canSubmitConfirm: false,
      isValid: null,
      emailValid: null,
      isMatch: null
    }
  }


  addNew = false


  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.name !== prevState.full_name) {
        this.setState({ full_name: this.props.data.name })
      }
      if (this.props.data.username !== prevState.username) {
        this.setState({ username: this.props.data.username })
      }
      if (this.props.data.email !== prevState.email) {
        this.setState({ email: this.props.data.email })
      }
      if (this.props.data.role !== prevState.selectedPrivilege) {
        let role_user = this.props.previlegeData.find(val => val.name === this.props.data.role);
        if (role_user && role_user.name) {
          if (role_user.name === "Remote") {
            this.setState({ selectedPrivilege: { "label": role_user.name, "value": role_user.id }, showLocation: true });
            if (this.props.data.locations !== prevState.selectedOption) {
              if (this.props.data.locations.length > 0) {
                let arr = []
                this.props.data.locations.forEach((value) => {
                  arr.push({ "label": value.location, "value": value.locId })
                })
                this.setState({ selectedOption: arr })
              }
            }
          } else {
            this.setState({ selectedPrivilege: { "label": role_user.name, "value": role_user.id } })
          }
        }
        // if (this.props.data.role === "Admin") {
        //   this.setState({ selectedPrivilege: { "label": this.props.data.role, "value": 1 } })
        // }
        // if (this.props.data.role === "Support") {
        //   this.setState({ selectedPrivilege: { "label": this.props.data.role, "value": 2 } })
        // }
        // if (this.props.data.role === "Remote") {
        //   this.setState({ selectedPrivilege: { "label": this.props.data.role, "value": 3 }, showLocation: true });
        //   if (this.props.data.locations !== prevState.selectedOption) {
        //     if (this.props.data.locations.length > 0) {
        //       let arr = []
        //       this.props.data.locations.forEach((value) => {
        //         arr.push({ "label": value.location, "value": value.locId })
        //       })
        //       this.setState({ selectedOption: arr })
        //     }

        //   }
        // }
        // if (this.props.data.role === "Manager") {
        //   this.setState({ selectedPrivilege: { "label": this.props.data.role, "value": 4 } })
        // }
      }

    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        full_name: "",
        email: "",
        username: "",
        selectedPrivilege: "",
        password: "",
        confirm_password: "",
        isMatch: null,
        isValid: null,
        emailValid: null,
        showLocation: false,
        selectedOption: null,

      })
    }
    if (this.addNew) {
      this.setState({
        full_name: "",
        email: "",
        username: "",
        selectedPrivilege: "",
        password: "",
        confirm_password: "",
        isMatch: null,
        isValid: null,
        emailValid: null,
        showLocation: false,
        selectedOption: null
      })
    }
    this.addNew = false;
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if (this.state.full_name && this.state.email && this.state.username && this.state.selectedPrivilege &&
        (this.state.selectedPrivilege.value === 3 ? this.state.selectedOption && this.state.selectedOption.length > 0 : true)) {
        var loc_id_values = ""
        var user_location_ids = []
        if (this.state.selectedOption && this.state.selectedOption.length > 0) {
          this.state.selectedOption.forEach((value) => {
            user_location_ids.push(value.value)
          })
          loc_id_values = user_location_ids.toString()
        } else {
          user_location_ids = ""
        }
        let updateUserData = {};
        updateUserData.id = this.props.data.id;
        updateUserData.name = this.state.full_name;
        updateUserData.email = this.state.email;
        updateUserData.username = this.state.username;
        updateUserData.password = this.state.password ? this.state.password : null;
        updateUserData.user_role_id = this.state.selectedPrivilege && this.state.selectedPrivilege.value;
        updateUserData.location_id = loc_id_values;
        if (updateUserData) {
          this.props.UpdateUser(this.props.data.id, updateUserData).then(() => {
            if (this.props.userList && this.props.userList.userUpdatedSuccess) {
              this.props.UpdateMessage()
              this.props.handleSidebar(false, true)
              this.props.getUserData(false, this.props.pageNumber)
            } else {
              if (this.props.userList && this.props.userList.userUpdatedError) {
                if (this.props.userList.userUpdatedError.errors && this.props.userList.userUpdatedError.message === "The given data was invalid.") {
                  this.props.userList.userUpdatedError.errors && this.props.userList.userUpdatedError.errors.username && this.props.userAdderrorWarning(this.props.userList.userUpdatedError.errors.username[0])
                  this.props.userList.userUpdatedError.errors && this.props.userList.userUpdatedError.errors.email && this.props.userAdderrorWarning(this.props.userList.userUpdatedError.errors.email[0])
                }
              } else {
                this.props.ErrorMessage()
              }
            }
          })
        }
      } else {
        this.props.inCompleteData()
      }

    } else {
      if (this.state.full_name && this.state.email && this.state.username && this.state.password && this.state.selectedPrivilege &&
        (this.state.selectedPrivilege.value === 3 ? this.state.selectedOption && this.state.selectedOption.length > 0 : true)) {
        loc_id_values = ""
        user_location_ids = []
        if (this.state.selectedOption && this.state.selectedOption.length > 0) {
          this.state.selectedOption.forEach((value) => {
            user_location_ids.push(value.value)
          })
          loc_id_values = user_location_ids.toString()
        } else {
          user_location_ids = ""
        }
        const token_value = localStorage.getItem("token")
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token_value}`
        };
        performRequest('post', "/api/user/add", headers,
          {
            "full_name": this.state.full_name,
            "email": this.state.email,
            "username": this.state.username,
            "password": this.state.password,
            "user_role_id": this.state.selectedPrivilege && this.state.selectedPrivilege.value,
            "location_id": loc_id_values
          })
          .then(response => {
            if (response.data) {
              this.addNew = true
              this.props.handleSidebar(false, true)
              this.props.AddMessage()
              this.props.getUserData(false, this.props.pageNumber)
            }

          })
          .catch(error => {
            if (error.response.data && error.response.data.message === "The given data was invalid.") {
              error.response.data.errors && error.response.data.errors.username && this.props.userAdderrorWarning(error.response.data.errors.username[0])
              error.response.data.errors && error.response.data.errors.email && this.props.userAdderrorWarning(error.response.data.errors.email[0])
            }
          })
      } else {
        this.props.inCompleteData()
      }

    }
  }
  //   custom code
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  handlePrivilegeChange = (selectedPrivilege) => {
    this.setState({ selectedPrivilege })
    if (selectedPrivilege.value === 3) {
      this.setState({ showLocation: true })
    } else {
      this.setState({ showLocation: false })
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  convertLocation = data => {
    var locationData = []
    data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }
  convertPrivilege = data => {
    var privilegeData = []
    data && data.forEach((value) => {
      privilegeData.push({ "label": value.name, "value": value.id })
    })
    return privilegeData
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (e.target.value.match(decimal)) {
      this.setState({ passwordValidationMessage: "", canSubmit: true, isValid: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ passwordValidationMessage: "", canSubmit: false, isValid: false })
      }
      else {
        this.setState({ canSubmit: false, isValid: false, passwordValidationMessage: "Password must between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
      }
      return false;
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });

    var emailValue = e.target.value;
    // var decimal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var decimal = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (decimal.test(emailValue)) {
      this.setState({ emailValidationMessage: "", canSubmit: true, emailValid: true });
      return true
    }
    else {
      if (emailValue === "") {
        this.setState({ emailValidationMessage: "", canSubmit: false, emailValid: false })
      }
      else {
        this.setState({ canSubmit: false, emailValidationMessage: "Invalid Email", emailValid: false })
        return false
      }
    }

  }


  handleConfirmPasswordChange = (e) => {
    this.setState({ confirm_password: e.target.value });
    var password = this.state.password;

    if ((password === e.target.value) && (password.length === e.target.value.length)) {
      this.setState({ confirmPasswordValidation: "", canSubmitConfirm: true, isMatch: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ confirmPasswordValidation: "", canSubmitConfirm: false, isMatch: false })
      } else {
        this.setState({ canSubmitConfirm: false, isMatch: false, confirmPasswordValidation: "Passwords must be same" })
      }
      return false;
    }
  }

  handleCloseSidebar = () => {
    this.setState({
      full_name: "",
      email: "",
      username: "",
      privileges: "",
      password: "",
      confirm_password: "",
      isMatch: null,
      isValid: null,
      emailValid: null,
      showLocation: false,
      selectedOption: null
    })
    this.props.handleSidebar(false, true)
  }

  render() {
    let { show, data } = this.props
    let { full_name, username, email, selectedOption, selectedPrivilege } = this.state
    return (
      <div
        className={classnames("inventory-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE USER" : "ADD NEW USER"}</h4>
          <X size={20} onClick={this.handleCloseSidebar} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          <FormGroup>
            <Label for="data-full_name">Full Name<span style={{ color: "red" }}>*</span></Label>
            <Input
              type="text"
              value={full_name}
              placeholder="Full Name"
              onChange={e => this.setState({ full_name: e.target.value })}
              id="data-full_name"
            />
          </FormGroup>
          <Form className="mt-2">
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-login">Username<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    type="text"
                    id="data-location-login"
                    value={username}
                    placeholder="Username"
                    onChange={e => this.setState({ username: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-email">Email<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    type="email"
                    id="data-email"
                    value={email || ""}
                    placeholder="Email"
                    required
                    onChange={(e) => this.handleEmail(e)}
                    valid={this.state.emailValid === true}
                    invalid={this.state.emailValid === false}
                  />
                  {this.state.emailValidationMessage && <span className="invalid-tooltip"> {this.state.emailValidationMessage}</span>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-password">Password{!this.props.data && <span style={{ color: "red" }}>*</span>}</Label>
                  <Input
                    id="data-password"
                    type="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    onClick={this.handlePasswordChange}
                    valid={this.state.isValid === true}
                    invalid={this.state.isValid === false}
                  />
                  {this.state.passwordValidationMessage && <span className="invalid-tooltip"> {this.state.passwordValidationMessage}</span>}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-confirm-password">Confirm Password{!this.props.data && <span style={{ color: "red" }}>*</span>}</Label>
                  <Input
                    id="data-confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={this.state.confirm_password}
                    onChange={this.handleConfirmPasswordChange}
                    onClick={this.handleConfirmPasswordChange}
                    valid={this.state.isMatch === true}
                    invalid={this.state.isMatch === false}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-privileges">Privileges<span style={{ color: "red" }}>*</span></Label>
                  <Select
                    value={selectedPrivilege}
                    onChange={this.handlePrivilegeChange}
                    options={this.convertPrivilege(this.props.previlegeData)}
                    isSearchable={true}
                    placeholder="Select"
                  />
                </FormGroup>
              </Col>
              {this.state.showLocation &&
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="tech_location">Locations<span style={{ color: "red" }}>*</span></Label>
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={this.convertLocation(this.props.locationData)}
                      isMulti={true}
                      isSearchable={true}
                    />
                  </FormGroup>
                </Col>
              }
            </Row>
          </Form>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={this.handleCloseSidebar}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userList: state.userList
  }
}

export default connect(mapStateToProps, { UpdateUser })(UserListSidebar)
