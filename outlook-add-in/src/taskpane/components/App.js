/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import * as React from "react";
/* eslint-enable no-unused-vars */
/* global require */
import reload from "./../../../assets/dislike.png";
import heart from "./../../../assets/like.png";
import loading from "./../../../assets/loading.gif";
import logo from "./../../../assets/logo-filled.png";
import Progress from "./Progress";
require("./../../../assets/icon-16.png");
require("./../../../assets/icon-32.png");
require("./../../../assets/icon-64.png");
require("./../../../assets/icon-80.png");
require("./../../../assets/icon-128.png");

const cleanupMessage = (message) => {
  let content = message;
  content = content.replace(/^\s*\n/gm, "");
  content = content.replace(/(\r\n|\r|\n){2,}/g, "$1\n");
  content = content.replace(/^\t*/gm, "");

  /*let from = content.match(/From: .*([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\n/g)
  let to = content.match(/To: .*\n/g)
  let sent = content.match(/Sent: .*\n/g)
  console.log(content)
  console.log(from)
  console.log(to)
  console.log(sent)*/
  content = content.replace(/To: .*\n/g, "");
  content = content.replace(/Cc: .*\n/g, "");
  content = content.replace(/Bcc: .*\n/g, "");
  content = content.replace(/Subject: .*\n/g, "");
  content = content.replace(/Sent: .*\n/g, "");
  content = content.replace(/From: .*<([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\n/g, "$1 : ");
  // console.log(content)
  return content;
};
class Popup extends React.Component {
  state = {
    loading: true,
    feedback: false,
    listItems: [],
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    let item = Office.context.mailbox.item;
    item.body.getAsync(Office.CoercionType.Text, async (asyncResult) => {
      let content = asyncResult.value.trim();
      content = cleanupMessage(content);
      content = item.from.emailAddress + " : " + item.subject + "\n" + content;
      if (content.length > 2000) {
        console.log(`Content is being trimmed from ${content.length}`);
        content = content.substring(0, 2000);
      }
      this.setState({ content });
      let formData = new FormData();
      formData.append("content", content);
      try {
        const response = await fetch("https://api.squasher.pro/squashit", {
          method: "POST",
          body: formData,
        });
        const data = await response.text();
        if (data.length > 0) {
          this.setState({
            summary: response.status === 200 ? data : "Unable to summarize the page",
            error: response.status !== 200 ? "error" : "",
            loading: false,
            feedback: false,
            engine: "openai",
          });
        } else {
          this.setState({
            summary: "Unable to summarize the page",
            error: "error",
            loading: false,
            feedback: false,
          });
        }
      } catch (error) {
        this.setState({
          summary: "Unable to summarize the page",
          error: "error",
          loading: false,
          feedback: false,
        });
      }
    });
  }

  refresh = () => {
    this.setState({ loading: true, summary: null, error: null });
    this.componentDidMount();
  };

  accept = () => {
    this.sendFeedback(this.state.content, this.state.summary, this.state.summary, this.state.engine);
  };

  toggleFeedback = () => {
    this.setState({ feedback: !this.state.feedback });
  };

  handleTextChange = (event) => {
    this.setState({ suggested: event.target.value });
  };

  submitFeedback = () => {
    this.setState({ loadingFeedback: true, feedback: true });
    this.sendFeedback(this.state.content, this.state.summary, this.state.suggested, this.state.engine);
    this.setState({ loadingFeedback: false, feedback: false });
  };

  sendFeedback = async (content, summary, suggestion, engine) => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("original_summary", summary);
    formData.append("suggested_summary", suggestion);
    formData.append("engine", engine);
    try {
      const response = await fetch("https://api.squasher.pro/feedback", {
        method: "POST",
        body: formData,
      });
      await response.text();
      return true;
    } catch (error) {
      return false;
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div className="loader">
              <img src={loading} className="App-logo" style={{ width: 300, height: 400 }} alt="loading" />
            </div>
          ) : (
            <img src={logo} className="App-logo" alt="logo" />
          )}
        </header>
        {this.state && this.state.summary && (
          <React.Fragment>
            {this.state.engine && (
              <div className="App-engine">
                <span>Engine: </span>
                <b>{this.state.engine}</b>
              </div>
            )}
            <div className={`App-content ${this.state.error}`}>
              {this.state.summary}
              <div className="App-content-overlay">
                <img src={reload} className="action" onClick={this.refresh} />
                <img src={heart} className="action" onClick={this.accept} />
              </div>
            </div>
            <div className="App-footer">
              <a href="#123" className="App-link" onClick={this.toggleFeedback}>
                Help improve!
              </a>
            </div>
            {this.state.feedback && (
              <div className="App-feedback">
                <textarea placeholder="Feedback" onChange={this.handleTextChange}>
                  {this.state.summary}
                </textarea>
                {this.state.loadingFeedback ? "Submitting...  " : ""}
                <button onClick={this.submitFeedback}>Submit</button>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Popup;

Popup.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
