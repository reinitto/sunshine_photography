import React, { Fragment, Suspense, Component } from "react";
import firebase from "firebase/app";
// import ImgGallery from "../components/portfolio/ImageGalleryWithoutLighbox";
import { CloudinaryContext } from "cloudinary-react";
// import Img from "react-cloudinary-lazy-image";
import IntroImage from "../components/IntroImage";
const Img = React.lazy(() => import("react-cloudinary-lazy-image"));
const LazyCloudinaryImg = ({ publicId }) => {
  // console.log("LazyCloudinaryImg publicId", publicId);
  return (
    <Img
      cloudName={"sunshinephoto"}
      imageName={publicId}
      fluid={{
        maxWidth: 300
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "initial",
        height: "initial"
      }}
      urlParams={"c_scale"}
      // urlParams={"g_face,c_lfill"}
    />
  );
};
const dashboardPageBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";
export default class Dashboard extends Component {
  state = {
    pictures: null,
    selected_pictures: []
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
          let { picture_sets, selected_pictures } = doc.data();
          this.getUserPhotos(picture_sets[0])
            .then(res => {
              if (res) {
                let picUrls = res.pictures.map(p => {
                  return {
                    src: p
                    // src: `https://res.cloudinary.com/sunshinephoto/image/upload/${p}`
                  };
                });
                this.setState({
                  pictures: picUrls,
                  selected_pictures
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

  updateUserInfo(user) {
    const db = firebase.firestore();
    var UserRef = db.collection("users");
    UserRef.doc(user.email)
      .set(
        {
          selected_pictures: this.state.selected_pictures
        },
        { merge: true }
      )
      .then(() => {
        this.getUser(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleImageSelect = url => {
    // console.log("url", url);
    if (
      this.state.selected_pictures &&
      this.state.selected_pictures.includes(url)
    ) {
      let newPics = this.state.selected_pictures.filter(p => p !== url);
      this.setState({
        selected_pictures: newPics
      });
    } else {
      if (
        this.state.selected_pictures &&
        this.state.selected_pictures.length > 0
      ) {
        this.setState({
          selected_pictures: [...this.state.selected_pictures, url]
        });
      } else {
        this.setState({
          selected_pictures: [url]
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
          <IntroImage imageSrc={dashboardPageBg} text={["Your Dashboard"]} />
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

// const LazyImg = ({ imageSrc }) => {
//   return (
//     <Image publicId={imageSrc} className="contain-image" width="300">
//       <Transformation quality="auto" fetchFormat="auto" />
//     </Image>
//   );
// };

const ImageSelectGallery = ({
  pictures,
  toggleSelect,
  selected_pictures = []
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
            border: "2px solid transparent"
            // border: `2px solid ${
            //   selected_pictures.includes(pic.src.src) ? "green" : "transparent"
            // }`
          }}
          // onClick={() => {
          //   return toggleSelect(pic.src.src);
          // }}
        >
          <LazyCloudinaryImg publicId={pic.src.src} />
          {/* {selected_pictures.includes(pic.src.src) ? (
            <div
              style={{
                backgroundColor: "green",
                textAlign: "center"
              }}
            >
              Selected
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>Click to select</div>
          )} */}
        </div>
      </Suspense>
    );
  });
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div
        style={{
          display: "flex"
        }}
      >
        {content}
      </div>
    </CloudinaryContext>
  );
};
