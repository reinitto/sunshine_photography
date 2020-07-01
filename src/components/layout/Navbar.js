import React, { Component, lazy } from "react";
import { NavHashLink } from "react-router-hash-link";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
const Login = lazy(() => import("../auth/Login"));

let capitalize = (text) => {
  let res = [];
  text.split(" ").forEach((word) => {
    res.push(word.slice(0, 1).toUpperCase() + word.slice(1));
  });
  return res.join(" ");
};

const LanguageButton = withRouter(({ history, language, setLanguage }) => {
  let onClick = () => {
    // get curr loc
    let newLang = window.location.pathname.split("/");
    newLang[1] = language;
    let newUrl = newLang.join("/");
    setLanguage(language);
    history.push(newUrl);
  };
  let displayLang = language;
  if (language === "us") {
    displayLang = "eng";
  }
  return (
    <div
      as={NavLink}
      className={`nav-link nav-link-lang ${
        window.location.pathname.split("/")[1] === language ? "selected" : ""
      }`}
      onClick={onClick}
    >
      {displayLang.toUpperCase()}
    </div>
  );
});

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
      language,
      setLanguage,
      translations,
    } = this.props;
    let nav_journals =
      typeof journals === "object"
        ? Object.keys(journals).map((journalId, i) => {
            let { shortTitle } = journals[journalId].title;
            let inLang = shortTitle[language]
              ? shortTitle[language]
              : shortTitle["us"];
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
            let inLang = name[language]
              ? name[language]
              : name["eng"] || name["us"];
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
        <Navbar.Toggle aria-controls="collapsibleNavbar" />
        <Navbar.Collapse id="collapsibleNavbar">
          <Nav className="mr-auto" onClick={this.collapseNavOnMobile}>
            <LanguageButton language="us" setLanguage={setLanguage} />
            <LanguageButton language="lv" setLanguage={setLanguage} />
            <LanguageButton language="no" setLanguage={setLanguage} />
          </Nav>
          <Nav className="ml-auto">
            {isAdmin && (
              <NavLink
                className="nav-link"
                to="/us/admin"
                activeClassName="selected"
              >
                Admin
              </NavLink>
            )}
            {/* {isSignedIn && (
              <NavLink
                className="nav-link"
                to={`/${language}/dashboard`}
                activeClassName="selected"
              >
                Dashboard
              </NavLink>
            )} */}
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
              {Object.keys(translations).length > 0
                ? capitalize(
                    translations["navigation"]["buttonTexts"]["home"][language]
                  ) || "Home"
                : "Home"}
            </NavLink>

            <NavDropdown
              title={
                Object.keys(translations).length > 0
                  ? capitalize(
                      translations["navigation"]["buttonTexts"]["services"][
                        language
                      ]
                    ) || "Services"
                  : "Services"
              }
              id="collapsible-nav-dropdown-services"
              active={
                window.location.pathname.includes("services") ? true : false
              }
            >
              {nav_services}
            </NavDropdown>
            <NavLink
              className="nav-link"
              to={`/${language}/About`}
              isActive={(match, location) =>
                window.location.pathname.includes("About") &&
                location.hash === ""
                  ? true
                  : false
              }
              activeClassName="selected"
              onClick={this.collapseNavOnMobile}
            >
              {Object.keys(translations).length > 0
                ? capitalize(
                    translations["navigation"]["buttonTexts"]["about"][language]
                  ) || "About Me"
                : "About Me"}
            </NavLink>
            <NavHashLink
              className="nav-link"
              isActive={(match, location) => location.hash === "#contactForm"}
              activeClassName="selected"
              to={`/${language}/home#contactForm`}
              onClick={this.collapseNavOnMobile}
            >
              {Object.keys(translations).length > 0
                ? capitalize(
                    translations["navigation"]["buttonTexts"]["contact"][
                      language
                    ]
                  ) || "Contact"
                : "Contact"}
            </NavHashLink>
            <NavDropdown
              title={
                Object.keys(translations).length > 0
                  ? capitalize(
                      translations["navigation"]["buttonTexts"]["blog"][
                        language
                      ]
                    ) || "Blog"
                  : "Blog"
              }
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
              <div
                as={Link}
                // to="/#"
                className="nav-link"
                onClick={() => this.toggleLogin()}
              >
                Login
              </div>
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
