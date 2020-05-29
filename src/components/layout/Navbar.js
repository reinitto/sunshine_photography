import React, { Component, lazy } from "react";
import { NavHashLink } from "react-router-hash-link";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Login = lazy(() => import("../auth/Login"));

export default class MyNavbar extends Component {
  state = {
    loggedIn: this.props.isSignedIn,
    loginDisplay: "none",
  };
  toggleLogin() {
    this.setState({
      loginDisplay: this.state.loginDisplay === "none" ? "flex" : "none",
    });
  }
  collapseNavOnMobile(e) {
    let collapsibleNav = document.querySelector("#collapsibleNavbar.show");
    let navbarToggler = document.querySelector(".navbar-toggler");
    if (collapsibleNav && navbarToggler) {
      navbarToggler.click();
    }
  }

  requestLogin = (e, email) => {
    e.preventDefault();
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      //   url: "https://momblog-15d1c.firebaseapp.com",
      url: window.location.href,
      // This must be true.
      handleCodeInApp: true,
    };
    return new Promise((resolve, reject) => {
      this.props.firebase("auth").then(({ auth }) => {
        auth
          .sendSignInLinkToEmail(email, actionCodeSettings)
          .then(function () {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", email);
            resolve(true);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    });
  };

  render() {
    let {
      isSignedIn,
      firebase,
      setUser,
      isAdmin,
      services,
      journals,
    } = this.props;

    return (
      <Navbar
        collapseOnSelect={true}
        fixed="top"
        expand="md"
        className={`navbar navbar-expand-md fixed-top bg-base border-bottom border-secondary`}
      >
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="collapsibleNavbar" />
        <Navbar.Collapse id="collapsibleNavbar">
          <Nav className="ml-auto mr-2">
            {isAdmin && (
              <NavLink
                className="nav-link"
                to="/admin"
                activeClassName="selected"
              >
                Admin
              </NavLink>
            )}
            {isSignedIn && (
              <NavLink
                className="nav-link"
                to="/dashboard"
                activeClassName="selected"
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              className="nav-link"
              to="/home"
              isActive={(match, location) =>
                location.pathname === "/home" && location.hash === ""
              }
              activeClassName="selected"
            >
              Home
            </NavLink>

            <NavDropdown
              title="Services"
              id="collapsible-nav-dropdown-services"
              active={
                window.location.pathname.includes("services") ? true : false
              }
            >
              {typeof services === "object" &&
                Object.keys(services).map((key) => {
                  return (
                    <LinkContainer
                      to={`/services/${key}`}
                      key={services[key].folder_name}
                    >
                      <NavDropdown.Item>
                        {services[key].name[0].toUpperCase() +
                          services[key].name.slice(1)}
                      </NavDropdown.Item>
                    </LinkContainer>
                  );
                })}
            </NavDropdown>
            <NavDropdown
              title="Info"
              id="collasible-nav-dropdown-info"
              active={window.location.pathname.includes("About") ? true : false}
            >
              <LinkContainer to="/About">
                <NavDropdown.Item>About Me</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={`#`}>
                <NavDropdown.Item disabled>
                  What they are saying
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavHashLink
              className="nav-link"
              isActive={(match, location) => location.hash === "#contactForm"}
              activeClassName="selected"
              to={`/home#contactForm`}
              onClick={this.collapseNavOnMobile}
            >
              Contact
            </NavHashLink>
            <NavDropdown
              title="Blog"
              id="collasible-nav-dropdown-journal"
              active={
                window.location.pathname.includes("journal") ? true : false
              }
            >
              {typeof journals === "object"
                ? Object.keys(journals).map((journalId, i) => {
                    let { shortTitle } = journals[journalId].title;
                    return (
                      <LinkContainer
                        key={journalId}
                        to={`/journal/${journalId}`}
                      >
                        <NavDropdown.Item>
                          {shortTitle[0].toUpperCase() + shortTitle.slice(1)}
                        </NavDropdown.Item>
                      </LinkContainer>
                    );
                  })
                : null}
            </NavDropdown>
            {isSignedIn ? (
              <Link
                to="/#"
                className="nav-link"
                onClick={() => {
                  firebase("auth").then(({ auth }) => {
                    auth.signOut();
                    setUser(null);
                  });
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/#"
                className="nav-link"
                onClick={() => this.toggleLogin()}
              >
                Login
              </Link>
            )}
            <Login
              toggleLogin={this.toggleLogin.bind(this)}
              display={this.state.loginDisplay}
              requestLogin={this.requestLogin}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export { MyNavbar };
