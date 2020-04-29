import React, { Component } from "react";
import Login from "../auth/Login";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class MyNavbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null,
    loggedIn: this.props.isSignedIn,
    loginDisplay: "none",
    dropdownDisplay: false,
    journals: [],
    active: "/home",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleWidth);
    this.handleWidth();
    this.props.getJournals();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleWidth);
  }

  handleWidth = () => {
    let width = document.documentElement.clientWidth;
    this.setState({
      windowWidth: width,
    });
  };

  handleScroll = () => {
    var scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    this.setState({
      scrollTop,
    });
  };
  handleSelect = (eventKey) => {
    console.log(eventKey);
    this.setState({
      active: eventKey,
    });
  };
  toggleLogin() {
    this.setState({
      loginDisplay: this.state.loginDisplay === "none" ? "flex" : "none",
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
      handleCodeInApp: true,
    };
    return new Promise((resolve, reject) => {
      this.props.firebase
        .auth()
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
  };

  render() {
    let { isSignedIn, firebase, setUser, isAdmin, services } = this.props;
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
            // defaultActiveKey="/"
            activeKey={this.state.active}
            onSelect={this.handleSelect}
          >
            {isAdmin ? (
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            ) : null}
            {isSignedIn ? (
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            ) : null}
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Services" id="collasible-nav-dropdown-services">
              {Object.keys(services).map((key) => {
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
            <Nav.Link href={`/#contactForm`}>Contact</Nav.Link>
            <NavDropdown title="Blog" id="collasible-nav-dropdown-blog">
              {this.props.journals
                ? Object.keys(this.props.journals).map((journalId, i) => {
                    let { shortTitle } = this.props.journals[journalId].title;
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
                    firebase.app().auth().signOut();
                    setUser(null);
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
