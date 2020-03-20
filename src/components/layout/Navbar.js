import React, { Component } from "react";
import Login from "../auth/Login";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import journals from "../../content/journals.json";

const servicesNames = [
  "family",
  "children",
  "couples",
  "friends",
  "lifestyle",
  "company"
];

export default class Navbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null,
    loggedIn: this.props.isSignedIn,
    loginDisplay: "none",
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
            {window.location.pathname === "/" ? null : (
              <li>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
            )}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"#"}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Services
              </Link>
              <div
                className={`dropdown-menu mt-0 border-top-0 pt-0 ${
                  window.location.pathname === "/" && scrollTop === 0
                    ? "bg-transparent"
                    : "bg-base-color"
                } `}
              >
                {servicesNames.map((name, i) => {
                  return (
                    <Link
                      className="dropdown-item"
                      to={`/gallery#${name}`}
                      key={i}
                    >
                      {name[0].toLocaleUpperCase() + name.slice(1)}
                    </Link>
                  );
                })}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Info
              </Link>
              <div
                className={`dropdown-menu mt-0 border-top-0 pt-0 ${
                  window.location.pathname === "/" && scrollTop === 0
                    ? "bg-transparent"
                    : "bg-base-color"
                } `}
              >
                <a as={Link} className="dropdown-item" href="/#aboutMe">
                  About Me
                </a>
                <Link className="dropdown-item" to="#">
                  What they are saying
                </Link>
                <Link className="dropdown-item" to="#">
                  Photo Book
                </Link>
              </div>
            </li>
            <li>
              <a as={Link} href="/#contactForm" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item dropdown">
              <Link
                to={"#"}
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Blog
              </Link>
              <div
                className={`dropdown-menu mt-0 border-top-0 pt-0 ${
                  window.location.pathname === "/" && scrollTop === 0
                    ? "bg-transparent"
                    : "bg-base-color"
                } `}
              >
                {Object.keys(journals).map((title, i) => {
                  return (
                    <Link
                      className="dropdown-item"
                      to={`/journal#${title}`}
                      key={i}
                    >
                      {title[0].toUpperCase() +
                        title.slice(1).replace("_", " ")}
                    </Link>
                  );
                })}
              </div>
            </li>
            {isSignedIn ? (
              <li>
                <Link
                  to={"#"}
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
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to={"#"}
                  className="nav-link"
                  onClick={() => this.toggleLogin()}
                  style={{
                    textAlign: this.state.windowWidth < 439 ? "center" : "left",
                    background: "transparent"
                  }}
                >
                  Login
                </Link>
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
