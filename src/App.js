import React, { Component, Fragment, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import firebase from "./Firebase";
import Home from "./Pages/Home";
import Spinner from "./components/Spinner";
// import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/ProtectedRoute";
import Language from "./components/Language";
import "./styles/style.css";
const Footer = lazy(() => import("./components/layout/Footer"));
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
      translations: {},
      currentRoute: "/us/home",
      language: "us",
    };
  }

  async componentDidMount() {
    await this.getServices();
    await this.getJournals();
    await this.getInstagram();
    await this.getTranslations();
    // set correct language
    let currLanguage = window.location.pathname.split("/")[1];
    this.setLanguage(currLanguage);
    this.setCurrentRoute(window.location.pathname);
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
  getTranslations() {
    firebase("database").then(({ database }) => {
      database
        .ref("/pages/")
        .once("value")
        .then((snapshot) => {
          let pageTrans = snapshot.val();
          if (pageTrans) {
            this.setState({
              translations: pageTrans,
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

  setLanguage(language) {
    this.setState({ language });
    this.setHtmlLang(language);
  }
  setHtmlLang(language) {
    let setLang = language;
    if (language === "us") {
      setLang = "en";
    }
    document.querySelector("html").lang = setLang;
  }
  setCurrentRoute(route) {
    this.setState({
      currentRoute: route,
    });
  }

  render() {
    let innerRoutes = (
      <Fragment>
        <Route
          path={`/:lang/home`}
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
                  language={this.state.language}
                  translations={{
                    home: this.state.translations["home"],
                    contact: this.state.translations["contact"],
                  }}
                />
              </Suspense>
            );
          }}
        />
        <Route
          path="/:lang/journal/:name"
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
              <Journal
                {...props}
                journals={this.state.journals}
                language={this.state.language}
              />
            </Suspense>
          )}
        />
        <Route
          path="/:lang/services/:service"
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
              <Services
                {...props}
                services={this.state.services}
                language={this.state.language}
              />
            </Suspense>
          )}
        />
        <Route
          path="/:lang/About"
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
              <About
                language={this.state.language}
                translations={{
                  about: this.state.translations["about"],
                  contact: this.state.translations["contact"],
                }}
              />
            </Suspense>
          )}
        />

        <PrivateRoute
          component={Dashboard}
          firebase={firebase}
          isSignedIn={this.state.user}
          user={this.state.user}
        />
        <AdminRoute
          component={Admin}
          isAdmin={this.state.admin}
          user={this.state.user}
          journals={this.state.journals}
          instagram={this.state.instagram}
          language={this.state.language}
        />
        <Route exact path="/">
          <Redirect to="/us/home" />
        </Route>
      </Fragment>
    );
    return (
      <Router>
        <ScrollToTop setLocation={this.setLocation.bind(this)}>
          <Fragment>
            <Language.Provider value={this.state.language}>
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
                  setLanguage={this.setLanguage.bind(this)}
                  language={this.state.language}
                  translations={this.state.translations}
                />
              </Suspense>
              <Switch>{innerRoutes}</Switch>
            </Language.Provider>
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
          <Footer
            instagram={this.state.instagram}
            translations={this.state.translations["footer"]}
            language={this.state.language}
          />
        </Suspense>
      </Router>
    );
  }
}
export default App;
