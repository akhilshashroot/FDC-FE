import React, { Fragment } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Nav,
  TabContent,
  TabPane
} from "reactstrap"
import loginImg from "../../../../assets/img/pages/login.png"
import LoginJWT from "./LoginJWT"
import { connect } from "react-redux"
import DuoComponent from './Duo'
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    if (this.props.loginValues && this.props.loginValues.loginResponse && this.props.loginValues.loginResponse.duo_flag && this.props.loginValues.loginResponse.token) {

      return (
        <Row className="m-0 justify-content-center">
          <Col
            sm="8"
            xl="7"
            lg="10"
            md="8"
            className="d-flex justify-content-center"
          ><DuoComponent login_response={this.props.loginValues && this.props.loginValues.loginResponse} />
          </Col>
        </Row>
      )
    }

    if (this.props.loginValues && this.props.loginValues.loginResponse && !this.props.loginValues.loginResponse.duo_flag && this.props.loginValues.loginResponse.token) {
      localStorage.setItem("token", this.props.loginValues.loginResponse.token)
      localStorage.setItem("user_id", this.props.loginValues.loginResponse.user_id)
      localStorage.setItem("user_role", this.props.loginValues.loginResponse.user_role)
      localStorage.setItem("resource_manager", this.props.loginValues.loginResponse.resource_manager)
      return (<Redirect to='/dashboard' />)
    }
    return (
      <Fragment>
        <Row className="m-0 justify-content-center">
          <Col
            sm="8"
            xl="7"
            lg="10"
            md="8"
            className="d-flex justify-content-center"
          >
            <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
              <Row className="m-0">
                <Col
                  lg="6"
                  className="d-lg-block d-none text-center align-self-center px-1 py-0"
                >
                  <img src={loginImg} alt="loginImg" />
                </Col>
                <Col lg="6" md="12" className="p-0">
                  <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                    <CardHeader className="pb-1">
                      <CardTitle>
                        <h4 className="mb-0">Login</h4>
                      </CardTitle>
                    </CardHeader>
                    <p className="px-2 auth-title">
                      Welcome, please login to your account
                  </p>
                    <Nav tabs className="px-2">
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <LoginJWT />
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    loginValues: state.auth.login

  }
}
export default connect(mapStateToProps, {})(Login)