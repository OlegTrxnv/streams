import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "852882616756-i5edvc1066l6gjundqgg0nb4ckumddiu.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button
          onClick={() => this.auth.signOut()}
          className="ui dark-gray google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          onClick={() => this.auth.signIn()}
          className="ui green google button"
        >
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;

// gapi is wired up in index.html (no npm package available), useful to work with Google services
// can play with gapi in browser console
// gapi.load downloads client:auth2 service, after that gapi client initializes library and returns a promise:
// tap into auth instance and leverage isSignedIn.get() method to capture user's status in state
// leverage listen() method to pass it a callback to be invoked every time user status changes
