import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import ScrollToTop from "./ScrollToTop";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Services from "./Pages/Services";
import Admin from "./Pages/Admin";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/ProtectedRoute";
import "./styles/style.css";
require("../node_modules/firebase/firebase-auth");

const firebaseConfig = {
  apiKey: "AIzaSyDU7pnAHmVuuf2nKxa5HpBBI4GaCobCQRw",
  authDomain: "momblog-15d1c.firebaseapp.com",
  databaseURL: "https://momblog-15d1c.firebaseio.com",
  projectId: "momblog-15d1c",
  storageBucket: "",
  messagingSenderId: "754776938435",
  appId: "1:754776938435:web:43cadca033fb5094ec0f76",
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      admin: false,
      journals: [],
      services: [],
    };
  }

  componentDidMount() {
    this.getServices();
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          this.setAdmin(!!idTokenResult.claims.admin);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
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
  }

  getJournals() {
    firebase
      .database()
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
  }
  getServices() {
    firebase
      .database()
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
        <ScrollToTop>
          <Fragment>
            <Navbar
              isAdmin={this.state.admin}
              isSignedIn={this.state.user}
              firebase={firebase}
              setUser={this.setUser.bind(this)}
              getJournals={this.getJournals.bind(this)}
              // getServices={this.getServices.bind(this)}
              journals={this.state.journals}
              services={this.state.services}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home {...props} journals={this.state.journals} />
                )}
              />
              <Route
                path="/journal/:name"
                render={(props) => (
                  <Journal {...props} journals={this.state.journals} />
                )}
              />
              <Route
                path="/services/:service"
                render={(props) => (
                  <Services {...props} services={this.state.services} />
                )}
              />
              <Route path="/About" component={About} />
              <AdminRoute
                path="/admin"
                component={Admin}
                firebase={firebase}
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
                  <Home {...props} journals={this.state.journals} />
                )}
              />
            </Switch>
          </Fragment>
        </ScrollToTop>
        <Footer journals={this.state.journals} />
      </Router>
    );
  }
}
export default App;
