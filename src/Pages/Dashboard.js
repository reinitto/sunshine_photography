import React, { Fragment, Suspense, Component } from "react";
// import {
//   FirebaseDatabaseProvider,
//   FirebaseDatabaseNode
// } from "@react-firebase/database";
// import "firebase/firestore";
import IntroImage from "../components/IntroImage";
// var db = firebase.firestore();
const dashboardPageBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";
export default class Dashboard extends Component {
  state = {
    limit: 2
  };
  render() {
    const { user, firebase } = this.props;
    const { displayName, email, uid } = user;
    console.log("user", user);
    console.log("email", email);
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .document(`${email}`)
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log(`${doc.id} => ${doc.data()}`);
    //     });
    //   });

    return (
      <Fragment>
        {/* <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}> */}
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <IntroImage
            imageSrc={dashboardPageBg}
            text={["Your Dashboard"]}
            height="35vh"
          />
        </Suspense>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <div>
            <h1>{`Hello ${displayName}!`}</h1>
            {/* <FirebaseDatabaseNode
                path={`users/${email}`}
                limitToFirst={this.state.limit}
                // orderByKey
                orderByValue={"created_on"}
              >
                {d => {
                  return (
                    <React.Fragment>
                      <pre>Path {d.path}</pre>
                      <pre style={{ height: 300, overflow: "auto" }}>
                        Value {d.value}
                      </pre>
                      <button
                        onClick={() => {
                          this.setState(state => ({ limit: state.limit + 2 }));
                        }}
                      >
                        Load more
                      </button>
                    </React.Fragment>
                  );
                }}
              </FirebaseDatabaseNode> */}
          </div>
        </Suspense>
        {/* </FirebaseDatabaseProvider> */}
      </Fragment>
    );
  }
}
