import React, { useState } from "react";
import FileDrop from "react-file-drop";
const shortid = require("shortid");

let createServiceUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/services-services";
let uploadImgUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/uploadImageToCloudinary-uploadImageToCloudinary";
let ImageWithThumbnail = ({ loadFile, id, srcLink, stateUpdater }) => {
  let handleDrop = files => {
    loadFile(files[0], id, stateUpdater);
  };
  let isLink = srcLink.match(/^images/);
  return (
    <div
      className="cover-image"
      id={id}
      style={{
        minHeight: "200px",
        minWidth: "200px",
        width: "100%",
        height: "100%",
        backgroundImage: isLink
          ? `url(https://res.cloudinary.com/sunshinephoto/image/upload/c_thumb,w_500,g_face/${srcLink})`
          : srcLink
      }}
    >
      <FileDrop onDrop={handleDrop}>
        Session background image.Drop an image here!
      </FileDrop>
    </div>
  );
};

let loadFile = (file, id, stateUpdater) => {
  let reader = new FileReader();
  reader.onload = () => {
    var output = document.querySelector(`#${id}`);
    output.style.backgroundImage = `url(${reader.result})`;
    stateUpdater(id, reader.result);
  };
  reader.readAsDataURL(file);
};
export const ServicesView = ({ user }) => {
  let [serviceName, setServiceName] = useState("");
  let [serviceParagraph, setServiceParagraph] = useState("");
  let [details, setDetails] = useState([""]);
  let [sessions, setSessions] = useState([]);
  let [galleryImages, setGalleryImages] = useState([]);
  let updateServiceName = e => {
    setServiceName(e.target.value);
  };
  let updateServiceParagraph = e => {
    setServiceParagraph(e.target.value);
  };
  let addDetail = () => {
    setDetails([...details, ""]);
  };
  let updateServiceDetail = e => {
    let prevDetails = [...details];
    let id = e.target.id.match(/(\d+)/g)[0];
    prevDetails[id] = e.target.value;
    setDetails(prevDetails);
  };

  let addSession = () => {
    if (sessions.length > 0) {
      setSessions([
        ...sessions,
        {
          id: shortid.generate(),
          name: "",
          price: 0,
          detailText: "",
          image: ""
        }
      ]);
    } else {
      setSessions([
        {
          id: shortid.generate(),
          name: "",
          price: "",
          detailText: "",
          image: ""
        }
      ]);
    }
  };

  let editSessionImage = (sessionId, src) => {
    let newId = sessionId.split("-");
    let theId = newId[newId.length - 1];
    console.log(newId, theId);
    let newSession = [...sessions.filter(s => s.id === theId)][0];
    newSession.image = src;
    let newSessions = sessions.map(session => {
      if (session.id === theId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };

  let editSession = e => {
    let newSession = [
      ...sessions.filter(s => s.id === e.target.parentNode.parentNode.id)
    ][0];
    newSession[e.target.name] = e.target.value;
    let newSessions = sessions.map(session => {
      if (session.id === e.target.id) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };

  let addGalleryImage = () => {
    if (sessions.length > 0) {
      setGalleryImages([
        ...galleryImages,
        {
          id: shortid.generate(),
          image: "",
          text: ""
        }
      ]);
    } else {
      setGalleryImages([
        {
          id: shortid.generate(),
          image: "",
          text: ""
        }
      ]);
    }
  };

  let updateGaleryImageText = e => {
    let newGalleryImage = [
      ...galleryImages.filter(s => s.id === e.target.parentNode.id)
    ][0];
    newGalleryImage[e.target.name] = e.target.value;
    let newGalleryImages = galleryImages.map(galleryImage => {
      if (galleryImage.id === e.target.parentNode.id) {
        return newGalleryImage;
      } else {
        return galleryImage;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let editGalleryImageImage = (id, data) => {
    let newId = id.split("-");
    let theId = newId[newId.length - 1];
    let newGalleryImage = [...galleryImages.filter(s => s.id === theId)][0];
    newGalleryImage.image = data;
    let newGalleryImages = galleryImages.map(image => {
      if (image.id === theId) {
        return newGalleryImage;
      } else {
        return image;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let createService = async e => {
    e.preventDefault();
    let idToken = await user.getIdToken();
    // SESSIONS AND IMAGE GALLERY UPLOAD REQUIRES IMAGE UPLOAD TO CLOUDINARY FIRST

    // UPLOAD SESSIONS IMAGES
    let imageRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: {}
    };
    let newSessions = [];
    for await (let session of sessions) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: session.image,
        path: `services/${serviceName}/sessionImages`
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newSession = { ...session, image: public_id };
      newSessions.push(newSession);
    }
    console.log("newSessions", newSessions);
    // UPLOAD IMAGE GALLERY
    let newGalleryImages = [];
    for await (let galleryImage of galleryImages) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: galleryImage.image,
        path: `services/${serviceName}/galleryImages`
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newGalleryImage = { ...galleryImage, image: public_id };
      newGalleryImages.push(newGalleryImage);
    }
    console.log("newGalleryImages", newGalleryImages);

    const serviceRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        name: serviceName,
        paragraphText: serviceParagraph,
        details,
        sessions: newSessions,
        imageGallery: newGalleryImages
      })
    };
    let result = await fetch(createServiceUrl, serviceRequestOptions);
    console.log("service", await result.json());
  };
  return (
    <div className="d-flex flex-column w-50 m-auto">
      <div className="text-center d-flex flex-column">
        <input
          type="text"
          placeholder="service name"
          value={serviceName}
          onChange={updateServiceName}
        />
        <textarea
          type="text"
          placeholder="service text"
          value={serviceParagraph}
          onChange={updateServiceParagraph}
        />
      </div>
      <div className="text-center d-flex flex-column">
        {details.map((detail, i) => {
          return (
            <input
              type="text"
              placeholder="Service detail."
              id={`service-detail-${i}`}
              key={`service-detail-${i}`}
              value={detail}
              onChange={updateServiceDetail}
            />
          );
        })}
        <button onClick={addDetail}>Add detail</button>
      </div>

      <div className="text-center d-flex flex-column">
        {sessions.map(session => {
          return (
            <div id={session.id} key={session.id} className="d-flex">
              <div
                className="text-center d-flex flex-column "
                style={{
                  flexGrow: 1
                }}
              >
                <input
                  type="text"
                  placeholder="session name"
                  name="name"
                  value={session.name}
                  onChange={editSession}
                />
                <input
                  type="text"
                  placeholder="session price"
                  name="price"
                  value={session.price}
                  onChange={editSession}
                />
                <textarea
                  rows={5}
                  type="text"
                  placeholder="session detailText"
                  name="detailText"
                  value={session.detailText}
                  onChange={editSession}
                />
              </div>
              <div>
                <ImageWithThumbnail
                  {...{
                    loadFile,
                    id: `service-session-image-${session.id}`,
                    srcLink: session.image,
                    stateUpdater: editSessionImage
                  }}
                />
              </div>
            </div>
          );
        })}
        <button onClick={addSession}>Add session</button>
      </div>
      <div>
        {/* gallery images */}
        {galleryImages.map(image => {
          return (
            <div key={image.id} id={image.id} className="d-flex flex-column">
              <ImageWithThumbnail
                {...{
                  loadFile,
                  id: `service-galery-image-${image.id}`,
                  srcLink: image.image,
                  stateUpdater: editGalleryImageImage
                }}
              />
              <input
                type="text"
                name="text"
                placeholder="a short comment if you want"
                value={image.text}
                onChange={updateGaleryImageText}
              />
            </div>
          );
        })}
        <button onClick={addGalleryImage}>Add Image</button>
      </div>
      <button onClick={createService}>Create Service</button>
    </div>
  );
};

export default ServicesView;
