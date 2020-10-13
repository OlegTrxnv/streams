import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "852882616756-i5edvc1066l6gjundqgg0nb4ckumddiu.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // after library is initialized assign auth instance to this.auth
          this.auth = window.gapi.auth2.getAuthInstance();
          // update auth state inside store by calling appropriate actions depending on current user status
          // ( isSignedIn.get() returns boolean)
          this.onAuthChange(this.auth.isSignedIn.get());
          // wait for auth status to change at some point
          // listen() passes true to onAuthChange when the user signs in, and false when the user signs out
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // passing userId that signed in to action creator to keep it in store
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={() => this.auth.signOut()}
          className="ui green google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          onClick={() => this.auth.signIn()}
          className="ui red google button"
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);


// gapi is wired up in index.html (no npm package available), useful to work with Google services
// Can play with gapi in browser console
// gapi.load downloads client:auth2 service, after that gapi client initializes library and returns a promise:
// Tap into auth instance and leverage isSignedIn.get() method to capture user's status in state
// Leverage listen() method to pass it a callback to be invoked every time user status changes.
// listen() passes true to this function when the user signs in, and false when the user signs out.



// // Without Redux
// class GoogleAuth extends React.Component {
//   state = { isSignedIn: null };

//   componentDidMount() {
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId:
//             "852882616756-i5edvc1066l6gjundqgg0nb4ckumddiu.apps.googleusercontent.com",
//           scope: "email",
//         })
//         .then(() => {
//           this.auth = window.gapi.auth2.getAuthInstance();
//           this.setState({ isSignedIn: this.auth.isSignedIn.get() });
//           this.auth.isSignedIn.listen(this.onAuthChange);
//         });
//     });
//   }

//   onAuthChange = (isSignedIn) => {
//     this.setState({ isSignedIn });
//   };

//   renderAuthButton() {
//     if (this.state.isSignedIn === null) {
//       return null;
//     } else if (this.state.isSignedIn) {
//       return (
//         <button
//           onClick={() => this.auth.signOut()}
//           className="ui green google button"
//         >
//           <i className="google icon" />
//           Sign Out
//         </button>
//       );
//     } else {
//       return (
//         <button
//           onClick={() => this.auth.signIn()}
//           className="ui red google button"
//         >
//           <i className="google icon" />
//           Sign in with Google
//         </button>
//       );
//     }
//   }

//   render() {
//     return <div>{this.renderAuthButton()}</div>;
//   }
// }