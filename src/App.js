import React, { Component, Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import firebase from "./Firebase";
import Home from "./Pages/Home";
import Spinner from "./components/Spinner";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/ProtectedRoute";
import "./styles/style.css";
const Journal = lazy(() => import("./Pages/Journal"));
const Services = lazy(() => import("./Pages/Services"));
const Admin = lazy(() => import("./Pages/Admin"));
const About = lazy(() => import("./Pages/About"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      admin: false,
      journals: [],
      services: [],
      instagram: [],
      currentRoute: "/home",
    };
  }

  async componentDidMount() {
    await this.getServices();
    await this.getJournals();
    await this.getInstagram();

    firebase("auth").then(({ auth }) => {
      auth.onAuthStateChanged((user) => {
        this.setState({ user: user });
        if (auth.currentUser) {
          auth.currentUser
            .getIdTokenResult()
            .then((idTokenResult) => {
              this.setAdmin(!!idTokenResult.claims.admin);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });

      // Confirm the link is a sign-in with email link.
      if (auth.isSignInWithEmailLink(window.location.href)) {
        var email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation");
        }
        // The client SDK will parse the code from the link for you.
        auth
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            const { user } = result;
            this.setUser(user);
          })
          .catch(function (error) {
            console.log("login erorr", error);
          });
      }
    });
    this.setLocation(window.location);
    // ONLY ON MOBILE
    // COLLAPSE NAVBAR IF CLICKED OUTSIDE
    if (window.innerWidth <= 768) {
      document.addEventListener("click", this.handleCollapseNav);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleCollapseNav);
  }
  handleCollapseNav(e) {
    let collapsibleNav = document.querySelector("#collapsibleNavbar.show");
    if (
      collapsibleNav &&
      e.target !== collapsibleNav &&
      !collapsibleNav.contains(e.target)
    ) {
      let navbarToggler = document.querySelector(".navbar-toggler");
      navbarToggler.click();
    }
  }

  setLocation = (location) => {
    this.setState({
      currentRoute: location,
    });
  };

  getJournals() {
    firebase("database").then(({ database }) => {
      database
        .ref("/journals/")
        .once("value")
        .then((snapshot) => {
          let journalSnap = snapshot.val();
          if (journalSnap) {
            // SET JOURNALS
            this.setState({
              journals: journalSnap,
            });
          }
        });
    });
  }
  getServices() {
    firebase("database").then(({ database }) => {
      database
        .ref("/services/")
        .once("value")
        .then((snapshot) => {
          let servicesSnap = snapshot.val();
          if (servicesSnap) {
            this.setState({
              services: servicesSnap,
            });
          }
        });
    });
  }

  getInstagram() {
    firebase("database").then(({ database }) => {
      database
        .ref("/instagram/")
        .once("value")
        .then((snapshot) => {
          let instaSnap = snapshot.val();
          if (instaSnap) {
            this.setState({
              instagram: instaSnap,
            });
          }
        });
    });
  }

  setAdmin(admin) {
    this.setState({ admin });
  }
  setUser(user) {
    this.setState({ user });
  }

  render() {
    console.log("instagram", this.state.instagram);
    return (
      <Router>
        <ScrollToTop setLocation={this.setLocation.bind(this)}>
          <Fragment>
            <Suspense
              fallback={
                <div
                  style={{
                    height: "57px",
                    width: "100%",
                    position: "fixed",
                    top: 0,
                    left: 0,
                  }}
                ></div>
              }
            >
              <Navbar
                isAdmin={this.state.admin}
                isSignedIn={this.state.user}
                firebase={firebase}
                setUser={this.setUser.bind(this)}
                journals={this.state.journals}
                services={this.state.services}
                location={this.state.currentRoute}
              />
            </Suspense>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => {
                  return (
                    <Suspense
                      fallback={
                        <div
                          style={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Spinner />
                        </div>
                      }
                    >
                      <Home
                        {...props}
                        journals={this.state.journals}
                        services={this.state.services}
                        firebase={firebase}
                      />
                    </Suspense>
                  );
                }}
              />
              <Route
                path="/journal/:name"
                render={(props) => (
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100vw",
                          height: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner />
                      </div>
                    }
                  >
                    <Journal {...props} journals={this.state.journals} />
                  </Suspense>
                )}
              />
              <Route
                path="/services/:service"
                render={(props) => (
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100vw",
                          height: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner />
                      </div>
                    }
                  >
                    <Services {...props} services={this.state.services} />
                  </Suspense>
                )}
              />
              <Route
                path="/About"
                render={(props) => (
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100vw",
                          height: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner />
                      </div>
                    }
                  >
                    <About />
                  </Suspense>
                )}
              />
              <AdminRoute
                path="/admin"
                component={Admin}
                isAdmin={this.state.admin}
                user={this.state.user}
                journals={this.state.journals}
                instagram={this.state.instagram}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                firebase={firebase}
                isSignedIn={this.state.user}
                user={this.state.user}
              />
              <Route
                render={(props) => (
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100vw",
                          height: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner />
                      </div>
                    }
                  >
                    <Home
                      {...props}
                      journals={this.state.journals}
                      services={this.state.services}
                      firebase={firebase}
                    />
                  </Suspense>
                )}
              />
            </Switch>
          </Fragment>
        </ScrollToTop>
        <Suspense
          fallback={
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </div>
          }
        >
          <Footer instagram={this.state.instagram} />
        </Suspense>
      </Router>
    );
  }
}
export default App;
