import React, { Fragment, Suspense, Component } from "react";
import firebase from "firebase/app";

import IntroImage from "../components/IntroImage";
const dashboardPageBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";
export default class Dashboard extends Component {
  state = {
    limit: 2
  };

  componentDidMount() {
    this.getUser(this.props.user);
  }

  getUserPhotos = picture_set => {
    const db = firebase.firestore();
    var picturesRef = db.collection("pictures");

    return new Promise((resolve, reject) => {
      picturesRef
        .doc(picture_set)
        .get()
        .then(doc => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            console.log("No User photos.");
          }
        })
        .catch(err => {
          reject();
          console.log(err);
        });
    });
  };

  getUser = user => {
    const db = firebase.firestore();
    var UserRef = db.collection("users");
    UserRef.doc(user.email)
      .get()
      .then(doc => {
        if (doc.exists) {
          let { picture_sets } = doc.data();
          this.getUserPhotos(picture_sets[0])
            .then(res => {
              if (res) {
                this.setState({
                  pictures: res.pictures
                });
              }
            })
            .catch(err => console.log(err));
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  render() {
    const { user } = this.props;
    const { displayName, email } = user;
    return (
      <Fragment>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <IntroImage
            imageSrc={dashboardPageBg}
            text={["Your Dashboard"]}
            height="35vh"
          />
        </Suspense>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <div>
            <h1>{`Hello ${displayName || email}!`}</h1>
          </div>
        </Suspense>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          {this.state.pictures ? (
            <div>
              <h1>Pictures</h1>
              {this.state.pictures.map((pic, i) => {
                return <img key={i} src={pic} alt="" />;
              })}
            </div>
          ) : null}
        </Suspense>
      </Fragment>
    );
  }
}
