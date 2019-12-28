import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import firebase from "./Firebase";
// import "firebase/auth";

// import {
//   FirebaseAuthProvider,
//   FirebaseAuthConsumer
// } from "@react-firebase/auth";
// import firebaseConfig from "./firebase-creds";
// import * as firebaseui from "firebaseui";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Journal from "./Pages/Journal";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Gallery from "./Pages/Gallery";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./ScrollToTop";
import PrivateRoute from "./components/ProtectedRoute";
import "./styles/style.css";
require("../node_modules/firebase/firebase-auth");
// require("../node_modules/firebase/firebase-firestore");

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
  state = {
    user: null
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    // this.setUser(firebase.auth().currentUser);
  }

  setUser(user) {
    const db = firebase.firestore();

    // const userRef = db.collection(“users”).add({
    //   fullname: this.state.fullname,
    //   email: this.state.email
    // });
    console.log('db.collection("users")', db.collection("users"));
    db.collection("users")
      .get()
      // .document(`${user.email}`)
      .then(querySnapshot => {
        console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      })
      .catch(err => console.log("error:", err));
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
              <Route path="/contact" component={Contact} />
              <Route path="/about" component={About} />
              <Route path="/journal" component={Journal} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/Pricing" component={Pricing} />
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
