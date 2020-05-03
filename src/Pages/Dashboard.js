import React, { Fragment, Suspense, Component } from "react";
import { CloudinaryContext } from "cloudinary-react";
import IntroImage from "../components/IntroImage";
const Img = React.lazy(() => import("react-cloudinary-lazy-image"));
const LazyCloudinaryImg = ({ publicId }) => {
  return (
    <Img
      cloudName={"sunshinephoto"}
      imageName={publicId}
      fluid={{
        maxWidth: 300,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "initial",
        height: "initial",
      }}
      urlParams={"c_scale"}
      // urlParams={"g_face,c_lfill"}
    />
  );
};

export default class Dashboard extends Component {
  state = {
    pictures: null,
    selected_pictures: [],
  };

  componentDidMount() {
    this.getUser(this.props.user);
  }
  // firebase("database").then(({ database }) => {
  //   database
  //     .ref("/journals/")
  //     .once("value")
  //     .then((snapshot) => {
  //       let journalSnap = snapshot.val();
  //       if (journalSnap) {
  //         // SET JOURNALS
  //         this.setState({
  //           journals: journalSnap,
  //         });
  //       }
  //     });
  // });
  getUserPhotos = async (picture_set, picturesRef) => {
    // let firestore = await this.props.firebase("firestore");
    // var picturesRef =  firestore.collection("pictures");
    return new Promise((resolve, reject) => {
      picturesRef
        .doc(picture_set)
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            console.log("No User photos.");
          }
        })
        .catch((err) => {
          reject();
          console.log(err);
        });
    });
  };

  getUser = (user) => {
    this.props.firebase("firestore").then(({ firestore }) => {
      const db = firestore;
      var UserRef = db.collection("users");
      var picturesRef = db.collection("pictures");
      UserRef.doc(user.email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let { picture_sets, selected_pictures } = doc.data();
            this.getUserPhotos(picture_sets[0], picturesRef)
              .then((res) => {
                if (res) {
                  let picUrls = res.pictures.map((p) => {
                    return {
                      src: p,
                      // src: `https://res.cloudinary.com/sunshinephoto/image/upload/${p}`
                    };
                  });

                  this.setState({
                    pictures: picUrls,
                    selected_pictures,
                  });
                }
              })
              .catch((err) => console.log(err));
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    });
  };

  updateUserInfo(user) {
    this.props.firebase("firestore").then(({ firestore }) => {
      let db = firestore;
      var UserRef = db.collection("users");
      UserRef.doc(user.email)
        .set(
          {
            selected_pictures: this.state.selected_pictures,
          },
          { merge: true }
        )
        .then(() => {
          this.getUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  toggleImageSelect = (url) => {
    // console.log("url", url);
    if (
      this.state.selected_pictures &&
      this.state.selected_pictures.includes(url)
    ) {
      let newPics = this.state.selected_pictures.filter((p) => p !== url);
      this.setState({
        selected_pictures: newPics,
      });
    } else {
      if (
        this.state.selected_pictures &&
        this.state.selected_pictures.length > 0
      ) {
        this.setState({
          selected_pictures: [...this.state.selected_pictures, url],
        });
      } else {
        this.setState({
          selected_pictures: [url],
        });
      }
    }
  };
  render() {
    const { user } = this.props;
    const { displayName, email } = user;

    return (
      <Fragment>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <IntroImage text={["Your Dashboard"]} />
        </Suspense>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <div>
            <h1>{`Hello ${displayName || email}!`}</h1>
          </div>
        </Suspense>
        {this.state.pictures ? (
          <Fragment>
            <ImageSelectGallery
              pictures={this.state.pictures}
              // selected_pictures={this.state.selected_pictures}
              // toggleSelect={this.toggleImageSelect.bind(this)}
            />
            {/* <div>
                <button
                  style={{
                    display: "block",
                    margin: "auto"
                  }}
                  onClick={() => {
                    // TODO : fix selected pics
                    console.log("slectged:", this.state.selected_pictures);
                    return this.updateUserInfo(user);
                  }}
                >
                  Develop Selected Pictures!
                </button>
              </div> */}
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

const ImageSelectGallery = ({
  pictures,
  toggleSelect,
  selected_pictures = [],
}) => {
  let content = pictures.map((pic, i) => {
    return (
      <Suspense
        fallback={<div className="lds-roller" style={{ width: "300px" }}></div>}
        key={i}
      >
        <div
          style={{
            margin: "5px",
            border: "2px solid transparent",
          }}
        >
          <LazyCloudinaryImg publicId={pic.src.src} />
        </div>
      </Suspense>
    );
  });
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div
        style={{
          display: "flex",
        }}
      >
        {content}
      </div>
    </CloudinaryContext>
  );
};
