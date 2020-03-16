import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import ScrollToTop from "./ScrollToTop";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Journal from "./Pages/Journal";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Gallery from "./Pages/Gallery";
import Admin from "./Pages/Admin";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
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
  appId: "1:754776938435:web:43cadca033fb5094ec0f76"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
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
        .then(result => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          const { user } = result;
          this.setUser(user);
        })
        .catch(function(error) {
          console.log("login erorr", error);
        });
    }
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
              isSignedIn={this.state.user}
              firebase={firebase}
              setUser={this.setUser.bind(this)}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route path="/contact" component={Contact} /> */}
              {/* <Route path="/about" component={About} /> */}
              <Route path="/journal" component={Journal} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/Pricing" component={Pricing} />
              <Route path="/Admin" component={Admin} />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                firebase={firebase}
                isSignedIn={this.state.user}
                user={this.state.user}
              />
              <Route component={Home} />
            </Switch>
          </Fragment>
        </ScrollToTop>
        <Footer />
      </Router>
    );
  }
}
export default App;
