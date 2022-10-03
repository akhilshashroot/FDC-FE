import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions"
import { history } from "../../../../history"
import { Redirect} from 'react-router-dom';

class RegisterJWT extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    confirmPass: "",
    passwordValidationMessage : "",
    canSubmit : false,
    confirmPasswordValidation: "",
    canSubmitConfirm: false,
    isValid: null,
    isMatch:null
  }

  handleRegister = e => {
    e.preventDefault()
    if(this.state.canSubmit && this.state.canSubmitConfirm && this.state.isValid){
      this.props.signupWithJWT(this.state)
    }
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(e.target.value.match(decimal)){ 
      this.setState({passwordValidationMessage:"",canSubmit :true, isValid: true})
      return true;
    }
    else{ 
      if(e.target.value === ""){
        this.setState({passwordValidationMessage:"",canSubmit : false, isValid: false})
      }
      else{
        this.setState({canSubmit : false,passwordValidationMessage:"Password must between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
      }
        return false;
    }
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPass: e.target.value });
    var password=  this.state.password
    if(password === e.target.value){ 
      this.setState({confirmPasswordValidation:"",canSubmitConfirm :true, isMatch: true})
      return true;
    }
    else{ 
      if(e.target.value === ""){
        this.setState({confirmPasswordValidation:"",canSubmitConfirm : false, isMatch: false})
      }else{
        this.setState({canSubmitConfirm : false,confirmPasswordValidation:"Passwords must be same"})
      }
        return false;
    }
  }

  render() {

    if(this.props.signupResponse && this.props.signupResponse.signupSuccess){
      return (<Redirect to="/" />)
    }    
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Name"
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Label>Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onClick={this.handlePasswordChange}
            valid={this.state.isValid === true}
            invalid={this.state.isValid === false}
          />
          <Label>Password</Label>
          
          {/* {this.state.isValid === false ? (
                    <span className="invalid-tooltip">
                      {this.state.passwordValidationMessage}
                    </span>
                  ):("")} */}
          {this.state.passwordValidationMessage && <span className="invalid-tooltip"> {this.state.passwordValidationMessage}</span> }
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={this.state.confirmPass}
            onChange={this.handleConfirmPasswordChange}
            onClick={this.handleConfirmPasswordChange}
            valid={this.state.isMatch === true}
            invalid={this.state.isMatch === false}
          />
          <Label>Confirm Password</Label>
          {/* {this.state.confirmPasswordValidation && <span> {this.state.confirmPasswordValidation}</span> } */}
        </FormGroup>
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            defaultChecked={true}
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/")
            }}
          >
            Login
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
        </div>
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    signupResponse: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)
