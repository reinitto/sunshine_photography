import React, { Component, lazy } from "react";
import { NavHashLink } from "react-router-hash-link";
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
      location,
      journals,
    } = this.props;
    let locationHash = location && location.hash ? location.hash : "";
    let locationPathname =
      location && location.pathname ? location.pathname.split("/")[1] : "";

    // let dropdowns = ["services", "journal", "info"];
    // let allActives = document.querySelector(".navbar")
    //   ? document.querySelector(".navbar").querySelectorAll(".active")
    //   : [];
    // if (
    //   allActives.length > 0 &&
    //   !dropdowns.includes(locationPathname) &&
    //   (locationHash || locationPathname)
    // ) {
    //   // remove all active classes
    //   dropdowns.forEach((dropdown) => {
    //     document
    //       .querySelector(`#collasible-nav-dropdown-${dropdown}`)
    //       .classList.remove("active");
    //   });
    //   allActives.forEach((withActiveClass) => {
    //     withActiveClass.classList.remove("active");
    //   });
    // }
    // if (dropdowns.includes(locationPathname)) {
    //   // remove all active classes
    //   allActives.length > 0 &&
    //     allActives.forEach((withActiveClass) => {
    //       withActiveClass.classList.remove("active");
    //     });
    //   document.querySelector(`#collasible-nav-dropdown-${locationPathname}`) &&
    //     document
    //       .querySelector(`#collasible-nav-dropdown-${locationPathname}`)
    //       .classList.add("active");
    // }
    // if (locationPathname === "About") {
    //   // remove all active classes
    //   allActives.length > 0 &&
    //     allActives.forEach((withActiveClass) => {
    //       withActiveClass.classList.remove("active");
    //     });
    //   document.querySelector(`#collasible-nav-dropdown-info`) &&
    //     document
    //       .querySelector(`#collasible-nav-dropdown-info`)
    //       .classList.add("active");
    // }
    // if (locationHash === "#contactForm") {
    //   // remove all active classes
    //   allActives.length > 0 &&
    //     allActives.forEach((withActiveClass) => {
    //       withActiveClass.classList.remove("active");
    //     });
    //   document.querySelector(`#navlink-contactForm`) &&
    //     document.querySelector(`#navlink-contactForm`).classList.add("active");
    // }

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
          <Nav
            className="ml-auto mr-2"
            activeKey={`/${locationPathname || locationHash || "home"}`}
          >
            {isAdmin && (
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            )}
            {isSignedIn && (
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Services" id="collasible-nav-dropdown-services">
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
            <NavDropdown title="Info" id="collasible-nav-dropdown-info">
              <LinkContainer to="/About">
                <NavDropdown.Item>About Me</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={`#`}>
                <NavDropdown.Item disabled>
                  What they are saying
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={`#`}>
                <NavDropdown.Item disabled>Photo Book</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavHashLink
              className="nav-link"
              id="navlink-contactForm"
              to={`/home#contactForm`}
              onClick={this.collapseNavOnMobile}
            >
              Contact
            </NavHashLink>
            <NavDropdown title="Blog" id="collasible-nav-dropdown-journal">
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
              <LinkContainer to="/#">
                <Nav.Link
                  onClick={() => {
                    firebase("auth").then(({ auth }) => {
                      auth.signOut();
                      setUser(null);
                    });
                  }}
                >
                  Logout
                </Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/#">
                <Nav.Link
                  className="nav-link"
                  onClick={() => this.toggleLogin()}
                >
                  Login
                </Nav.Link>
              </LinkContainer>
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
