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

  changeLanguage = (lang) => {
    let newLang =
      this.props &&
      this.props.location &&
      this.props.location.pathname &&
      this.props.location.pathname.replace(this.props.language, lang);
    return newLang || `/${lang}/home`;
  };

  render() {
    let {
      isSignedIn,
      firebase,
      setUser,
      isAdmin,
      services,
      journals,
      language,
      setLanguage,
    } = this.props;
    let nav_journals =
      typeof journals === "object"
        ? Object.keys(journals).map((journalId, i) => {
            let { shortTitle } = journals[journalId].title;
            let inLang = shortTitle[language]
              ? shortTitle[language]
              : shortTitle["eng"];
            return (
              <LinkContainer
                key={journalId}
                to={`/${language}/journal/${journalId}`}
              >
                <NavDropdown.Item>
                  {inLang[0].toUpperCase() + inLang.slice(1)}
                </NavDropdown.Item>
              </LinkContainer>
            );
          })
        : null;
    let nav_services =
      typeof services === "object"
        ? Object.keys(services).map((key) => {
            let { name } = services[key];
            let inLang = name[language] ? name[language] : name["eng"];
            return (
              <LinkContainer
                to={`/${language}/services/${key}`}
                key={services[key].folder_name}
              >
                <NavDropdown.Item>
                  {inLang[0].toUpperCase() + inLang.slice(1)}
                </NavDropdown.Item>
              </LinkContainer>
            );
          })
        : null;

    return (
      <Navbar
        collapseOnSelect={true}
        fixed="top"
        expand="md"
        className="navbar navbar-expand-md fixed-top"
      >
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="collapsibleNavbar" />
        <Navbar.Collapse id="collapsibleNavbar">
          <Nav className="ml-auto">
            <NavLink
              className="nav-link"
              to={() => this.changeLanguage("eng")}
              isActive={(match, location) =>
                location.pathname.split("/")[1] === "eng"
              }
              activeClassName="selected"
              onClick={() => setLanguage("eng")}
            >
              <i className="ae flag"></i>
              <i className="france flag"></i>
              <i className="myanmar flag"></i>
              ENG
            </NavLink>
            <NavLink
              className="nav-link"
              to={() => this.changeLanguage("lv")}
              isActive={(match, location) =>
                location.pathname.split("/")[1] === "lv"
              }
              activeClassName="selected"
              onClick={() => setLanguage("lv")}
            >
              LAT
            </NavLink>
            <NavLink
              className="nav-link"
              to={() => this.changeLanguage("no")}
              isActive={(match, location) =>
                location.pathname.split("/")[1] === "no"
              }
              activeClassName="selected"
              onClick={() => setLanguage("no")}
            >
              NOR
            </NavLink>
            {isAdmin && (
              <NavLink
                className="nav-link"
                to="/eng/admin"
                activeClassName="selected"
              >
                Admin
              </NavLink>
            )}
            {isSignedIn && (
              <NavLink
                className="nav-link"
                to={`/${language}/dashboard`}
                activeClassName="selected"
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              className="nav-link"
              to={`/${language}/home`}
              isActive={(match, location) =>
                window.location.pathname.includes("home") &&
                location.hash === ""
                  ? true
                  : false
              }
              activeClassName="selected"
              onClick={this.collapseNavOnMobile}
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
              {nav_services}
            </NavDropdown>
            <NavDropdown
              title="Info"
              id="collasible-nav-dropdown-info"
              active={window.location.pathname.includes("About") ? true : false}
            >
              <LinkContainer to={`/${language}/About`}>
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
              to={`/${language}/home#contactForm`}
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
              {nav_journals}
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
