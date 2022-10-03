import React from "react"
import {
  Label, Input, Button, FormGroup, Row, Col, Card,
  CardBody, Form
} from "reactstrap"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import { connect } from "react-redux"
import { changePassword } from "../../../redux/actions/user-list"
const Info = () => toast.error("Check your old password", { transition: Zoom })
const Success = () => toast.success("Password Updated Successfully", { transition: Zoom })
const Error = () => toast.error("New Password and Old Password Must not be Same..", { transition: Zoom })
const Confirm = () => toast.error("The Confirm Password and New Password Must Match...", { transition: Zoom })
const Mandatory = () => toast.error("Please Fill All Fields..", { transition: Zoom })

class ChangePassword extends React.Component {
  state = {
    oldpassword: "", newpassword: "", isValid: null, confirm_password: "",
    passwordValidationMessage: "",
    canSubmit: false,
    confirmPasswordValidation: "",
    canSubmitConfirm: false,
    isMatch: null,
    oldValid: null,
  }
  handleSubmit = (value) => {
    let Data = {}
    Data.old_password = value.oldpassword
    Data.new_password = value.newpassword
    Data.confirm_password = value.confirm_password
    this.props.changePassword(Data).then(() => {
      if (this.props.userList && this.props.userList.changePassword) {
        Success();
        this.setState({
          oldpassword: "", newpassword: "", isValid: null, confirm_password: "",
          passwordValidationMessage: "",
          canSubmit: false,
          confirmPasswordValidation: "",
          canSubmitConfirm: false,
          isMatch: null,
          oldValid: null,
        })
      }
      else {
        if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "Check your old password.") {
          this.setState({ oldValid: false, isValid: true, isMatch: true })
          Info()
        }
        else if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "Please enter a password which is not similar then current password.") {
          this.setState({ oldValid: true, isValid: false, isMatch: false })
          Error()
        }
        else if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "The confirm password and new password must match.") {
          this.setState({ oldValid: true, isValid: false, isMatch: false })
          Confirm()
        }
        else if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "The old password field is required.") {
          this.setState({ oldValid: false, isValid: false, isMatch: false })
          Mandatory()
        }
        else if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "The new password field is required.") {
          this.setState({ oldValid: true, isValid: false, isMatch: false })
          Mandatory()
        }
        else if (this.props.userList && this.props.userList.changePasswordError && this.props.userList.changePasswordError.data
          && this.props.userList.changePasswordError.data.message === "The confirm password field is required.") {
          this.setState({ oldValid: true, isValid: true, isMatch: false })
          Mandatory()
        }
      }
    })
  }

  cancel = (state) => {
    this.setState({
      oldpassword: "", newpassword: "", isValid: null, confirm_password: "",
      passwordValidationMessage: "",
      canSubmit: false,
      confirmPasswordValidation: "",
      canSubmitConfirm: false,
      isMatch: null,
      oldValid: null,
    })
  }

  handlePasswordChange = (e) => {
    this.setState({ newpassword: e.target.value })
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (e.target.value.match(decimal)) {
      this.setState({ passwordValidationMessage: "", isValid: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ passwordValidationMessage: "", isValid: false })
      }
      else {
        this.setState({ isValid: false, passwordValidationMessage: "Password must between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
      }
      return false;
    }
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirm_password: e.target.value });
    var password = this.state.newpassword
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
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Row className="pt-1">
              <Col sm="12">
                <Form>
                  <FormGroup>
                    <Label for="old_password">Old Password <span style={{ color: "red" }}>*</span></Label>
                    <Input
                      id="old_password"
                      type="password"
                      placeholder="Old Password"
                      required
                      value={this.state.oldpassword}
                      onChange={e => this.setState({ oldpassword: e.target.value })}
                      valid={this.state.oldValid === true}
                      invalid={this.state.oldValid === false}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="new_password">New Password <span style={{ color: "red" }}>*</span></Label>
                    <Input
                      id="new_password"
                      type="password"
                      placeholder="New Password"
                      required
                      value={this.state.newpassword}
                      onChange={this.handlePasswordChange}
                      onClick={this.handlePasswordChange}
                      valid={this.state.isValid === true}
                      invalid={this.state.isValid === false}
                    />
                    {this.state.passwordValidationMessage && <span className="invalid-tooltip"> {this.state.passwordValidationMessage}</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="data-confirm-password">Confirm Password <span style={{ color: "red" }}>*</span></Label>
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
                    {this.state.confirmPasswordValidation && <span className="invalid-tooltip"> {this.state.confirmPasswordValidation}</span>}
                  </FormGroup>
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      onClick={() => this.handleSubmit(this.state)}
                    >
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      type="reset"
                      outline
                      onClick={() => this.cancel(this.state)}
                    >
                      Clear
                    </Button.Ripple>
                  </div>
                </Form>
                <ToastContainer />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userList: state.userList
  }
}

export default connect(mapStateToProps, {
  changePassword
})(ChangePassword)
