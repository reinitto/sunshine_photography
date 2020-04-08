import React, { useState, Fragment } from "react";
import * as firebase from "firebase/app";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { FileDrop } from "react-file-drop";
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
);
let createServiceUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/services-services";
let updateServiceUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/services-services";
let uploadImgUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/uploadImageToCloudinary-uploadImageToCloudinary";
let deleteImgUrl =
  "http://localhost:5001/momblog-15d1c/us-central1/deleteImageFromCloudinary-deleteImageFromCloudinary";

let arrayFromObject = (obj) => {
  let arr = [];
  if (Object.keys(obj).length === 0) {
    return arr;
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      let val = Object.assign({}, obj[key]);
      arr.push(val);
    } else {
      arr.push(obj[key]);
    }
  });
  return arr;
};

let ImageWithThumbnail = ({ loadFile, stateId, id, srcLink, stateUpdater }) => {
  let handleDrop = (files) => {
    loadFile(files[0], stateId, id, stateUpdater);
  };
  let isLink = srcLink ? srcLink.match(/^images/) : null;
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
          : srcLink,
      }}
    >
      <FileDrop onDrop={handleDrop}>
        Session background image.Drop an image here!
      </FileDrop>
    </div>
  );
};

let loadFile = (file, stateId, id, stateUpdater) => {
  let reader = new FileReader();
  reader.onload = () => {
    var output = document.querySelector(`#${id}`);
    output.style.backgroundImage = `url(${reader.result})`;
    stateUpdater({ stateId, data: reader.result });
  };
  reader.readAsDataURL(file);
};
export const ServicesView = ({ user }) => {
  let [key, setKey] = useState("");
  let [serviceName, setServiceName] = useState("");
  let [serviceParagraph, setServiceParagraph] = useState("");
  let [details, setDetails] = useState([""]);
  let [sessions, setSessions] = useState([]);
  let [galleryImages, setGalleryImages] = useState([]);
  let [allServices, setAllServices] = useState([]);
  let [folder_name, setFolder_name] = useState("");

  let setNewService = async () => {
    setKey("");
    setServiceName("");
    setServiceParagraph("");
    setDetails([""]);
    setGalleryImages([]);
    setSessions([]);
    setFolder_name("");
  };

  let setServiceToEdit = async (service) => {
    let {
      name,
      paragraphText,
      key,
      details,
      imageGallery,
      sessions,
      folder_name,
    } = service;
    let serviceDetails = details
      ? arrayFromObject(details).map((detail) => detail.text)
      : [];
    let serviceimageGallery = imageGallery ? arrayFromObject(imageGallery) : [];
    sessions = sessions ? arrayFromObject(sessions) : [];
    let sessionObjects = [];
    if (sessions) {
      for await (let key of sessions) {
        let session = await getSession(key);
        sessionObjects.push({ ...session, key });
      }
    }
    setKey(key);
    setServiceName(name);
    setServiceParagraph(paragraphText);
    setDetails(serviceDetails);
    setGalleryImages(serviceimageGallery);
    setSessions(sessionObjects);
    setFolder_name(folder_name);
  };

  let getAllServices = () => {
    firebase
      .database()
      .ref("/services/")
      .once("value")
      .then((snapshot) => {
        let journalSnap = snapshot.val();
        if (journalSnap) {
          let services = [];
          Object.keys(journalSnap).map((key) =>
            services.push({ ...journalSnap[key], key })
          );
          console.log("services", services);
          // SET JOURNALS
          setAllServices(services);
        }
      });
  };

  let getSession = async (sessionKey) => {
    let snap = await firebase
      .database()
      .ref(`/sessions/${sessionKey}`)
      .once("value");
    return snap.val();
  };

  let updateServiceName = (e) => {
    setServiceName(e.target.value);
  };
  let updateServiceParagraph = (e) => {
    setServiceParagraph(e.target.value);
  };
  let addDetail = () => {
    setDetails([...details, ""]);
  };
  let updateServiceDetail = (e) => {
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
          image: "",
        },
      ]);
    } else {
      setSessions([
        {
          id: shortid.generate(),
          name: "",
          price: "",
          detailText: "",
          image: "",
        },
      ]);
    }
  };

  let editSessionImage = ({ stateId, data }) => {
    let newSession = [...sessions.filter((s) => s.id === stateId)][0];
    // IF CURRENT IMAGE IS A LINK,MARK IT FOR DELETION
    let isUrl = newSession.image.match(/(images\/\.*)/);
    if (isUrl) {
      // ADD OLD TO DELETE
      newSession.oldImage = newSession.image;
    }
    newSession.image = data;
    let newSessions = sessions.map((session) => {
      if (session.id === stateId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };

  let editSession = (e) => {
    let newSession = [
      ...sessions.filter((s) => s.id === e.target.parentNode.parentNode.id),
    ][0];
    newSession[e.target.name] = e.target.value;
    let newSessions = sessions.map((session) => {
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
          text: "",
        },
      ]);
    } else {
      setGalleryImages([
        {
          id: shortid.generate(),
          image: "",
          text: "",
        },
      ]);
    }
  };

  let updateGaleryImageText = (e) => {
    let newGalleryImage = [
      ...galleryImages.filter((s) => s.id === e.target.parentNode.id),
    ][0];
    newGalleryImage[e.target.name] = e.target.value;
    let newGalleryImages = galleryImages.map((galleryImage) => {
      if (galleryImage.id === e.target.parentNode.id) {
        return newGalleryImage;
      } else {
        return galleryImage;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let editGalleryImageImage = ({ stateId, data }) => {
    let newGalleryImage = [...galleryImages.filter((s) => s.id === stateId)][0];
    let isUrl = newGalleryImage.image.match(/(images\/.*)/);
    if (isUrl) {
      // ADD OLD TO DELETE
      newGalleryImage.oldImage = newGalleryImage.image;
    }
    newGalleryImage.image = data;
    let newGalleryImages = galleryImages.map((image) => {
      if (image.id === stateId) {
        return newGalleryImage;
      } else {
        return image;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let toggleDeleteSession = (sessionId) => {
    let newSession = [...sessions.filter((s) => s.id === sessionId)][0];
    newSession.delete && newSession.delete === true
      ? (newSession.delete = false)
      : (newSession.delete = true);
    let newSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        return newSession;
      } else {
        return session;
      }
    });
    setSessions(newSessions);
  };
  let toggleDeleteGalleryImage = (imageId) => {
    let newGalleryImage = [...galleryImages.filter((s) => s.id === imageId)][0];
    newGalleryImage.delete && newGalleryImage.delete === true
      ? (newGalleryImage.delete = false)
      : (newGalleryImage.delete = true);
    if (newGalleryImage.image === "") {
      newGalleryImage.image = newGalleryImage.oldImage;
      newGalleryImage.oldImage = "";
    } else {
      newGalleryImage.oldImage = newGalleryImage.image;
      newGalleryImage.image = "";
    }
    let newGalleryImages = galleryImages.map((image) => {
      if (image.id === imageId) {
        return newGalleryImage;
      } else {
        return image;
      }
    });
    setGalleryImages(newGalleryImages);
  };

  let createService = async (e) => {
    e.preventDefault();
    let idToken = await user.getIdToken();
    // UPLOAD SESSIONS IMAGES
    let folder_name = shortid.generate();
    let imageRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    let newSessions = [];
    for await (let session of sessions) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: session.image,
        path: `services/${folder_name}/sessionImages`,
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newSession = { ...session, image: public_id };
      newSessions.push(newSession);
    }
    // UPLOAD IMAGE GALLERY
    let newGalleryImages = [];
    for await (let galleryImage of galleryImages) {
      imageRequestOptions.body = JSON.stringify({
        imageSrc: galleryImage.image,
        path: `services/${folder_name}/galleryImages`,
      });
      let res = await fetch(uploadImgUrl, imageRequestOptions);
      let { public_id } = await res.json();
      let newGalleryImage = { ...galleryImage, image: public_id };
      newGalleryImages.push(newGalleryImage);
    }

    const serviceRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        folder_name,
        name: serviceName,
        paragraphText: serviceParagraph,
        details,
        sessions: newSessions,
        imageGallery: newGalleryImages,
      }),
    };
    let data = await fetch(createServiceUrl, serviceRequestOptions);
    let result = await data.json();
    console.log("finished");
    console.log("service", result);
  };
  let updateService = async (e) => {
    e.preventDefault();
    let idToken = await user.getIdToken();
    // UPLOAD SESSIONS IMAGES
    let imageRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    let newSessions = [];
    for await (let session of sessions) {
      // UPLOAD NEW IMAGE IF ITS NOT AN URL
      let isUrl = session.image.match(/sessionImages/g);
      if (!session.delete && !isUrl) {
        imageRequestOptions.body = JSON.stringify({
          imageSrc: session.image,
          path: `services/${folder_name}/sessionImages`,
        });
        let res = await fetch(uploadImgUrl, imageRequestOptions);
        let { public_id } = await res.json();
        let newSession = { ...session, image: public_id };
        newSessions.push(newSession);
      } else {
        newSessions.push(session);
      }
    }
    // DELETE OLD SESSIONS IMAGE
    let imageDeleteRequestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: {},
    };
    for await (let session of newSessions) {
      if (session.oldImage) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: session.oldImage,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        session.oldImage = "";
      } else if (session.delete && session.image.match(/sessionImages/g)) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: session.image,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        session.image = "";
      }
    }

    // UPDATE IMAGE GALLERY
    let newGalleryImages = [];
    for await (let galleryImage of galleryImages) {
      // UPLOAD NEW IMAGE IF ITS NOT AN URL
      let isUrl = galleryImage.image.match(/galleryImages/g);
      if (!isUrl && galleryImage.image !== "") {
        imageRequestOptions.body = JSON.stringify({
          imageSrc: galleryImage.image,
          path: `services/${folder_name}/galleryImages`,
        });
        let res = await fetch(uploadImgUrl, imageRequestOptions);
        let { public_id } = await res.json();
        let newGalleryImage = { ...galleryImage, image: public_id };
        newGalleryImages.push(newGalleryImage);
      } else {
        newGalleryImages.push(galleryImage);
      }
    }

    // DELETE OLD IMAGE FROM GALLERY
    for await (let galleryImage of newGalleryImages) {
      if (galleryImage.oldImage) {
        imageDeleteRequestOptions.body = JSON.stringify({
          public_id: galleryImage.oldImage,
        });
        await fetch(deleteImgUrl, imageDeleteRequestOptions);
        galleryImage.oldImage = "";
      }
    }

    const serviceRequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        key,
        name: serviceName,
        paragraphText: serviceParagraph,
        details,
        sessions: newSessions,
        folder_name,
        imageGallery: newGalleryImages,
      }),
    };
    let data = await fetch(updateServiceUrl, serviceRequestOptions);
    let result = await data.json();
    console.log("update service", result);
  };
  return (
    <Fragment>
      <CloudinaryContext cloudName="sunshinephoto">
        <div className="d-flex">
          <div className="d-flex flex-column w-25 mx-auto">
            {allServices.map((service) => {
              let image = service.imageGallery
                ? service.imageGallery[Object.keys(service.imageGallery)[0]]
                    .image
                : null;
              return (
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  key={service.key}
                  onClick={() => {
                    // SET EXISTING JOURNAL TO EDIT
                    setServiceToEdit(service);
                  }}
                >
                  <h4 className="text-center">{service.name}</h4>
                  <Image publicId={image} className="cover-image" secure="true">
                    <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                </div>
              );
            })}
          </div>

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
              {sessions.map((session) => {
                return (
                  <div id={session.id} key={session.id} className="d-flex">
                    <div
                      className="text-center d-flex flex-column "
                      style={{
                        flexGrow: 1,
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
                          stateId: session.id,
                          id: `service-session-image-${session.id}`,
                          srcLink: session.image,
                          stateUpdater: editSessionImage,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        toggleDeleteSession(session.id);
                      }}
                    >
                      Delete Session
                    </button>
                  </div>
                );
              })}
              <button onClick={addSession}>Add session</button>
            </div>
            <div className="d-flex flex-column">
              {/* gallery images */}
              {galleryImages.map((image) => {
                return (
                  <div
                    key={image.id}
                    id={image.id}
                    className="d-flex flex-column"
                  >
                    <ImageWithThumbnail
                      {...{
                        loadFile,
                        stateId: image.id,
                        id: `service-galery-image-${image.id}`,
                        srcLink: image.image,
                        stateUpdater: editGalleryImageImage,
                      }}
                    />
                    <input
                      type="text"
                      name="text"
                      placeholder="a short comment if you want"
                      value={image.text}
                      onChange={updateGaleryImageText}
                    />
                    <button
                      onClick={() => {
                        toggleDeleteGalleryImage(image.id);
                      }}
                    >
                      Delete Image
                    </button>
                  </div>
                );
              })}
              <button onClick={addGalleryImage}>Add Gallery Image</button>
            </div>
            <button onClick={createService}>Create Service</button>
            <button onClick={updateService}>Update Service</button>
            <button onClick={setNewService}>Start New Service</button>
            <button onClick={getAllServices}>Get All Services</button>
          </div>
        </div>
      </CloudinaryContext>
    </Fragment>
  );
};

export default ServicesView;
