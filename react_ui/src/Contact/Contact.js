import React, { Component } from 'react';
import './contact.css';
import dvncLogo from "../../public/dvncLogo.png";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
      name: "",
      email: "",
      message: "",
      showNameError: false,
      nameError: "",
      showEmailError: false,
      emailError: "",
      showMessageError: false,
    };
  }

  submitForm(ev){
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }

  handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    const nameRegex = /[_\W0-9]\s/g;
    const emailRegex = /.+@.+/g;
    this.setState({ [name]: value })
    if(name === "name") {
      if (value.trim() === "" || value.match(nameRegex)) this.setState({ showNameError: true})
      else this.setState({ showNameError: false})
    } else if (name === "email") {
      if (value.trim() === "" || !value.match(emailRegex)) this.setState({ showEmailError: true})
      else this.setState({ showEmailError: false})
    } else if (name === "message") {
      if (value.trim() === "") this.setState({ showMessageError: true})
      else  this.setState({ showMessageError: false})
    }
    this.setState({ status: ""})
  }

  render() {
    const {
      showEmailError,
      showNameError,
      showMessageError,
      name,
      email,
      message
    } = this.state
    return (
      <div className="contact-container">
          <div className="envelop-container">
            <div className="envelop-fold"/>
            <div className="fold-heading">Let's Connect</div>
            <div className="logo-container">
              <img src={dvncLogo} className="dvnc-seal" alt="dvncLogo"/>
            </div>
            <div className="form">
            <form
              onSubmit={this.submitForm}
              action="https://formspree.io/mlepkgyo"
              method="POST"
            >
              <label className="label">Name<p className="red">*</p></label>
              <input
                className="input"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              />
              {showNameError ?
                <div className="field-error">
                  Name cannot be empty, contain numbers or special characters
                </div>
              : null}
              <label className="label">Email<p className="red">*</p></label>
              <input
                className="input"
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
                required
              />
              {showEmailError?
                <div className="field-error">
                  Email cannot be empty, should be valid
                </div>
              : null}
              <label className="label">What do u wanna say...<p className="red">*</p></label>
              <textarea
                className="input"
                rows="4"
                name="message"
                value={message}
                onChange={this.handleChange}
                required
              />
              {showMessageError?
                <div className="field-error">
                  Message cannot be empty
                </div>
              : null}
              <div className="send-button-container">
                {this.state.status === "SUCCESS" ?
                  <p>Thanks for reaching out. I'll get back to you soon</p>
                : <button
                    className="send-button"
                    disabled={email.trim() === "" || name.trim() === "" || message.trim() === "" ||
                      showMessageError || showEmailError || showNameError}
                  >Send
                  </button>
                }
                {this.state.status === "ERROR" && 
                  <p style={{color: "red"}}>Ooops! There was an error. Please try again!</p>}
              </div>
            </form>
            </div>
          </div>
      </div>
    );
  }
}

export default Contact;
