import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import { Mail, Lock, Unlock } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { clearSignUpWithJWT } from "../../../../redux/actions/auth/clearActions"
import { connect } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"

const notifyTopCenter = (data) =>
  toast.error(data, {
    position: toast.POSITION.TOP_CENTER
  })


class LoginJWT extends React.Component {
  state = {
    username: "",
    password: "",
    remember: false,
    passwordValidationMessage: "",
    canSubmit: false,
    togglePass: true
  }

  componentDidMount() {
    this.props.clearSignUpWithJWT()
    localStorage.clear()
    sessionStorage.clear();
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.canSubmit) {
      this.props.loginWithJWT(this.state).then(() => {
       
        if (this.props.loginValues && this.props.loginValues.values && this.props.loginValues.values.Status === 400) {
      
          notifyTopCenter(this.props.loginValues && this.props.loginValues.values && this.props.loginValues.values.Message)
        }
      })
    }
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (e.target.value.match(decimal)) {
      this.setState({ passwordValidationMessage: "", canSubmit: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ passwordValidationMessage: "", canSubmit: false })
      }
      return false;
    }
  }
  togglePassword = () => {
    this.setState({ togglePass: !this.state.togglePass })
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>username</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type={this.state.togglePass ? "password" : "text"}
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                required
              />
              {this.state.passwordValidationMessage && <span> {this.state.passwordValidationMessage}</span>}
              <div className="form-control-position">
                {this.state.togglePass ?
                  <Lock size={15} onClick={this.togglePassword} />
                  :
                  <Unlock size={15} onClick={this.togglePassword} />
                }
              </div>
              <Label>Password</Label>
            </FormGroup>
            {/* <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup> */}
            <div className="d-flex justify-content-between">
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
        <ToastContainer />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    loginValues: state.auth.login

  }
}
export default connect(mapStateToProps, { loginWithJWT, clearSignUpWithJWT })(LoginJWT)
