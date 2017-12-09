import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { FireVar } from '../Firebase/FirebaseConfig.js';
import { Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './Login.css'
// import styles from './Search.scss'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', status: '',redirect: false}
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this)
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this)
  }

  login(){
    FireVar.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.setState({ redirect: true }))
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = (error.code);
      var errorMessage = (error.message);
      if(error){
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(errorMessage);
        }
      }
    });
  }

  register(){
    FireVar.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(async function(firebaseUser) {
      var user = FireVar.auth().currentUser;
      console.log("registered successfully")
      await fetch("http://165.227.123.227:4001/api/user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firebaseID: user.uid,
          email: user.email
        })
      });
      // Actions.addEntryPage()
    })
    .then(() => this.setState({ redirect: true }))
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = (error.message);
      if(error){
        alert(errorMessage);
      }
    });
  }

  // Updates email whenever the email input is changed
  emailInputChangeHandler(event){
    this.setState({ email: event.target.value });
  }

  // Updates password whenever the password input is changed
  passwordInputChangeHandler(event){
    this.setState({ password: event.target.value });
  }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      //console.log(FireVar.auth().currentUser.uid);
      return (<Redirect to={{
                pathname: '/NewEntry',
                state: { test: FireVar.auth().currentUser.uid}
            }} />)
    }
      return(
        <div className='login-body'>
          <div className='content'>

            <div className='login-header'>
              <img className="ui medium image" src="https://raw.githubusercontent.com/samin23/498_Web_app/master/Messages%20Image(2808921936).png" />
            </div>

            <Input
              className='inputClass'
              onChange={this.emailInputChangeHandler}
              placeholder='Email'
              value={this.state.email} />
            <Input
              type="password"
              className='inputClass'
              onChange={this.passwordInputChangeHandler}
              placeholder='Password'
              value={this.state.password} />

            <div className='loginButtons'>
              <div className='loginButtonL'>
                <Button className="ui red button" role="button" onClick={this.register}>Register</Button>
              </div>
              <div className='loginButtonR'>
                <Button className="ui green button" role="button" onClick={this.login}>Login</Button>
              </div>

            </div>
          </div>
        </div>
      );
  }
}

Login.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
};

export default Login
