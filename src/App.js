import React, { Component, Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
// import "./styles/style.css";
// import firebase from "firebase/app";
// import "firebase/database";
// import "firebase/firestore";
// import "firebase/functions";
import firebase from "./Firebase";
// import Home from "./Pages/Home";
// import Journal from "./Pages/Journal";
// import Services from "./Pages/Services";
// import Admin from "./Pages/Admin";
// import About from "./Pages/About";
// import Dashboard from "./Pages/Dashboard";
// import Footer from "./components/layout/Footer";
// import { MyNavbar as Navbar } from "./components/layout/Navbar";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/ProtectedRoute";
// const ScrollToTop = lazy(() => import("./ScrollToTop"));
const Home = lazy(() => import("./Pages/Home"));
const Journal = lazy(() => import("./Pages/Journal"));
const Services = lazy(() => import("./Pages/Services"));
const Admin = lazy(() => import("./Pages/Admin"));
const About = lazy(() => import("./Pages/About"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Navbar = lazy(() => import("./components/layout/Navbar"));
// const AdminRoute = lazy(() => import("./components/AdminRoute"));
// const PrivateRoute = lazy(() => import("./components/ProtectedRoute"));

// const firebase = lazy(() => import("./Firebase"));

// require("../node_modules/firebase/firebase-auth");

// const firebaseConfig = {
//   apiKey: "AIzaSyDU7pnAHmVuuf2nKxa5HpBBI4GaCobCQRw",
//   authDomain: "momblog-15d1c.firebaseapp.com",
//   databaseURL: "https://momblog-15d1c.firebaseio.com",
//   projectId: "momblog-15d1c",
//   storageBucket: "",
//   messagingSenderId: "754776938435",
//   appId: "1:754776938435:web:43cadca033fb5094ec0f76",
// };
// firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      admin: false,
      journals: [],
      services: [],
      currentRoute: "/home",
    };
  }

  async componentDidMount() {
    await this.getServices();
    await this.getJournals();

    firebase().then(({ auth }) => {
      auth.onAuthStateChanged((user) => {
        this.setState({ user: user });
        auth.currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            this.setAdmin(!!idTokenResult.claims.admin);
          })
          .catch((error) => {
            console.log(error);
          });
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
  }

  setLocation = (location) => {
    this.setState({
      currentRoute: location,
    });
  };

  getJournals() {
    firebase().then(({ database }) => {
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
    firebase().then(({ database }) => {
      database
        .ref("/services/")
        .once("value")
        .then((snapshot) => {
          let servicesSnap = snapshot.val();
          if (servicesSnap) {
            // SET SERVICES
            // let arr = [];
            // Object.keys(servicesSnap).forEach((key) => {
            //   arr.push({ ...servicesSnap[key], key });
            // });
            this.setState({
              services: servicesSnap,
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
                // getJournals={this.getJournals.bind(this)}
                // getServices={this.getServices.bind(this)}
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
                        <div style={{ height: "100vh", width: "100%" }}>
                          Loading
                        </div>
                      }
                    >
                      <Home
                        {...props}
                        journals={this.state.journals}
                        services={this.state.services}
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
                      <div style={{ height: "100vh", width: "100%" }}>
                        Loading
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
                      <div style={{ height: "100vh", width: "100%" }}>
                        Loading
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
                      <div style={{ height: "100vh", width: "100%" }}>
                        Loading
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
                      <div style={{ height: "100vh", width: "100%" }}>
                        Loading
                      </div>
                    }
                  >
                    <Home
                      {...props}
                      journals={this.state.journals}
                      services={this.state.services}
                    />
                  </Suspense>
                )}
              />
              {/* <Redirect
                  to={{
                    pathname: "/home",
                  }}
                /> */}
            </Switch>
          </Fragment>
        </ScrollToTop>
        <Suspense fallback={<div></div>}>
          <Footer journals={this.state.journals} />
        </Suspense>
      </Router>
    );
  }
}
export default App;
