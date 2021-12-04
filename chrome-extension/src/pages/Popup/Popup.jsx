import React, { Component, Fragment } from 'react';
import reload from '../../assets/img/dislike.png';
import heart from '../../assets/img/like.png';
import loading from '../../assets/img/loading.gif';
import logo from '../../assets/img/logo.png';
import './Popup.css';

class Popup extends Component {
  state = {
    loading: true,
    feedback: false,
  };

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'get-page-data'}, async content => {
        console.log(content);
        this.setState({content});
        let formData = new FormData();
        formData.append("content", content);
        try {
          const response = await fetch('https://api.squasher.pro/squashit', {
            method: 'POST',
            body: formData
          });
          const data = await response.text();
          if (data.length > 0) {
            this.setState({ 
              summary: response.status === 200 ? data : 'Unable to summarize the page',
              error: response.status !== 200 ? 'error' : '',
              loading: false,
              feedback: false,
              engine: 'openai'
            });
          } else {
            this.setState({ 
              summary: 'Unable to summarize the page',
              error: 'error',
              loading: false,
              feedback: false
            });
          }
        } catch (error) {
          this.setState({ 
            summary: 'Unable to summarize the page',
            error: 'error',
            loading: false,
            feedback: false
          });
        }
      });
    });
  }

  refresh = () => {
    this.setState({loading: true, summary: null, error: null});
    this.componentDidMount();
  }

  accept = () => {
    this.sendFeedback(this.state.content, this.state.summary, this.state.summary, this.state.engine);
  }

  toggleFeedback = () => {
    this.setState({feedback: !this.state.feedback});
  }

  handleTextChange = (event) => {
    this.setState({ suggested: event.target.value });
  }

  submitFeedback = () => {
    this.setState({loadingFeedback: true, feedback: true});
    this.sendFeedback(this.state.content, this.state.summary, this.state.suggested, this.state.engine);
    this.setState({loadingFeedback: false, feedback: false});
  }

  sendFeedback = async (content, summary, suggestion, engine) => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("original_summary", summary);
    formData.append("suggested_summary", suggestion);
    formData.append("engine", engine);
    try {
      const response = await fetch('https://api.squasher.pro/feedback', {
        method: 'POST',
        body: formData
      });
      await response.text();
      return true;
    } catch (error) {
      return false;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div className="loader">
              <img src={loading} className="App-logo" style={{width: 300, height: 400}} alt="loading" />
            </div>
          ) : <img src={logo} className="App-logo" alt="logo" />}
        </header>
        {this.state && this.state.summary && (
          <Fragment>
            {this.state.engine && (
                <div className="App-engine">
                  <span>Engine: </span>
                  <b>{this.state.engine}</b>
                </div>
              )}
            <div className={`App-content ${this.state.error}`}>
              {this.state.summary}
              <div className="App-content-overlay">
                <img src={reload} className="action" onClick={this.refresh}/>
                <img src={heart} className="action" onClick={this.accept}/>
              </div>
            </div>
            <div className="App-footer">
              <a href="#123" className="App-link" onClick={this.toggleFeedback}>Help improve!</a>
            </div>
            {this.state.feedback && (
              <div className="App-feedback">
                <textarea placeholder="Feedback" onChange={this.handleTextChange}>
                {this.state.summary}
                  </textarea>
                {this.state.loadingFeedback ? "Submitting...  ": ""}
                <button onClick={this.submitFeedback}>Submit</button>
              </div>
            )}
          </Fragment>
          )}
    </div>
    );
  }
}

export default Popup;