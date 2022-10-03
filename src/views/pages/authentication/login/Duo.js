import React, { Component } from 'react';
import 'whatwg-fetch'
import DuoWebSDK from 'duo_web_sdk';
import "../../../../assets/scss/pages/authentication.scss"
import { history } from "../../../../history"

const STATE_AUTH_PASSED = 'STATE_AUTH_PASSED';
const STATE_AUTH_FAILED = 'STATE_AUTH_FAILED';
const STATE_AUTH_PENDING = 'STATE_AUTH_PENDING';

class DuoComponent extends Component {
  constructor() {
    super();
    this.state = {
      duoAuthState: STATE_AUTH_PENDING,
    };
  }

  componentDidMount() {

    this.initDuoFrame(this.props.login_response);
  }

  initDuoFrame(json) {
    // initialize the frame with the parameters
    // we have retrieved from the server
    if (json && json.host && json.duo_token) {
      DuoWebSDK.init({
        iframe: "duo-frame",
        host: json.host,
        sig_request: json.duo_token,
        submit_callback: this.submitPostAction.bind(this),
        // post_action:"/post_action"
      });
    }
  }

  submitPostAction(form) {

    const baseHost = this.props.login_response && this.props.login_response.host;
    // Submit the signed response to our backend for verification.
    const data = JSON.stringify({ signedResponse: form.sig_response.value });
    // const newURL = "https://cors.bridged.cc/"
    // const proxyurl = `https://cors.bridged.cc/https://${baseHost}/post_action`;
    // const proxyurl = `https://test.cors.workers.dev/https://${baseHost}/post_action`;
    
    const proxyurl = `https://api.allorigins.win/get?url=https://${baseHost}/post_action`;
    // const proxyurl = "https://cors.bridged.cc";

    const url = `/fdc-tools/post_action`;
    // var abc =newURL + proxyurl;
    // var finalURl = "";
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   finalURl = abc
    // } else {
    //   finalURl = abc
    // }

    fetch(url,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: data,
      }
    )
      .then(response => {
        if (response.ok) {
          localStorage.setItem("token", this.props.login_response.token)
          localStorage.setItem("user_id", this.props.login_response.user_id)
          localStorage.setItem("user_role", this.props.login_response.user_role)
          history.push("/dashboard")
        } else {
          this.setState({ duoAuthState: STATE_AUTH_FAILED });
        }
      });
  }

  render() {
    let content;
    let duoframe = {
      width: "100%",
      minWidth: "867px",
      maxWidth: "867px",
      height: "505px",
      border: "none"
    }

    switch (this.state.duoAuthState) {
      case STATE_AUTH_PASSED:
        content = <h3>Successfully passed Duo Authentication!</h3>
        break;
      case STATE_AUTH_FAILED:
        content = <h3>Failed Duo Authentication.</h3>
        break;
      default:
        content = <iframe id="duo-frame" title="FDC Duo" style={duoframe} aria-hidden="true" />;
        break;
    }

    return (
      <div className="app">
        {content}
      </div>
    );
  }
}

export default DuoComponent