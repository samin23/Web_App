import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { FireVar } from '../Firebase/FirebaseConfig.js';
import { Redirect } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/styles/hljs';
import AlertContainer from 'react-alert'



import 'semantic-ui-css/semantic.min.css';
import './NewEntry.css';

class NewEntry extends Component {
  constructor(props){
    super(props)
    this.state={
      text: '',
      text1: '',
      text2: '',
      text3: '',
    }
    this.savestate = this.savestate.bind(this);
    this.titleInputChangeHandler = this.titleInputChangeHandler.bind(this);
    this.codeInputChangeHandler = this.codeInputChangeHandler.bind(this);
    this.commentsInputChangeHandler = this.commentsInputChangeHandler.bind(this);
    this.languageInputChangeHandler = this.languageInputChangeHandler.bind(this);
    this.add = this.add.bind(this);
  }
  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 15000,
    transition: 'scale'
  }
  showAlert = () => {
    this.msg.show('Code Successfully Saved', {
      time: 15000,
      type: 'success',
    })
  }

  savestate(){
    //console.log(this.state)
    this.showAlert();
    fetch("http://165.227.123.227:4001/api/code", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firebaseID: FireVar.auth().currentUser.uid,
        language: this.state.text3,
        code: this.state.text1,
        comment: this.state.text2,
        title: this.state.text
      })
    });
    this.setState({
      text: '',
      text1: '',
      text2: '',
      text3: '',
    });

    //console.log("saved");
  }

  // Updates title whenever the title input is changed
  titleInputChangeHandler(event){
    this.setState({ text: event.target.value });
  }

  // Updates code whenever the code input is changed
  codeInputChangeHandler(event){
    this.setState({ text1: event.target.value });
    //console.log(this.state);
  }

  // Updates comments whenever the comments input is changed
  commentsInputChangeHandler(event){
    this.setState({ text2: event.target.value });
  }

  languageInputChangeHandler(event){
    this.setState({ text3: event.target.value});
    //console.log(this.state);
  }
  add(event){
    if (event.keyCode === 9) { // tab was pressed
        console.log(this.state);
        event.preventDefault();
        var val = this.state.text1,
          start = event.target.selectionStart,
          end = event.target.selectionEnd;
          this.setState(
              {
                  text1: val.substring(0, start) + '\t' + val.substring(end)
              },
              () => {
                //  this.refs.input.selectionStart = this.refs.input.selectionEnd = start + 1
              });
      }
  }


  render(){
    if(!this.props.location.state){
      return (<Redirect to={{pathname: '/'}} />)
    }
    else{
      return(
        <div className='NewEntry'>
          <h1 className='title'>New Entry</h1>
          <h3 className='inputheader'>Title:</h3>
          <Input
            className='entryInputClass'
            onChange={this.titleInputChangeHandler}
            value={this.state.text} />
          <h3 className='inputheader'>Language:</h3>
            <select className='language' onChange={this.languageInputChangeHandler}>
              <option>{this.state.text3}</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
              <option value="elm">Elm</option>
              <option value="react">React</option>
          </select>
          <h3 className='inputheader'>Code:</h3>
          <div>
            <textarea
              className='entryInputClass'
              onChange={this.codeInputChangeHandler}
              onKeyDown={this.add}
              value={this.state.text1}
              rows='10'
              cols='70'
              >
            </textarea>
          <div className='codes'>
            <SyntaxHighlighter language={this.state.text3} style={tomorrowNightEighties}>{this.state.text1}</SyntaxHighlighter>
          </div>
          <h3 className='inputheader'>Comments:</h3>
          <Input
            className='entryInputClass'
            onChange={this.commentsInputChangeHandler}
            value={this.state.text2} />
          <br></br>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
          <Button className="ui green button" role="button" onClick={this.savestate}>SAVE</Button>
        </div>
      )
    }
  }
}

NewEntry.propTypes = {
    text: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    text3: PropTypes.string
};


export default NewEntry
