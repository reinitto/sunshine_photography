import React, { Component } from "react";
import Login from "../auth/Login";
import CameraOnly from "../../logo/camera-logo.svg";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

export default class Navbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null,
    loggedIn: this.props.isSignedIn,
    loginDisplay: "none",
    signupDisplay: "none",
    dropdownDisplay: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleWidth);
    this.handleWidth();
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
  toggleLogin() {
    this.setState({
      loginDisplay: this.state.loginDisplay === "none" ? "flex" : "none"
    });
  }
  toggleDropdownDisplay() {
    this.setState({
      dropdownDisplay: !this.state.dropdownDisplay
    });
  }
  requestLogin = (e, email) => {
    e.preventDefault();
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      //   url: "https://momblog-15d1c.firebaseapp.com",
      url: window.location.href,
      // This must be true.
      handleCodeInApp: true
    };
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          resolve(true);
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          // console.log("login error", error);
          reject(error);
        });
    });
  };

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
              onClick={() => {
                this.toggleDropdownDisplay();
                // console.log(
                //   'document.querySelector(".dropdown-menu").classList',
                //   document.querySelector(".dropdown-menu").classList
                // );
                // TOGGLE class
                // if (
                //   ![
                //     ...document.querySelector(".dropdown-menu").classList
                //   ].includes("show")
                // ) {
                //   document
                //     .querySelector(".dropdown-menu")
                //     .classList.add("show");
                // } else {
                //   document
                //     .querySelector(".dropdown-menu")
                //     .classList.remove("show");
                // }
              }}
              // onMouseEnter={() => {
              //   document.querySelector(".dropdown-menu").classList.add("show");
              // }}
              // onMouseLeave={() => {
              //   document
              //     .querySelector(".dropdown-menu")
              //     .classList.remove("show");
              // }}
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
                } ${this.state.dropdownDisplay ? "show" : null} `}
                aria-labelledby="navbarDropdownMenuLink"
                // onMouseLeave={() => {
                //   document
                //     .querySelector(".dropdown-menu")
                //     .classList.remove("show");
                // }}
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
                  onClick={() => this.toggleLogin()}
                  style={{
                    textAlign: this.state.windowWidth < 439 ? "center" : "left",
                    background: "transparent"
                  }}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
        <Login
          toggleLogin={this.toggleLogin.bind(this)}
          display={this.state.loginDisplay}
          requestLogin={this.requestLogin}
        />
      </nav>
    );
  }
}
