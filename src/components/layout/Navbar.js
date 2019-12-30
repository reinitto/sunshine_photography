import React, { Component } from "react";
import Login from "../auth/Login";
// import firebase from "firebase/app";
// import "firebase/auth";

// import firebase from "../../Firebase";
import CameraOnly from "../../logo/camera-logo.svg";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null,
    loggedIn: this.props.isSignedIn,
    loginDisplay: "none"
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleWidth);
    this.handleWidth();
    // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start("#firebaseui-auth-container", {
    //   signInOptions: [
    //     {
    //       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //       scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
    //       customParameters: {
    //         // Forces account selection even when one account
    //         // is available.
    //         prompt: "select_account"
    //       }
    //     }
    //   ]
    //   // Other config options...
    // });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleWidth);
  }

  handleWidth = () => {
    let width = document.documentElement.clientWidth;
    this.setState({
      windowWidth: width
    });
  };

  handleScroll = () => {
    var scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    this.setState({
      scrollTop
    });
  };
  showLogin() {
    this.setState({
      loginDisplay: this.state.loginDisplay == "none" ? "block" : "none"
    });
  }
  render() {
    let { scrollTop } = this.state;
    let { isSignedIn, firebase, setUser } = this.props;
    return (
      <nav
        className={`navbar navbar-expand-md fixed-top
         ${
           window.location.pathname.length === 1 && scrollTop > 0
             ? "bg-base border-bottom border-secondary"
             : ""
         }
         ${
           window.location.pathname.length === 1 && scrollTop === 0
             ? "bg-transparent"
             : ""
         }
         ${
           window.location.pathname.length > 1 && scrollTop > 0
             ? "bg-base border-bottom border-secondary"
             : ""
         }
         ${
           window.location.pathname.length > 1 && scrollTop === 0
             ? "bg-transparent"
             : ""
         }
    `}
      >
        <Link
          className="navbar-brand"
          to="/"
          style={{
            height: "60px",
            marginBottom: "1rem",
            margin: this.state.windowWidth < 776 ? "auto" : "initial"
          }}
        >
          {" "}
          Sunshine
          <img
            src={CameraOnly}
            style={{
              maxHeight: "100%",
              maxWidth: "100%"
            }}
            alt=""
          />{" "}
          Pictures
        </Link>
        <button
          // style={{
          //   margin: "auto"
          // }}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              marginTop: this.state.windowWidth < 439 ? "0rem" : "initial"
            }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            {isSignedIn ? (
              <li>
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}

            <li>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to={"/journal"} className="nav-link">
                Journal
              </Link>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => {
                document.querySelector(".dropdown-menu").classList.add("show");
              }}
              onMouseLeave={() => {
                document
                  .querySelector(".dropdown-menu")
                  .classList.remove("show");
              }}
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gallery
              </Link>
              <div
                className={`dropdown-menu mt-0 border-top-0 pt-0 ${
                  window.location.pathname === "/" && scrollTop === 0
                    ? "bg-transparent"
                    : "bg-base"
                } `}
                aria-labelledby="navbarDropdownMenuLink"
                onMouseLeave={() => {
                  document
                    .querySelector(".dropdown-menu")
                    .classList.remove("show");
                }}
              >
                <Link className="dropdown-item" to="/gallery#baby">
                  Baby
                </Link>
                <Link className="dropdown-item" to="/gallery#family">
                  Family
                </Link>
                <Link className="dropdown-item" to="/gallery#portrait">
                  Portrait
                </Link>
                <Link className="dropdown-item" to="/gallery#event">
                  Event
                </Link>
              </div>
            </li>

            <li>
              <Link
                to={"/pricing"}
                className="nav-link"
                style={{
                  textAlign: this.state.windowWidth < 439 ? "center" : "left"
                }}
              >
                Pricing
              </Link>
            </li>
            {isSignedIn ? (
              <li>
                <button
                  className="nav-link"
                  style={{
                    textAlign: this.state.windowWidth < 439 ? "center" : "left",
                    background: "transparent"
                  }}
                  onClick={() => {
                    firebase
                      .app()
                      .auth()
                      .signOut();
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="nav-link"
                  style={{
                    textAlign: this.state.windowWidth < 439 ? "center" : "left",
                    background: "transparent"
                  }}
                  onClick={() => {
                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                    this.showLogin();
                    // document.querySelector(".login-popup").style.display ==
                    // "none"
                    //   ? (document.querySelector(".login-popup").style.display =
                    //       "block")
                    //   : (document.querySelector(".login-popup").style.display =
                    //       "none");

                    // firebase
                    //   .auth()
                    //   .signInWithPopup(googleAuthProvider)
                    //   .then(function(result) {
                    //     // This gives you a Google Access Token. You can use it to access the Google API.
                    //     // var token = result.credential.accessToken;
                    //     // The signed-in user info.

                    //     // TODO : CREATE USER AFTER AUTHENTICATION IF IT DOESN'T EXIST

                    //     // Add a new document in collection "cities"
                    //     var user = result.user;
                    //     const { displayName, email, uid } = user;
                    //     const db = firebase.firestore();
                    //     var UserRef = db.collection("users");
                    //     UserRef.doc(email)
                    //       .get()
                    //       .then(function(doc) {
                    //         if (doc.exists) {
                    //           // console.log("Document data:", doc.data());
                    //         } else {
                    //           // doc.data() will be undefined in this case
                    //           console.log("No such document! Creating User");
                    //           UserRef.doc(email)
                    //             .set({
                    //               name: displayName,
                    //               email,
                    //               uid
                    //             })
                    //             .then(function() {
                    //               console.log("Document successfully created!");
                    //             })
                    //             .catch(function(error) {
                    //               console.error(
                    //                 "Error writing document: ",
                    //                 error
                    //               );
                    //             });
                    //         }
                    //       })
                    //       .catch(function(error) {
                    //         console.log("Error getting document:", error);
                    //       });

                    //     // console.log("uid", uid);
                    //     setUser({ displayName, email, uid });
                    //     // ...
                    //   })
                    //   .catch(function(error) {
                    //     // Handle Errors here.
                    //     var errorCode = error.code;
                    //     var errorMessage = error.message;
                    //     // The email of the user's account used.
                    //     var email = error.email;
                    //     // The firebase.auth.AuthCredential type that was used.
                    //     var credential = error.credential;
                    //     // ...
                    //   });

                    //
                    // FIREBAE AUTH UI VERSION
                    //

                    // var ui = new firebaseui.auth.AuthUI(firebase.auth());

                    // ui.start("#firebaseui-auth-container", {
                    //   callbacks: {
                    //     signInSuccessWithAuthResult: function(
                    //       authResult,
                    //       redirectUrl
                    //     ) {
                    //       // User successfully signed in.
                    //       // Return type determines whether we continue the redirect automatically
                    //       // or whether we leave that to developer to handle.
                    //       console.log("authResult", authResult);
                    //       const user = authResult.user;
                    //       const { displayName, email, uid } = user;
                    //       console.log(displayName, email, uid);
                    //       // redirectUrl = `${window.location.origin}/dashboard`;
                    //       setUser({ displayName, email, uid });
                    //       return false;
                    //     }
                    //   },
                    //   // signInSuccessUrl: `${window.location.origin}/dashboard`,
                    //   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                    //   signInFlow: "popup",
                    //   // signInSuccessUrl: '<url-to-redirect-to-on-success>',
                    //   signInOptions: [
                    //     // List of OAuth providers supported.
                    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
                    //   ]
                    //   // Other config options...
                    // });

                    // TODO: ADD SIGN UP PAGE WITH OPTIONS OF EMAIL OR GOOGLE
                    // TODO : ADD SIGN IN POP UP WITH OPTIONS OF EMAIL OR GOOGLE
                    //
                    //
                    //  EMAIL AND PASSWORD SIGN UP
                    //
                    //
                    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    //   // Handle Errors here.
                    //   var errorCode = error.code;
                    //   var errorMessage = error.message;
                    //   // ...
                    // });

                    //
                    // EMAIL AND PASSWORD LOGIN
                    //
                    //
                  }}
                >
                  Log In
                </button>
              </li>
            )}
          </ul>
        </div>
        <Login
          showLogin={this.showLogin.bind(this)}
          display={this.state.loginDisplay}
        />
      </nav>
    );
  }
}
